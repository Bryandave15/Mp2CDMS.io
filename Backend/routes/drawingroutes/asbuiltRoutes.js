const express = require('express');
const router = express.Router();


// asbuilt Batabse
const asbuiltDatabase = [
    {
    id:1,
    drawingTitle: " First asbuilt title",
    drawingCode: "Drawing-001",
    drawingLocation: "69th Floor > Unit 69",
    trade: "Architectural"
    },
    {
    id:2,
    drawingTitle: " Second asbuilt title",
    drawingCode: "Drawing-002",
    drawingLocation: "69th Floor > Unit A",
    trade: "Mechanical"
    },
    {
    id:3,
    drawingTitle: " Third asbuilt title",
    drawingCode: "Drawing-003",
    drawingLocation: "50th Floor > Unit A",
    trade: "Electrical"
    },
    {
    id:4,
    drawingTitle: " Fourth asbuilt title",
    drawingCode: "Drawing-004",
    drawingLocation: "50th Floor > Unit D",
    trade: "Civil Works"
    },
    {
    id:5,
    drawingTitle: " Fifth asbuilt title",
    drawingCode: "Drawing-005",
    drawingLocation: "50th Floor > Unit D",
    trade: "Sanitary"
    },      
        {
    id:6,
    drawingTitle: " Second asbuilt title",
    drawingCode: "Drawing-002",
    drawingLocation: "69th Floor > Unit A",
    trade: "Mechanical"
    },
    {
    id:7,
    drawingTitle: " Third asbuilt title",
    drawingCode: "Drawing-003",
    drawingLocation: "50th Floor > Unit A",
    trade: "Electrical"
    },
    {
    id:8,
    drawingTitle: " Second asbuilt title",
    drawingCode: "Drawing-002",
    drawingLocation: "69th Floor > Unit A",
    trade: "Mechanical"
    },
    {
    id:9,
    drawingTitle: " Third asbuilt title",
    drawingCode: "Drawing-003",
    drawingLocation: "50th Floor > Unit A",
    trade: "Electrical"
    },


];
// create 
router.post('/save-asbuilt', (req, res) => {

   let drawingTitle = req.body.drawingTitle;
   let drawingCode = req.body.drawingCode;
   let drawingLocation = req.body.drawingLocation;
   let trade = req.body.trade;
   let uploadFiles = req.body.uploadFiles;


   const newDrawing = {
       id: asbuiltDatabase.length + 1,
       drawingTitle: drawingTitle,
       drawingCode: drawingCode,
       drawingLocation: drawingLocation,
       trade: trade,
       uploadFiles: uploadFiles,
   }

  if ( asbuiltDatabase.push(newDrawing) ) {
       res.status(200).json( {code:'success', msg:'done saving'} )
  } else {
       res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
  }

})
// update
router.put('/update-asbuilt/:asbuiltId', (req, res)=>{
   const asbuilt_id = req.params.asbuiltId;

   let drawingTitle = req.body.drawingTitle;
   let drawingCode = req.body.drawingCode;
   let drawingLocation = req.body.drawingLocation;
   let trade = req.body.trade;
   let uploadFiles = req.body.uploadFiles;

   const updateasbuiltRecord = {
       id: asbuilt_id,
       drawingTitle: drawingTitle,
       drawingCode: drawingCode,
       drawingLocation: drawingLocation,
       trade: trade,
       uploadFiles: uploadFiles,
   }

  const indexOfasbuilt =  asbuiltDatabase.findIndex( (obj) => obj.id == asbuilt_id );

  asbuiltDatabase[indexOfasbuilt] = updateasbuiltRecord;

  if (asbuiltDatabase) {
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
router.get('/get-asbuilt-data', (req, res) => {
   res.json(asbuiltDatabase);  
})

// update
router.get('/get-asbuilt/:id', (req, res) => {
   const asbuiltId = parseInt(req.params.id);
   console.log(asbuiltId)
   console.log(asbuiltDatabase);
   const itemFound = asbuiltDatabase.find( (item) => {  return asbuiltId=== item.id } ) 

    if (itemFound){
        res.status(200).json(itemFound);
    } else {
        res.status(400).json("Invalid Id")
    }

})

// delete
router.delete('/delete-asbuilt/:asbuiltId', (req, res)=>{
   const asbuilt_id = req.params.asbuiltId;
   const indexValue =  asbuiltDatabase.findIndex( (obj) => obj.id == asbuilt_id );
   asbuiltDatabase.splice(indexValue, 1); // 1, 1

   if (asbuiltDatabase) {
       res.json(
           {
               code : "success",
               msg : "Delete Todo Done"
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

module.exports = router