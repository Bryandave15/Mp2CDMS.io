const express = require('express')
const router = express.Router()


const mefpsDatabase = [
    {
    id:1,
    drawingTitle: " First mefps title",
    drawingCode: "Drawing-001",
    drawingLocation: "69th Floor > Unit 69",
    trade: "Electrical"
    },
    {
    id:2,
    drawingTitle: " Second mefps title",
    drawingCode: "Drawing-002",
    drawingLocation: "69th Floor > Unit A",
    trade: "Mechanical"
    },
    {
    id:3,
    drawingTitle: " Third mefps title",
    drawingCode: "Drawing-003",
    drawingLocation: "50th Floor > Unit A",
    trade: "Fire Protection"
    },
    {
    id:4,
    drawingTitle: " Fourth mefps title",
    drawingCode: "Drawing-004",
    drawingLocation: "50th Floor > Unit D",
    trade: "Mechanical-HVAC"
    },
    {
    id:5,
    drawingTitle: " Fifth mefps title",
    drawingCode: "Drawing-005",
    drawingLocation: "50th Floor > Unit D",
    trade: " Mechanical-Ventilation"
    },  
    {
        id:6,
        drawingTitle: " Panganim mefps title",
        drawingCode: "Drawing-005",
        drawingLocation: "50th Floor > Unit D",
        trade: " Mechanical-Ventilation"
        },      


];
// create 
router.post('/save-mefps', (req, res) => {

let drawingTitle = req.body.drawingTitle;
let drawingCode = req.body.drawingCode;
let drawingLocation = req.body.drawingLocation;
let trade = req.body.trade;
let uploadFiles = req.body.uploadFiles;


const newDrawing = {
    id: mefpsDatabase.length + 1,
    drawingTitle: drawingTitle,
    drawingCode: drawingCode,
    drawingLocation: drawingLocation,
    trade: trade,
    uploadFiles: uploadFiles,
}

if ( mefpsDatabase.push(newDrawing) ) {
    res.status(200).json( {code:'success', msg:'done saving'} )
} else {
    res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
}

})
// update
router.put('/update-mefps/:mefpsId', (req, res)=>{
const mefps_id = req.params.mefpsId;

let drawingTitle = req.body.drawingTitle;
let drawingCode = req.body.drawingCode;
let drawingLocation = req.body.drawingLocation;
let trade = req.body.trade;
let uploadFiles = req.body.uploadFiles;

const updatemefpsRecord = {
    id: mefps_id,
    drawingTitle: drawingTitle,
    drawingCode: drawingCode,
    drawingLocation: drawingLocation,
    trade: trade,
    uploadFiles: uploadFiles,
}

const indexOfmefps =  mefpsDatabase.findIndex( (obj) => obj.id == mefps_id );

mefpsDatabase[indexOfmefps] = updatemefpsRecord;

if (mefpsDatabase) {
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
router.get('/get-mefps-data', (req, res) => {
res.json(mefpsDatabase);  
})

// update
router.get('/get-mefps/:id', (req, res) => {
const mefpsId = parseInt(req.params.id);
console.log(mefpsId)
console.log(mefpsDatabase);
const itemFound = mefpsDatabase.find( (item) => {  return mefpsId=== item.id } ) 

    if (itemFound){
        res.status(200).json(itemFound);
    } else {
        res.status(400).json("Invalid Id")
    }

})

// delete
router.delete('/delete-mefps/:mefpsId', (req, res)=>{
const mefps_id = req.params.mefpsId;
const indexValue =  mefpsDatabase.findIndex( (obj) => obj.id == mefps_id );
mefpsDatabase.splice(indexValue, 1); // 1, 1

if (mefpsDatabase) {
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