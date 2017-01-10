var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
	empName: String,
    department: String,
    title: String,
	address: String,
    state: String,
    zipCode: String,
	genesis: { type: Date, default: Date.now },
    email: String,
    phoneNumber: String,
    compID: {
           type: Schema.Types.ObjectId, ref:'Company'
        }
});

module.exports = mongoose.model('Employee', employeeSchema);
