const express = require('express');
const router = express.Router()
const fs = require('fs');
const path = require('path');

// Structural Batabse
const structuralDatabase = [
        {
    id:1,
    drawingTitle: " First Structural title",
    drawingCode: "Drawing-001",
    drawingLocation: "69th Floor > Unit 69",
    trade: "Architectural"
    },
    {
    id:2,
    drawingTitle: " Second Structural title",
    drawingCode: "Drawing-002",
    drawingLocation: "69th Floor > Unit A",
    trade: "Mechanical"
    },
    {
    id:3,
    drawingTitle: " Third Structural title",
    drawingCode: "Drawing-003",
    drawingLocation: "50th Floor > Unit A",
    trade: "Electrical"
    },
    {
    id:4,
    drawingTitle: " Fourth Structural title",
    drawingCode: "Drawing-004",
    drawingLocation: "50th Floor > Unit D",
    trade: "Civil Works"
    },
    {
    id:5,
    drawingTitle: " Fifth Structural title",
    drawingCode: "Drawing-005",
    drawingLocation: "50th Floor > Unit D",
    trade: "Sanitary"
    },     
    {
    id:6,
    drawingTitle: " Third Structural title",
    drawingCode: "Drawing-003",
    drawingLocation: "50th Floor > Unit A",
    trade: "Electrical"
    },
    {
    id:7,
    drawingTitle: " Fourth Structural title",
    drawingCode: "Drawing-004",
    drawingLocation: "50th Floor > Unit D",
    trade: "Civil Works"
    },
    {
    id:8,
    drawingTitle: " Fifth Structural title",
    drawingCode: "Drawing-005",
    drawingLocation: "50th Floor > Unit D",
    trade: "Sanitary"
    },  


];

// Directory to store uploaded files
const uploadDirectory = path.join(__dirname, './uploads');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}
// create 
router.post('/save-structural', (req, res) => {

   let drawingTitle = req.body.drawingTitle;
   let drawingCode = req.body.drawingCode;
   let drawingLocation = req.body.drawingLocation;
   let trade = req.body.trade;
   let uploadFiles = req.body.uploadFiles;


   const newDrawing = {
       id: structuralDatabase.length + 1,
       drawingTitle: drawingTitle,
       drawingCode: drawingCode,
       drawingLocation: drawingLocation,
       trade: trade,
       uploadFiles: uploadFiles,
   }

  if ( structuralDatabase.push(newDrawing) ) {
       res.status(200).json( {code:'success', msg:'done saving'} )
  } else {
       res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
  }

})
// update
router.put('/update-structural/:structuralId', (req, res)=>{
   const structural_id = req.params.structuralId;

   let drawingTitle = req.body.drawingTitle;
   let drawingCode = req.body.drawingCode;
   let drawingLocation = req.body.drawingLocation;
   let trade = req.body.trade;
   let uploadFiles = req.body.uploadFiles;

   const updateStructuralRecord = {
       id: structural_id,
       drawingTitle: drawingTitle,
       drawingCode: drawingCode,
       drawingLocation: drawingLocation,
       trade: trade,
       uploadFiles: uploadFiles,
   }

  const indexOfStructural =  structuralDatabase.findIndex( (obj) => obj.id == structural_id );

  structuralDatabase[indexOfStructural] = updateStructuralRecord;

  if (structuralDatabase) {
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

// Serve static files from the 'uploads' directory
router.use('/uploads', express.static(path.join(__dirname, './uploads')));
// Import necessary modules for file handling

// File Download Endpoint
router.get('/download-file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDirectory, filename);

    if (fs.existsSync(filePath)) {
        // Set appropriate headers for file download
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/octet-stream');

        // Send the file back to the client for download
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.status(404).json({ code: 'failed', msg: 'File not found' });
    }
});
// read
router.get('/get-structural-data', (req, res) => {
   res.json(structuralDatabase);  
})

// update
router.get('/get-structural/:id', (req, res) => {
   const structuralId = parseInt(req.params.id);
   console.log(structuralId)
   console.log(structuralDatabase);
   const itemFound = structuralDatabase.find( (item) => {  return structuralId=== item.id } ) 

    if (itemFound){
        res.status(200).json(itemFound);
    } else {
        res.status(400).json("Invalid Id")
    }

})

// delete
router.delete('/delete-structural/:structuralId', (req, res)=>{
   const structural_id = req.params.structuralId;
   const indexValue =  structuralDatabase.findIndex( (obj) => obj.id == structural_id );
   structuralDatabase.splice(indexValue, 1); // 1, 1

   if (structuralDatabase) {
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
