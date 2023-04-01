const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name:{type:String,required:true},
  phonenumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 12
  },
  servicename:{type: String,required:true},
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const Appointment = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointment;