// Predefined SQL queries with to be used in the controller.js
// Variables (e.g., $1) are passed in as parametes from controller.js
const getAllStudents = "SELECT * FROM students ORDER BY student_id";
const getStudentByEmail = "SELECT * FROM students WHERE email = $1";
const addStudent = "INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4)";
const updateStudentEmail = "UPDATE students SET email = $1 WHERE student_id = $2";
const deleteStudent = "DELETE FROM students WHERE student_id = $1";

module.exports = {
    getAllStudents,
    getStudentByEmail,
    addStudent,
    updateStudentEmail,
    deleteStudent,
};