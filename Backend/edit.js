    // mefpst Batabse
    const mefpstDatabase = [
        {
        id:1,
        drawingTitle: " First mefpst title",
        drawingCode: "Drawing-001",
        drawingLocation: "69th Floor > Unit 69",
        trade: "Architectural"
        },
        {
        id:2,
        drawingTitle: " Second mefpst title",
        drawingCode: "Drawing-002",
        drawingLocation: "69th Floor > Unit A",
        trade: "Mechanical"
        },
        {
        id:3,
        drawingTitle: " Third mefpst title",
        drawingCode: "Drawing-003",
        drawingLocation: "50th Floor > Unit A",
        trade: "Electrical"
        },
        {
        id:4,
        drawingTitle: " Fourth mefpst title",
        drawingCode: "Drawing-004",
        drawingLocation: "50th Floor > Unit D",
        trade: "Civil Works"
        },
        {
        id:5,
        drawingTitle: " Fifth mefpst title",
        drawingCode: "Drawing-005",
        drawingLocation: "50th Floor > Unit D",
        trade: "Sanitary"
        },      


    ];
    // create 
    app.post('/save-mefpst', (req, res) => {

    let drawingTitle = req.body.drawingTitle;
    let drawingCode = req.body.drawingCode;
    let drawingLocation = req.body.drawingLocation;
    let trade = req.body.trade;
    let uploadFiles = req.body.uploadFiles;


    const newDrawing = {
        id: mefpstDatabase.length + 1,
        drawingTitle: drawingTitle,
        drawingCode: drawingCode,
        drawingLocation: drawingLocation,
        trade: trade,
        uploadFiles: uploadFiles,
    }

    if ( mefpstDatabase.push(newDrawing) ) {
        res.status(200).json( {code:'success', msg:'done saving'} )
    } else {
        res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
    }

    })
    // update
    app.put('/update-mefpst/:mefpstId', (req, res)=>{
    const mefpst_id = req.params.mefpstId;

    let drawingTitle = req.body.drawingTitle;
    let drawingCode = req.body.drawingCode;
    let drawingLocation = req.body.drawingLocation;
    let trade = req.body.trade;
    let uploadFiles = req.body.uploadFiles;

    const updatemefpstRecord = {
        id: mefpst_id,
        drawingTitle: drawingTitle,
        drawingCode: drawingCode,
        drawingLocation: drawingLocation,
        trade: trade,
        uploadFiles: uploadFiles,
    }

    const indexOfmefpst =  mefpstDatabase.findIndex( (obj) => obj.id == mefpst_id );

    mefpstDatabase[indexOfmefpst] = updatemefpstRecord;

    if (mefpstDatabase) {
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
    app.get('/get-mefpst-data', (req, res) => {
    res.json(mefpstDatabase);  
    })

    // update
    app.get('/get-mefpst/:id', (req, res) => {
    const mefpstId = parseInt(req.params.id);
    console.log(mefpstId)
    console.log(mefpstDatabase);
    const itemFound = mefpstDatabase.find( (item) => {  return mefpstId=== item.id } ) 

        if (itemFound){
            res.status(200).json(itemFound);
        } else {
            res.status(400).json("Invalid Id")
        }

    })
    // let myArr = [}
    // delete
    app.delete('/delete-mefpst/:mefpstId', (req, res)=>{
    const mefpst_id = req.params.mefpstId;
    const indexValue =  mefpstDatabase.findIndex( (obj) => obj.id == mefpst_id );
    mefpstDatabase.splice(indexValue, 1); // 1, 1

    if (mefpstDatabase) {
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

    // {
    // id:1,
    // drawingTitle: " First Structural title",
    // drawingCode: "Drawing-001",
    // drawingLocation: "69th Floor > Unit 69",
    // trade: "Architectural"
    // },
    // {
    // id:2,
    // drawingTitle: " Second Structural title",
    // drawingCode: "Drawing-002",
    // drawingLocation: "69th Floor > Unit A",
    // trade: "Mechanical"
    // },
    // {
    // id:3,
    // drawingTitle: " Third Structural title",
    // drawingCode: "Drawing-003",
    // drawingLocation: "50th Floor > Unit A",
    // trade: "Electrical"
    // },
    // {
    // id:4,
    // drawingTitle: " Fourth Structural title",
    // drawingCode: "Drawing-004",
    // drawingLocation: "50th Floor > Unit D",
    // trade: "Civil Works"
    // },
    // {
    // id:5,
    // drawingTitle: " Fifth Structural title",
    // drawingCode: "Drawing-005",
    // drawingLocation: "50th Floor > Unit D",
    // trade: "Sanitary"
    // },     
    // {
    // id:6,
    // drawingTitle: " Third Structural title",
    // drawingCode: "Drawing-003",
    // drawingLocation: "50th Floor > Unit A",
    // trade: "Electrical"
    // },
    // {
    // id:7,
    // drawingTitle: " Fourth Structural title",
    // drawingCode: "Drawing-004",
    // drawingLocation: "50th Floor > Unit D",
    // trade: "Civil Works"
    // },
    // {
    // id:8,
    // drawingTitle: " Fifth Structural title",
    // drawingCode: "Drawing-005",
    // drawingLocation: "50th Floor > Unit D",
    // trade: "Sanitary"
    // },  
