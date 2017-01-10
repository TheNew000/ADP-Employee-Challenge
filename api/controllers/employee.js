var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Company = mongoose.model('Company');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.createEmp = function (req, res) {
    if (!req.body.fullName || !req.body.department || !req.body.title || !req.body.address || !req.body.state || !req.body.zipCode || !req.body.email || !req.body.phoneNumber) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    } else {
        Employee.find({ 
            $or: [
                {$and: [{'fullName': req.body.fullName}, {'email': req.body.email}] }, 
                {$and: [{'fullName': req.body.fullName}, {'phoneNumber': req.body.phoneNumber}]}
            ], function (err, employeeInfo) {
                if (employeeInfo) {
                    sendJSONresponse(res, 500, {
                        "message": "Employee already registered"
                    });
                } else {
                    var passed = validate.validate([
                        {
                            value: req.body.fullname,
                            checks: {
                                required: true,
                                minlength: 3,
                                maxlength: 30,
                                regex: /^[a-zA-Z0-9_\s]*$/
                            }
                        },
                        {
                            value: req.body.email,
                            checks: {
                                required: true,
                                minlength: 3,
                                maxlength: 100,
                                regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            }
                        },
                        {
                            value: req.body.state,
                            checks: {
                                required: true,
                                matches: ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                                'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                                'WY').split(' ')
                            }
                        },
                        {
                            value: req.body.phoneNumber,
                            checks: {
                                required: true,
                                minlength: 10,
                                maxlength: 10,
                                regex: /^((([0-9]{3}))|([0-9]{3}))[-\s\.]?[0-9]{3}[-\s\.]?[0‌​-9]{4}$/
                            }
                        },
                        {
                            value: req.body.zipCode,
                            checks: {
                                required: true,
                                minlength: 5,
                                maxlength: 5,
                                regex: /(^\d{5}$)|(^\d{5}-\d{4}$)/
                            }
                        },
                        {
                            value: req.body.address,
                            checks: {
                                required: true,
                                minlength: 5,
                                maxlength: 100,
                                regex: /(^\d{5}$)|(^\d{5}-\d{4}$)/
                            }
                        }
                    ]);
                    if (passed) {
                        var employee = new Employee();
                        employee.fullName = req.body.fullName;
                        employee.department = req.body.department;
                        employee.title = req.body.title;
                        employee.address = req.body.address;
                        employee.state = req.body.state;
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
                            message: "Invalid input. Please don't mess with Angular's form validation."
                        });
                    }
                }
            }
        });
    }
};

module.exports.getAllEmps = function (req, res) {
    Company.find({'companyName': req.params.id}).populate({path: 'employees'}).exec(function (err, category) {
        sendJSONresponse(res, 200, category);
    });
};

module.exports.getEmp = function (req, res) {
    Employee.find({'fullName': req.body.input}).exec(function (err, category) {
        sendJSONresponse(res, 200, category);
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
    Employee.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            fullName: req.body.fullName,
            department: req.body.department,
            title: req.body.title,
            address: req.body.address,
            state: req.body.state,
            zipCode: req.body.zipCode,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        }
    }, function (err, data){
        if(err){
            console.log(err);
            sendJSONresponse(res, 400, {
                "message": "There was an error!"
            });
        } else {
            console.log(data);
            sendJSONresponse(res, 200, {
                "message": "Information was successfully updated!"
            });
        }
    });
};
