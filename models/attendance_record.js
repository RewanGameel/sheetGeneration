const mongoose = require('mongoose');


const attendaceRecordSchema = new mongoose.Schema({

  QR_ID:{
    type: Number,
    required: true,
   
  },

  student_ID:{
    type: Number,
    required: true, 
  },
  student_name:{
    type: String,
    required: true, 
  },
  date:{
    type: Date,
    default: Date.now
  },

 
});



module.exports = mongoose.model('attendance_record', attendaceRecordSchema)