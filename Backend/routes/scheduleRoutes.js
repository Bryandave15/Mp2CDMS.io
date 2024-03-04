const express = require('express');
const router = express.Router();


//schedule BACKEND Start
const scheduleDatabase = [
    
    {
    id:1,
    scheduleTitle: "My first schedule",
    taskName: "First Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "On going"
},
{
    id:2,
    scheduleTitle: "My second schedule",
    taskName: "Second Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "On going"
},
{
    id:3,
    scheduleTitle: "My third schedule",
    taskName: "Third Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "Pending"
},
{
    id:4,
    scheduleTitle: "My fourth schedule",
    taskName: "pang apat na Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "Done"
},
{
    id:5,
    scheduleTitle: "My panglimang schedule",
    taskName: "Fifth na Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "Im done!"
},
{
    id:6,
    scheduleTitle: "My second schedule",
    taskName: "Second Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "On going"
},
{
    id:7,
    scheduleTitle: "My third schedule",
    taskName: "Third Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "Pending"
},
{
    id:8,
    scheduleTitle: "My fourth schedule",
    taskName: "pang apat na Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "Done"
},
{
    id:9,
    scheduleTitle: "My panglimang schedule",
    taskName: "Fifth na Task Name",
    startDate: "2/23/24",
    finishDate: "2/25/25",
    status: "Im done!"
},

];
// create 
router.post('/save-schedule', (req, res) => {

   let scheduleTitle = req.body.scheduleTitle;
   let taskName = req.body.taskName;
   let startDate = req.body.startDate;
   let finishDate = req.body.finishDate;
   let status = req.body.status;
   
  

   const newSchedule = {
       id: scheduleDatabase.length + 1,
       scheduleTitle: scheduleTitle,
       taskName: taskName,
       startDate: startDate,
       finishDate: finishDate,
       status: status,
       
   }

  if ( scheduleDatabase.push(newSchedule) ) {
       res.status(200).json( {code:'success', msg:'done saving'} )
  } else {
       res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
  }

})
// update
router.put('/update-schedule/:scheduleId', (req, res)=>{
   const schedule_id = req.params.scheduleId;

   let scheduleTitle = req.body.scheduleTitle;
   let taskName = req.body.taskName;
   let startDate = req.body.startDate;
   let finishDate = req.body.finishDate;
   let status = req.body.status;
  
   

   const updateScheduleRecord = {
       id: schedule_id,
       scheduleTitle: scheduleTitle,
       taskName: taskName,
       startDate: startDate,
       finishDate: finishDate,
       status: status,
   }

  const indexOfschedule =  scheduleDatabase.findIndex( (obj) => obj.id == schedule_id );

  scheduleDatabase[indexOfschedule] = updateScheduleRecord;

  if (scheduleDatabase) {
       res.json(
           {
               code : "success",
               msg : "Update Done"
           }
       )
  } else {
     res.status(400).json(
       {
           code : "failed",
           msg : "Error encountered while updating"
       }
     )
  }

})
      
// read
router.get('/get-schedule-data', (req, res) => {
   res.json(scheduleDatabase);  
})

// update
router.get('/get-schedule/:id', (req, res) => {
   const scheduleId = parseInt(req.params.id);
   console.log(scheduleId)
   console.log(scheduleDatabase);
   const itemFound = scheduleDatabase.find( (item) => {  return scheduleId === item.id } ) 

    if (itemFound){
        res.status(200).json(itemFound);
    } else {
        res.status(400).json("Invalid Id")
    }

})

// delete
router.delete('/delete-schedule/:scheduleID', (req, res)=>{
   const schedule_id = req.params.scheduleID;
   const indexValue =  scheduleDatabase.findIndex( (obj) => obj.id == schedule_id );
   scheduleDatabase.splice(indexValue, 1); // 1, 1

   if (scheduleDatabase) {
       res.json(
           {
               code : "success",
               msg : "Delete Meeting Done"
           }
       )
  } else {
     res.status(400).json(
       {
           code : "failed",
           msg : "Error encountered while deleting"
       }
     )
  }
   
})

module.exports = router
