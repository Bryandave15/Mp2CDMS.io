const express = require('express');
const router = express.Router();

//meeting BACKEND Start
const meetingDatabase = [
    
    {
    id:1,
    title: "First meeting",
    overview: "Meeting overview / description 1" ,
    date: "02/13/24",
    location: "Conference Room",
    agenda: "Valentines Day",
    mom: " To be announce"
},
{
    id:2,
    title: "Second Meeting",
    overview: "Meeting overview / description 2" ,
    date: "02/13/24",
    location: "Kantu",
    agenda: "Inuman",
    mom: " Ambagan"
},
{
    id:3,
    title: "Third Meeting",
    overview: "Meeting overview / description 3" ,
    date: "02/14/24",
    location: "Roofdeck",
    agenda: "Sino unang tatalon",
    mom: " Mga single"
},
{
    id:4,
    title: "Fourth Meeting",
    overview: "Meeting overview / description 4" ,
    date: "02/15/24",
    location: "ATM",
    agenda: "Sahod",
    mom: "Pera"
},
{
    id:5,
    title: "Panglimang Meeting",
    overview: "Meeting overview / description 5" ,
    date: "02/16/24",
    location: "Sa inyo",
    agenda: "Diko alam",
    mom: "Minutes nalang"
},
{
    id:6,
    title: "Second Meeting",
    overview: "Meeting overview / description 2" ,
    date: "02/13/24",
    location: "Kantu",
    agenda: "Inuman",
    mom: " Ambagan"
},
{
    id:7,
    title: "Third Meeting",
    overview: "Meeting overview / description 3" ,
    date: "02/14/24",
    location: "Roofdeck",
    agenda: "Sino unang tatalon",
    mom: " Mga single"
},
{
    id:8,
    title: "Fourth Meeting",
    overview: "Meeting overview / description 4" ,
    date: "02/15/24",
    location: "ATM",
    agenda: "Sahod",
    mom: "Pera"
},
{
    id:9,
    title: "Panglimang Meeting",
    overview: "Meeting overview / description 5" ,
    date: "02/16/24",
    location: "Sa inyo",
    agenda: "Diko alam",
    mom: "Minutes nalang"
},

];
// create 
router.post('/save-meeting', (req, res) => {

   let title = req.body.title;
   let overview = req.body.overview;
   let date = req.body.date;
   let location = req.body.location;
   let agenda = req.body.agenda;
   let mom = req.body.mom;
  

   const newMeeting = {
       id: meetingDatabase.length + 1,
       title: title,
       overview: overview,
       date: date,
       location: location,
       agenda: agenda,
       mom: mom,
   }

  if ( meetingDatabase.push(newMeeting) ) {
       res.status(200).json( {code:'success', msg:'done saving'} )
  } else {
       res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
  }

})
// update
router.put('/update-meeting/:meetingId', (req, res)=>{
   const meeting_id = req.params.meetingId;

   let title = req.body.title;
   let overview = req.body.overview;
   let date = req.body.date;
   let location = req.body.location;
   let agenda = req.body.agenda;
   let mom = req.body.mom;
  
   

   const updateMeetingRecord = {
       id: meeting_id,
       title: title,
       overview: overview,
       date: date,
       location: location,
       agenda: agenda,
       mom: mom,
   }

  const indexOfMeeting =  meetingDatabase.findIndex( (obj) => obj.id == meeting_id );

  meetingDatabase[indexOfMeeting] = updateMeetingRecord;

  if (meetingDatabase) {
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
router.get('/get-meeting-data', (req, res) => {
   res.json(meetingDatabase);  
})

// update
router.get('/get-meeting/:id', (req, res) => {
   const meetingId = parseInt(req.params.id);
   console.log(meetingId)
   console.log(meetingDatabase);
   const itemFound = meetingDatabase.find( (item) => {  return meetingId === item.id } ) 

    if (itemFound){
        res.status(200).json(itemFound);
    } else {
        res.status(400).json("Invalid Id")
    }

})

// delete
router.delete('/delete-meeting/:meetingId', (req, res)=>{
   const meeting_id = req.params.meetingId;
   const indexValue =  meetingDatabase.findIndex( (obj) => obj.id == meeting_id );
   meetingDatabase.splice(indexValue, 1); // 1, 1

   if (meetingDatabase) {
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
           msg : "Error encountered while deleting todo"
       }
     )
  }
   
})

module.exports = router;