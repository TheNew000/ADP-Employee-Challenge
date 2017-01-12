var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var managerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    compID: {
           type: Schema.Types.ObjectId, ref:'Company'
        },
    userName: String,
    fullName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Manager', managerSchema);
