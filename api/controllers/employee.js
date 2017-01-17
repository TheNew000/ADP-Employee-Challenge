var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Company = mongoose.model('Company');
var validator = require('../utils/validate');


var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.newEmp = function (req, res) {
    console.log(req.body.companyID);
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
                        },
                        {
                            value: req.body.companyID,
                            checks: {
                                required: true,
                                minlength: 24,
                                maxlength: 24,
                                regex: /[0-9a-zA-Z]{24}/

                            }
                        }
                        
                    ]);
                    if (passed) {
                        console.log('city: ' + req.body.city);
                        var employee = new Employee();
                        employee._id = mongoose.Types.ObjectId();
                        employee.empName = req.body.empName;
                        employee.department = req.body.department;
                        employee.title = req.body.title;
                        employee.address = req.body.address;
                        employee.city = req.body.city;
                        employee.state = req.body.state.abbrev;
                        employee.zipCode = req.body.zipCode;
                        employee.email = req.body.email;
                        employee.phoneNumber = req.body.phoneNumber;
                        employee.comp_ID = mongoose.Types.ObjectId.createFromHexString(req.body.companyID);
                        employee.save(function (err, newEmployee) {
                            if (err) {
                                console.log(err);
                                sendJSONresponse(res, 500, {
                                    "message": "Server Error Nooooo!!!"
                                });
                            } else {
                                console.log('here! ' + newEmployee);
                                Company.update({_id: req.body.companyID}, {$push: {employees: newEmployee._id}}).exec(
                                    sendJSONresponse(res, 200, {
                                        'message': 'Employee Successfully Added!',
                                        'new_emp': newEmployee
                                    }));
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

// module.exports.getEmp = function (req, res) {
//     console.log(req.body.userInput);
//     Employee.find({'empName': req.body.userInput}).exec(function (err, emp) {
//         sendJSONresponse(res, 200, emp);
//     });
// };

module.exports.removeEmp = function (req, res) {
    Employee.findOneAndRemove({_id : req.params.id}, function (err, deadUser) {
        if (err) {
            console.log("FOAR Error: " + err);
        } else {
            console.log("FOAR DATA: " + deadUser);
            Company.findById(deadUser.comp_ID).exec(function (err, data) {
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log('Data: ' + data);
                    var index = data.employees.indexOf(deadUser._id);
                    if (index > -1) {
                        data.employees.splice(index, 1);
                        data.save();
                        sendJSONresponse(res, 200, data);                        
                    } else {
                        sendJSONresponse(res, 404, {"message": "Something went wrong.  Employee not found in this company"});    
                    }
                }
            });
        }
    });
};

module.exports.editEmp = function (req, res) {
    console.log(req);
    Employee.update({_id: req.params.id}, {
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
        }
    }).exec(
        sendJSONresponse(res, 200, {
            "message": "Employee was successfully updated!"
        })
    );
};
