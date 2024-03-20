const pool = require('../../db');
const queries = require('../queries/queries');
const path = require('path');
const fs = require("fs");

// URL handlers
// URL hanlder to retrieve all the students from the DB
const getAllStudents = async (req, res) => {
    let htmlFile = path.join(__dirname + '../../../public/'+ 'index.html');

    if (req.accepts('html')) { // If request is html
        if (!fs.existsSync(htmlFile)) {
            // Send 404 response if html file is missing
            res.status(404).json({message: 'ERROR 404: HTML file not found.'});
            return;
        }
        // Send html file in response
        res.status(200).sendFile(path.join(__dirname + '../../../public/'+ 'index.html'));        
    } else if (req.accepts('json')) { // If request is json
        try {
            // Get students from DB
            const results = await pool.query(queries.getAllStudents);
            // Send student data to server
            res.status(200).set("Content-Type", "application/json").json(results.rows);
        } catch (err) {
            // Handle server connection error
            res.status(500).json({message: 'ERROR 500: Server Error'});
        }
    }    
}
// URL hanlder to add a student to the DB
const addStudent = async (req, res) => {
    const {first_name, last_name, email, enrollment_date} = req.body;
    //Check if attributes are missing from request body
    if ((first_name && last_name && email && enrollment_date) == null || undefined) {
        res.status(422).json({message: 'ERROR 422: Missing required attribute. Please provide all required attributes.'});
        return;
    }
    
    try {
        // Check if student with same email exists 
        const { rows } = await pool.query(queries.getStudentByEmail, [email]);// email parameter passed in
        // Send bad response if student with same email exists 
        if (rows.length > 0) {
            res.status(409).json({message: 'ERROR 409: Given email already exists.'});
            return;
        }
        // Perform the add operation
        await pool.query(queries.addStudent, [first_name, last_name, email, enrollment_date]); // first_name, last_name, email, enrollment_date parameter passed in
        // Send a success response
        res.status(201).json({message: 'Student successfully added'});
    } catch (err) {
        // Handle different types of errors
        if (err.code === 'ENOTFOUND') {
            // Handle database connection error
            console.error('Database connection error:', err.message);
            res.status(500).json({message: 'ERROR 500: Database connection error.'});
        } else if (err.code === '23505') {
            // Handle unique constraint violation error
            console.error('Unique constraint violation:', err.detail);
            res.status(409).json({message: 'ERROR 409: Given email already exists.'});
        } else if (err.code === '22P02') {
            // Handle invalid input syntax error
            console.error('Invalid input syntax:', err.message);
            res.status(422).json({message: 'ERROR 422: Invalid input syntax.'});
        } else if (err.code === '22007') {
            // Handle invalid input syntax error
           console.error('Invalid date format:', err.message);
           res.status(422).json({message: 'ERROR 422: Invalid date format. Please provide a date in the YYYY-MM-DD format.'});
        } else if (err.code === '22008') {
            // Handle invalid input syntax error
           console.error('Invalid date format:', err.message);
           res.status(422).json({message: 'ERROR 422: Invalid date format. Please provide a date in the YYYY-MM-DD format.'});
        } else if (err.code === '23502') {
             // Handle invalid input syntax error
            console.error('Missing required attribute:', err.message);
            res.status(422).json({message: 'ERROR 422: Missing required attribute. Please provide all required attributes.'});
        } else {
            // Handle other errors
            console.error('Error adding student:', err.message);
            res.status(500).json({message: 'ERROR 500: An error occurred while adding student.'});
        }
    }
}
// URL hanlder to update a student's email in the DB
const updateStudentEmail = async (req, res) => {
    const id = parseInt(req.params.id);
    const { email } = req.body;

    try {
        // Perform the update operation
        const result = await pool.query(queries.updateStudentEmail, [email, id]);// email and student_id parameter passed in 
        console.log(result);
        // Check if the update was successful
        if (result.rowCount < 1) {
            res.status(404).json({message: 'ERROR 404: Student not found.'});
            return;
        } 
        
        // Send a success response
        res.status(200).json({message: 'Student email succesfully updated'});
    } catch (err) {
        // Handle different types of errors
        if (err.code === 'ENOTFOUND') {
            // Handle database connection error
            console.error('Database connection error:', err.message);
            res.status(500).json({message: 'ERROR 500: Database connection error.'});
        } else if (err.code === '23505') {
            // Handle unique constraint violation error
            console.error('Unique constraint violation:', err.detail);
            res.status(409).json({message: 'ERROR 409: Given email already exists.'});
        } else if (err.code === '22P02') {
            // Handle invalid input syntax error
            console.error('Invalid input syntax:', err.message);
            res.status(422).json({message: 'ERROR 422: Invalid input syntax.'});
        } else {
            // Handle other errors
            console.error('Error updating student email:', err.message);
            res.status(500).json({message: 'ERROR 500: An error occurred while updating student email.'});
        }
    }
}
// URL hanlder to delete a student from the DB
const deleteStudent = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // Perform the delete operation
        const result = await pool.query(queries.deleteStudent, [id]);// student_id parameter passed in
        console.log(result);
        // Check if the delete was successful
        if (result.rowCount < 1) {
            res.status(404).json({message: 'ERROR 404: Student not found'});
            return;
        }
        // Send a success response
        res.status(200).json({message: 'Student successfully deleted'});
    } catch (err) {
        // Handle different types of errors
        if (err.code === 'ENOTFOUND') {
            // Handle database connection error
            console.error('Database connection error:', err.message);
            res.status(500).json({message: 'ERROR 500: Database connection error'});
        } else {
            // Handle other errors
            console.error('Error deleting student:', err.message);
            res.status(500).json({message: 'ERROR 500: An error occurred while deleting the student'});
        }
    }
}

module.exports = {
    getAllStudents,
    addStudent,
    updateStudentEmail,
    deleteStudent,
};