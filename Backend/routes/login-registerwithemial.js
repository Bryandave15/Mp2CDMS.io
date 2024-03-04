const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
    
}
);

// Define a single database to store user profiles
const userDB = [
    {
        firstname: "Bryan Dave",
        lastname: "Aguilar",
        username: "Bryan_15",
        email: "bryan@gmail.com",
        password: "bryan",
        consfirmPassword: "bryan"
    },
    {
        firstname: "Bryan Dave",
        lastname: "Aguilar",
        username: "staff",
        email: "bryan@gmail.com",
        password: "123",
        consfirmPassword: "123"
    }
];

// Login validation endpoint
router.post('/login-validation/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // Find the user in the userDB array
    const user = userDB.find((user) => {
        return user.username === username && user.password === password;
    });

    if (user) {
        // If user exists, return success response with user data
        res.status(200).json({
            code: "success",
            msg: "Username and Password matched a record",
            loginUser: user
        });
    } else {
        // If user does not exist, return error response
        res.status(401).json({
            code: "failed",
            msg: "Incorrect Username and Password"
        });
    }
});


// Registration endpoint
router.post('/registration', (req, res) => {
    // Extract data from request body
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    // Generate an ID for the new user
    let id = userDB.length + 1;

    // Create a new user object
    const newUser = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };
    // Function to send approval email
const sendApprovalEmail = (newUser) => {
    const mailOptions = {
        from: process.env.EMAIL, // Your email address
        to: process.env.ADMIN_EMAIL, // Your email address for approval
        subject: 'New Registration Approval',
        html: `
            <p>Hello Admin,</p>
            <p>A new user has registered:</p>
            <p>Name: ${newUser.firstname} ${newUser.lastname}</p>
            <p>Username: ${newUser.username}</p>
            <p>Email: ${newUser.email}</p>
            <p>Please approve or reject this registration.</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            // Handle error
        } else {
            console.log('Email sent: ' + info.response);
            // Optionally, handle success
        }
    });
    
};

    // Send approval email to admin
    sendApprovalEmail(newUser);

    // Respond with a success message
    res.status(200).json({
        code: "success",
        msg: "Registration request sent for approval"
    });
});



module.exports = router;
