var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    _id: Schema.Types.ObjectId,
	empName: String,
    department: String,
    title: String,
	address: String,
    city: String,
    state: String,
    zipCode: String,
	genesis: { type: Date, default: Date.now },
    email: String,
    phoneNumber: String,
    comp_ID: {
           type: Schema.Types.ObjectId, ref:'Company'
        }
});

module.exports = mongoose.model('Employee', employeeSchema);
