const express = require('express');
const router = express.Router();

// Structural Batabse
const archiDatabase = [
    {
    id:1,
    drawingTitle: " First Architectural title",
    drawingCode: "Drawing-001",
    drawingLocation: "44th Floor > Unit 69",
    trade: "Architectural"
    },
    {
    id:2,
    drawingTitle: " Second Architectural title",
    drawingCode: "Drawing-002",
    drawingLocation: "69th Floor > Unit A",
    trade: "Masonary"
    },
    {
    id:3,
    drawingTitle: " Third Architectural title",
    drawingCode: "Drawing-003",
    drawingLocation: "50th Floor > Unit A",
    trade: "Finishes"
    },
    {
    id:4,
    drawingTitle: " Fourth Architectural title",
    drawingCode: "Drawing-004",
    drawingLocation: "50th Floor > Unit D",
    trade: "Civil Works"
    },
    {
    id:5,
    drawingTitle: " Fifth Architectural title",
    drawingCode: "Drawing-005",
    drawingLocation: "50th Floor > Unit D",
    trade: "Sanitary"
    },    
    {
    id:6,
    drawingTitle: " Fourth Architectural title",
    drawingCode: "Drawing-004",
    drawingLocation: "50th Floor > Unit D",
    trade: "Civil Works"
    },
    {
    id:7,
    drawingTitle: " Fifth Architectural title",
    drawingCode: "Drawing-005",
    drawingLocation: "50th Floor > Unit D",
    trade: "Sanitary"
    }, 
    {
        id:7,
        drawingTitle: " Fifth Architectural title",
        drawingCode: "Drawing-005",
        drawingLocation: "50th Floor > Unit D",
        trade: "Sanitary"
        },    
    
    
    ];
    // create 
    router.post('/save-archi', (req, res) => {
    
    let drawingTitle = req.body.drawingTitle;
    let drawingCode = req.body.drawingCode;
    let drawingLocation = req.body.drawingLocation;
    let trade = req.body.trade;
    let uploadFiles = req.body.uploadFiles;
    
    
    const newDrawing = {
       id: archiDatabase.length + 1,
       drawingTitle: drawingTitle,
       drawingCode: drawingCode,
       drawingLocation: drawingLocation,
       trade: trade,
       uploadFiles: uploadFiles,
    }
    
    if ( archiDatabase.push(newDrawing) ) {
       res.status(200).json( {code:'success', msg:'done saving'} )
    } else {
       res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
    }
    
    })
    // update
    router.put('/update-archi/:archiId', (req, res)=>{
    const archi_id = req.params.archiId;
    
    let drawingTitle = req.body.drawingTitle;
    let drawingCode = req.body.drawingCode;
    let drawingLocation = req.body.drawingLocation;
    let trade = req.body.trade;
    let uploadFiles = req.body.uploadFiles;
    
    const updatearchiRecord = {
       id: archi_id,
       drawingTitle: drawingTitle,
       drawingCode: drawingCode,
       drawingLocation: drawingLocation,
       trade: trade,
       uploadFiles: uploadFiles,
    }
    
    const indexOfarchi =  archiDatabase.findIndex( (obj) => obj.id == archi_id );
    
    archiDatabase[indexOfarchi] = updatearchiRecord;
    
    if (archiDatabase) {
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
    router.get('/get-archi-data', (req, res) => {
    res.json(archiDatabase);  
    })
    
    // update
    router.get('/get-archi/:id', (req, res) => {
    const archiId = parseInt(req.params.id);
    console.log(archiId)
    console.log(archiDatabase);
    const itemFound = archiDatabase.find( (item) => {  return archiId=== item.id } ) 
    
    if (itemFound){
        res.status(200).json(itemFound);
    } else {
        res.status(400).json("Invalid Id")
    }
    
    })
    // let myArr = [}
    // delete
    router.delete('/delete-archi/:archiId', (req, res)=>{
    const archi_id = req.params.archiId;
    const indexValue =  archiDatabase.findIndex( (obj) => obj.id == archi_id );
    archiDatabase.splice(indexValue, 1); // 1, 1
    
    if (archiDatabase) {
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