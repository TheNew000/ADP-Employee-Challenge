var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Employee = mongoose.model('Employee');
var Manager = mongoose.model('Manager');

var companySchema = new Schema({
    _id: Schema.Types.ObjectId,
    companyName: String,
    address: String,
    state: String,
    zipCode: Number,
    employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}],
    managers: [{type: Schema.Types.ObjectId, ref: 'Manager'}]
}, { collection: 'company' });

module.exports = mongoose.model('Company', companySchema);
