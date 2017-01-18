var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var managerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    compID: {
           type: Schema.Types.ObjectId, ref:'Company'
        },
    userName: String,
    fullName: String,
    email: String,
    hash: String,
    salt: String
});

managerSchema.methods.setPassword = function (password) {
    this.salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(password, salt);
    // bcrypt.genSalt(10, function(err, salt) {
    //     if (err){
    //         console.log(err);
    //     }else{
    //         bcrypt.hash(password, salt, function(err, hash) {
    //             if (err){
    //                 console.log(err);
    //             }else{
    //                 return {salt: salt, hash: hash};
    //             }
    //         });
    //     }
    // });
};

managerSchema.methods.checkPassword = function (password, hash) {
    bcrypt.compare(password, hash, function(err, res) {
        if (err){
            console.log(err);
        }else{
            return res;
        }
    });
};

module.exports = mongoose.model('Manager', managerSchema);
