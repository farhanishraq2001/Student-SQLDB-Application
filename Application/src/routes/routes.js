const { Router } = require('express');
const controller = require('../controllers/controller')

const router = Router();

// Routes all the URL to the appropriate handlers
router.get('/', controller.getAllStudents);//Retrieves all the students from the DB
router.post('/', controller.addStudent);//Adds a student to the DB
router.put('/:id', controller.updateStudentEmail);//Updates student email in the DB
router.delete('/:id', controller.deleteStudent);//Deletes a student from the DB

module.exports = router;