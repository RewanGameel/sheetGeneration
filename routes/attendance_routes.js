const express = require("express");
const router = express.Router();
const attendance_record_model = require("../models/attendance_record");
// import * as ExcelJs from 'exceljs';
const ExcelJs = require("exceljs");

// insert attendance record
router.post("/recordAttendance", async (req,res) =>{

    const attendance_record = new attendance_record_model({
        QR_ID :req.body.QR_ID,
        student_ID :req.body.student_ID,
        student_name : req.body.student_name,
    });
    try{
        const savedRecord = await attendance_record.save();
         res.send({'success':true});
     }catch(err){
       res.status(400).send(err);
    }
})


//sheet generation
router.get('/sheet', async (req, res, next) => {

    try {
      
        const attendance_records = await attendance_record_model.find({QR_ID:req.body.QR_ID});
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('My Lecture Attendance');
        worksheet.columns = [
           
            {header: 'Student ID', key: 'student_ID', width: 10},
            {header: 'Student Name', key: 'student_name', width: 10},
            
        ];
        let count = 1;
        attendance_records.forEach(attendance_records => {
           
            worksheet.addRow(attendance_records);
            count += 1;
        });
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = {bold: true};
        });

        const data = await workbook.xlsx.writeFile('attendance.xlsx')
        res.send('done');
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports =  router;