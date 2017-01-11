var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Company = mongoose.model('Company');
var validator = require('../utils/validate');


var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.newEmp = function (req, res) {
    if (!req.body.empName || !req.body.department || !req.body.title || !req.body.address || !req.body.city || !req.body.state || !req.body.zipCode || !req.body.email || !req.body.phoneNumber) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    } else {
        Employee.find({ 
            $or: [
                {$and: [{'empName': req.body.empName}, {'email': req.body.email}] }, 
                {$and: [{'empName': req.body.empName}, {'phoneNumber': req.body.phoneNumber}] }
            ]}
            , function (err, employee) {
                if (err){
                    sendJSONresponse(res, 400, {
                        "message": err
                    });
                }else if (employee.length > 0) {
                    sendJSONresponse(res, 500, {
                        "message": "Employee already registered"
                    });
                } else {
                    var passed = validator.validate([
                        {
                            value: req.body.empName,
                            checks: {
                                required: true,
                                minlength: 3,
                                maxlength: 30,
                                regex: /^[a-zA-Z_\s]*$/
                            }
                        },
                        {
                            value: req.body.address,
                            checks: {
                                required: true,
                                minlength: 5,
                                maxlength: 100,
                                regex: /^[a-zA-Z0-9_\s]*$/
                            }
                        },
                        {
                            value: req.body.city,
                            checks: {
                                required: true,
                                minlength: 3,
                                maxlength: 30,
                                regex: /^[a-zA-Z0-9_\s]*$/
                            }
                        },
                        {
                            value: req.body.state.abbrev,
                            checks: {
                                required: true,
                                matches: ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                                'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                                'WY').split(' ')
                            }
                        },
                        {
                            value: req.body.zipCode,
                            checks: {
                                required: true,
                                minlength: 5,
                                maxlength: 12,
                                regex: /^[0-9_\s]*$/
                            }
                        },
                        {
                            value: req.body.phoneNumber,
                            checks: {
                                required: true,
                                minlength: 10,
                                maxlength: 20
                            }
                        },
                        {
                            value: req.body.email,
                            checks: {
                                required: true,
                                minlength: 3,
                                maxlength: 100,
                                regex: /^.+@.+\..+$/
                            }
                        }
                        
                    ]);
                    if (passed) {
                        var employee = new Employee();
                        employee.empName = req.body.empName;
                        employee.department = req.body.department;
                        employee.title = req.body.title;
                        employee.address = req.body.address;
                        employee.city = req.body.city;
                        employee.state = req.body.state.abbrev;
                        employee.zipCode = req.body.zipCode;
                        employee.email = req.body.email;
                        employee.phoneNumber = req.body.phoneNumber;
                        employee.compID = req.params.id;
                        employee.save(function (err, document) {
                            if (err) {
                                console.log(err);
                                sendJSONresponse(res, 500, {
                                    "message": "Server Error Nooooo!!!"
                                });
                            } else {
                                console.log(document);
                                Company.update({'companyName': req.body.companyName}, {$push: {employee: employee._id}}).exec(
                                    sendJSONresponse(res, 200, {
                                        'message': 'Employee Successfully Added!'
                                    })
                                );
                            }
                        });
                    } else {
                        sendJSONresponse(res, 401, {
                            'message': "Invalid input. Please don't mess with Angular's form validation."
                        });
                    }
                }
            }
        );
    }
};

module.exports.getAllEmps = function (req, res) {
    Company.find({}).populate({path: 'employees'}).exec(function (err, emps) {
        if (err){
            console.log(err);
        }else{
            sendJSONresponse(res, 200, emps); 
        }
        
    });
    // Employee.find({}).sort( { empName: -1 } ).exec(function (err, emp) {
    //     sendJSONresponse(res, 200, emp);
    // });
};

module.exports.findEmp = function (req, res) {
    Employee.find({empName: {$regex: '^' + req.body.userInput, $options: 'i'} }).exec(function (err, emp) {
        if (err){
            console.log(err);
        }else{
            sendJSONresponse(res, 200, emp);
        }
    });
};

module.exports.getEmp = function (req, res) {
    console.log(req.body.userInput);
    Employee.find({'empName': req.body.userInput}).exec(function (err, emp) {
        sendJSONresponse(res, 200, emp);
    });
};

module.exports.removeEmp = function (req, res) {
    Company.findById(req.body.compID).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var index = data.employees.indexOf(req.params.id);
            if (index > -1) {
                data.employees.splice(index, 1);
                data.save();
                Employee.find().remove({_id: req.params.id}).exec(function (err, count) {
                    if (err) {
                        console.log(err);
                    } else {
                        sendJSONresponse(res, 200, {
                            'message': count.result.n + ' employee TERMINATED!!'
                        });
                    }
                });
            }
        }
    });
};

module.exports.editEmp = function (req, res) {
    console.log(req.body);
    Employee.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {
        $set: {
            empName: req.body.empName,
            department: req.body.department,
            title: req.body.title,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        },
    }, {
        new: true
    }, function (err, data) {
        if(err){
            console.log(err);
            sendJSONresponse(res, 400, {
                "message": "There was an error!"
            });
        } else if(data == null){
            console.log(data);
            sendJSONresponse(res, 404, {
                "message": "User could not be found please try again!"
            });
        }else{
            console.log(data);
            sendJSONresponse(res, 200, {
                "message": "Information was successfully updated!"
            });
        }
    });
};
