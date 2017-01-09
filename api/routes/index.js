var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/employees";
mongoose.connect(mongoUrl);

var authentication = require('../controllers/auth');
var employee = require('../controllers/employee');

router.post('/register', authentication.register);
router.post('/login', authentication.login);

router.post('/create_emp', employee.createEmp);
router.post('/update_emp/:id', employee.editEmp);
router.post('/remove_emp/:id', employee.removeEmp);

router.get('/find_emp', employee.getEmp);
router.get('/get_all_emps', employee.getAllEmps);

module.exports = router;
