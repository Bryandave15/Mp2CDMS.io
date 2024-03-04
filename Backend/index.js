//MVC - model, view, controller design pattern
const express = require("express");
const app = express();
const cors = require("cors")
const multer = require('multer');
const meetingRoutes = require('./routes/meetingRoute');
const loginRegisterRoutes = require('./routes/login-registerwithemial')
const inspectionRoutes = require('./routes/inspectionRoutes')
const structuralRoutes = require('./routes/drawingroutes/structuralRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')
const archiRoutes = require('./routes/drawingroutes/archiRoutes')
const asbuiltRoutes = require('./routes/drawingroutes/asbuiltRoutes')
const mefpsRoutes = require('./routes/drawingroutes/mefpsRoutes')
const reportRoutes = require ('./routes/reportRoutes')



app.use(express.urlencoded({ extended:true })) //for form submission
app.use(express.json()) //json response
app.use(
    cors(
        { origin : "http://localhost:3000" }  //front end
    )
)

// login routes
app.post('/login-validation', loginRegisterRoutes);
app.post('/registration', loginRegisterRoutes);
app.get('/get-reguser-data', loginRegisterRoutes);

// meeting routes
app.post('/save-meeting', meetingRoutes);
app.put('/update-meeting/:meetingId', meetingRoutes);
app.get('/get-meeting-data', meetingRoutes);
app.get('/get-meeting/:id', meetingRoutes);
app.delete('/delete-meeting/:meetingId', meetingRoutes);

// inspection routes

app.post('/save-todo', inspectionRoutes);
app.put('//update-todo/:todoId', inspectionRoutes);
app.get('/get-todo-data', inspectionRoutes);
app.get('/get-todo/:id', inspectionRoutes);
app.delete('/delete-todo/:todoId', inspectionRoutes);

// structural routes

app.post('/save-structural', structuralRoutes);
app.put('/update-structural/:structuralId', structuralRoutes);
app.use('/uploads', structuralRoutes);
app.get('/download-file/:filename', structuralRoutes);
app.get('/get-structural-data', structuralRoutes);
app.get('/get-structural/:id', structuralRoutes);
app.delete('/delete-structural/:structuralId', structuralRoutes);

// schedule routes
app.post('/save-schedule', scheduleRoutes);
app.put('/update-schedule/:scheduleId', scheduleRoutes);
app.get('/get-schedule-data', scheduleRoutes);
app.get('/get-schedule/:id', scheduleRoutes);
app.delete('/delete-schedule/:scheduleId', scheduleRoutes);

// archi routes
app.post('/save-archi', archiRoutes);
app.put('/update-archi/:archiId', archiRoutes);
app.get('/get-archi-data', archiRoutes);
app.get('/get-archi/:id', archiRoutes);
app.delete('/delete-archi/:archiId', archiRoutes);

// asbuilt routes
app.post('/save-asbuilt', asbuiltRoutes);
app.put('/update-asbuilt/:asbuiltId', asbuiltRoutes);
app.get('/get-asbuilt-data', asbuiltRoutes);
app.get('/get-asbuilt/:id', asbuiltRoutes);
app.delete('/delete-asbuilt/:asbuiltId', asbuiltRoutes);
    
// mefps routes
app.post('/save-mefps', mefpsRoutes);
app.put('/update-mefps/:mefpsId', mefpsRoutes);
app.get('/get-mefps-data', mefpsRoutes);
app.get('/get-mefps/:id', mefpsRoutes);
app.delete('/delete-mefps/:mefpsId', mefpsRoutes);

// report routes
app.post('/save-report', reportRoutes);
app.put('/update-report/:reportId', reportRoutes);
app.get('/get-report-data', reportRoutes);
app.get('/get-report/:id', reportRoutes);
app.delete('/delete-report/:reportId', reportRoutes);



    


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
