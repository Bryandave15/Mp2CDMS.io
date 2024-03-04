const express = require('express')
const router = express.Router()


// m Batabse
const reportDatabase = [
];
// create 
router.post('/save-report', (req, res) => {

const {reportTitle, reportType, description, createdBy, dateCreated, attachment} = req.body

const newReport = {
    id: reportDatabase.length + 1,
    reportTitle: reportTitle,
    reportType: reportType,
    description: description,
    createdBy: createdBy,
    dateCreated: dateCreated,
    attachment: attachment
}

if ( reportDatabase.push(newReport) ) {
    res.status(200).json( {code:'success', msg:'done saving'} )
} else {
    res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
}

})
// update
router.put('/update-report/:reportId', (req, res)=>{
const report_id = req.params.reportId;

const {reportTitle, reportType, description, createdBy, dateCreated, attachment} = req.body

const updateReportRecord = {
    id: report_id,
    reportTitle: reportTitle,
    reportType: reportType,
    description: description,
    createdBy: createdBy,
    dateCreated: dateCreated,
    attachment: attachment
}

const indexOfreport =  reportDatabase.findIndex( (obj) => obj.id == report_id );

reportDatabase[indexOfreport] = updateReportRecord;

if (reportDatabase) {
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
router.get('/get-report-data', (req, res) => {
res.json(reportDatabase);  
})

// update
router.get('/get-report/:id', (req, res) => {
const reportId = parseInt(req.params.id);

const itemFound = reportDatabase.find( (item) => {  return reportId=== item.id } ) 

    if (itemFound){
        res.status(200).json(itemFound);
    } else {
        res.status(400).json("Invalid Id")
    }

})

// delete
router.delete('/delete-report/:reportId', (req, res)=>{
const report_id = req.params.reportId;
const indexValue =  reportDatabase.findIndex( (obj) => obj.id == report_id );
reportDatabase.splice(indexValue, 1); 

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

});

module.exports = router