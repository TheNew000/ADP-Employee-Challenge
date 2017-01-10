var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var Manager = mongoose.model('Manager');
var validator = require('../utils/validate');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// module.exports.register = function (req, res) {
//     if (!req.body.userName || !req.body.password) {
//         sendJSONresponse(res, 400, {
//             "message": "All fields required"
//         });
//     } else {
//         Manager.findOne({'email': req.body.email}, function (err, managerInfo) {
//             if (managerInfo) {
//                 sendJSONresponse(res, 500, {
//                     "message": "Email already registered"
//                 });
//             } else {
//                 Manager.findOne({'userName': req.body.userName}, function (err, managerInfo) {
//                     if (managerInfo) {
//                         res.status(500);
//                         res.json({'message': 'UserName already registered'});
//                     } else {
//                         var passed = validator.validate([
//                             {
//                                 value: req.body.userName,
//                                 checks: {
//                                     required: true,
//                                     minlength: 3,
//                                     maxlength: 18,
//                                     regex: /^[a-zA-Z0-9_]*$/
//                                 }
//                             },
//                             {
//                                 value: req.body.fullName,
//                                 checks: {
//                                     required: true,
//                                     minlength: 3,
//                                     maxlength: 30,
//                                     regex: /^[a-zA-Z0-9_\s]*$/
//                                 }
//                             },
//                             {
//                                 value: req.body.email,
//                                 checks: {
//                                     required: true,
//                                     minlength: 3,
//                                     maxlength: 100,
//                                     regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//                                 }
//                             },
//                             {
//                                 value: req.body.companyName,
//                                 checks: {
//                                     required: true,
//                                     matches: ('ADP,Chick-Fil-A,Home Depot').split(',')
//                                 }
//                             }
//                         ]);

//                         if (passed) {
//                             var manager = new Manager();
//                             manager.userName = req.body.userName;
//                             manager.fullName = req.body.fullName;
//                             manager.email = req.body.email;
//                             manager.companyName = req.body.companyName;
//                             manager.password = "hambone";

//                             manager.save(function (err, document) {
//                                 if (err) {
//                                     console.log(err);
//                                     sendJSONresponse(res, 500, {
//                                         "message": "Server Error Nooooo!!!"
//                                     });
//                                 } else {
//                                     console.log(document);
//                                     Company.update({companyName: req.body.companyName}, {$push: {manager: manager._id}}).exec(
//                                         sendJSONresponse(res, 200, {
//                                             'message': 'You have been successfully added!'
//                                         })
//                                     );
//                                 }
//                             });
//                         } else {
//                             sendJSONresponse(res, 401, {
//                                 message: "Invalid input. Please don't mess with Angular's form validation."
//                             });
//                         }
//                     }
//                 });
//             }
//         });
//     }
// };

module.exports.login = function (req, res) {
    if (!req.body.userName || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
    } else if (req.body.password != 'hambone') {
        sendJSONresponse(res, 400, {
            "message": "Invalid Password"
        });
    } else {
        Manager.findOne({'userName': req.body.userName}, function (err, user){
            if (err){
                sendJSONresponse(res, 500, {
                    "message": "Server Error Nooooo!!!"
                });
            } else if (user){
                sendJSONresponse(res, 200, {
                    'message': 'Welcome Back!'
                });
            }else{
                sendJSONresponse(res, 400, {
                    'message': 'Please check your username!'
                });
            }
        });
    }
};

