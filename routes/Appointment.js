const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
var Appointment=require('./Schemas/Appointment')



  router.post('/addAppointment',upload.single(), async (req, res) => {
    console.log(req.body)
    try {
      const appointment = new Appointment({
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        servicename: req.body.servicename,
        date: req.body.date,
        time: req.body.time
      });
      await appointment.save();
      return  res.status(200).json({status:true})
    } catch (err) {
        console.log(err)
        return  res.status(500).json({status:false})
    }
  });
  router.post('/checkAppointment',upload.single() ,async (req, res) => {
    const { date, time } = req.body; // retrieve date and time from the request body sent from frontend
  
    
  
    // check if date and time already exist in the database
    const existingDateTime = await Appointment.findOne({ date,  time });
  
    if (existingDateTime) {
      // date and time already exist in the database
      return  res.status(200).json({status:true})
    } else {
      // date and time do not exist in the database
      
      return  res.status(500).json({status:false})
    }
  });

  router.get('/displayallappointments', async (req, res) => {
   
    

    try {
      const appointments = await Appointment.find();
      return  res.status(200).json(appointments)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });
  
  
  module.exports = router;