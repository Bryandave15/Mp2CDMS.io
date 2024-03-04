const express = require('express');
const router = express.Router();

// my data base for inspection
const inspectionDatabase = [
    {
        id: 1,
        inspectionName: " First inspection name ",
        inspectionCode: " Inspection-001",
        itemDescription:" First Inspection description",
        trade: "Trade 1" ,
        inspectionDate: "02/12/24",
        location: "GroundFloor > Lobby",
        contractor:"Contractor 1",
        inspector: "Inspector 1 ",
        dateClosed: "2/12/24",
        uploadFiles: "Fke path for the File"
},
{
        id: 2,
        inspectionName: " Second Inspection name ",
        inspectionCode: " Inspection-002",
        itemDescription:" Second Inspection description",
        trade: "Trade 2" ,
        inspectionDate: "02/12/24",
        location: "Second Floor > Unit-A",
        contractor:"Contractor 2",
        inspector: "Inspector 2 ",
        dateClosed: "2/12/24",
        uploadFiles: "Fke path for the File"
},
{
        id: 3,
        inspectionName: " Third Inspection name ",
        inspectionCode: " Inspection-003",
        itemDescription:" Third Inspection description",
        trade: "Trade 3" ,
        inspectionDate: "02/12/24",
        location: "Third Floor > Unit-A",
        contractor:"Contractor 3",
        inspector: "Inspector 3 ",
        dateClosed: "2/12/24",
        uploadFiles: "Fke path for the File"
},
{
        id: 4,
        inspectionName: " Fourth Inspection name ",
        inspectionCode: " Inspection-004",
        itemDescription:" Fourth Inspection description",
        trade: "Trade 4" ,
        inspectionDate: "02/12/24",
        location: "Fourth Floor > Unit-A",
        contractor:"Contractor 4",
        inspector: "Inspector 4 ",
        dateClosed: "2/12/24",
        uploadFiles: "Fke path for the File"
},
{
        id: 5,
        inspectionName: " Fifth Inspection name ",
        inspectionCode: " Inspection-005",
        itemDescription:" Fifth Inspection description",
        trade: "Trade 5" ,
        inspectionDate: "02/12/24",
        location: "Fifth Floor > Unit-A",
        contractor:"Contractor 5",
        inspector: "Inspector 5 ",
        dateClosed: "2/12/24",
        uploadFiles: "Fke path for the File"
},


 ];
 // create 
router.post('/save-todo', (req, res) => {

    const {inspectionName, inspectionCode, itemDescription, trade, inspectionDate, location, contractor, inspector, dateClosed, uploadFiles  } = req.body


    const newTodo = {
        id: inspectionDatabase.length + 1,
        inspectionName: inspectionName,
        inspectionCode: inspectionCode,
        itemDescription: itemDescription,
        trade: trade,
        inspectionDate: inspectionDate,
        location: location,
        contractor: contractor,
        inspector: inspector,
        dateClosed: dateClosed,
        uploadFiles: uploadFiles,
    }

   if ( inspectionDatabase.push(newTodo) ) {
        res.status(200).json( {code:'success', msg:'done saving'} )
   } else {
        res.status(400).json( {code:'failed', msg:'error encountered while saving'} )
   }

})
// update
router.put('/update-todo/:todoId', (req, res)=>{
    const todo_id = req.params.todoId;

    const {inspectionName, inspectionCode, itemDescription, trade, inspectionDate, location, contractor, inspector, dateClosed, uploadFiles  } = req.body
    

    const updateTodoRecord = {
        id: todo_id,
        inspectionName: inspectionName,
        inspectionCode: inspectionCode,
        itemDescription: itemDescription,
        trade: trade,
        inspectionDate: inspectionDate,
        location: location,
        contractor: contractor,
        inspector: inspector,
        dateClosed: dateClosed,
        uploadFiles: uploadFiles,
    }

   const indexOfTodo =  inspectionDatabase.findIndex( (obj) => obj.id == todo_id );

   inspectionDatabase[indexOfTodo] = updateTodoRecord;

   if (inspectionDatabase) {
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
router.get('/get-todo-data', (req, res) => {
    res.json(inspectionDatabase);  
})

// update
router.get('/get-todo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const itemFound = inspectionDatabase.find( (item) => {  return todoId === item.id } ) 
     if (itemFound){
         res.status(200).json(itemFound);
     } else {
         res.status(400).json("Invalid Id")
     }
})

// delete
router.delete('/delete-todo/:todoId', (req, res)=>{
    const todo_id = req.params.todoId;
    const indexValue =  inspectionDatabase.findIndex( (obj) => obj.id == todo_id );
    inspectionDatabase.splice(indexValue, 1); // 1, 1

    if (inspectionDatabase) {
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