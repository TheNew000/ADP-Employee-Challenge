var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	fullName: String,
    department: String,
    title: String,
	address: String,
    state: String,
    zipCode: Number,
	genesis: { type: Date, default: Date.now },
    email: String,
    phoneNumber: Number,
    compID: {
           type: Schema.Types.ObjectId, ref:'Company'
        }
});

module.exports = mongoose.model('Employee', employeeSchema);
