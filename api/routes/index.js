var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/ADP";
mongoose.connect(mongoUrl);

var authentication = require('../controllers/auth');
var employee = require('../controllers/employee');

// router.post('/register', authentication.register);
router.post('/login', authentication.login);

router.post('/employees/new', employee.newEmp);
router.put('/employees/:id', employee.editEmp);
router.delete('/employees/:id', employee.removeEmp);

router.post('/employees/find_emp', employee.findEmp);
router.get('/employees', employee.getAllEmps);

module.exports = router;
