const { Router } = require('express');
const controller = require('../controllers/controller')

const router = Router();

router.get('/', controller.getAllStudents);
router.post('/', controller.addStudent);
router.put('/:id', controller.updateStudentEmail);
router.delete('/:id', controller.deleteStudent);

module.exports = router;