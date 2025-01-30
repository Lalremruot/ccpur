const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const userRouter = require('./route/route.js');
require('dotenv').config();


// Initialize dotenv to access environment variable
const port = process.env.PORT;
dotenv.config();

//Middleware
const app = express();
app.use(cors());
app.use(express.json());// req.body
app.use("/api/user", userRouter);
app.use(express.urlencoded({ extended: true }));

// Unknown route handler
app.use((err, req, res) => {
  // Log the error and the URL where it occurred
  console.error('Error:', err.message);
  //log the URL that triggered the error
  console.log('Request URL that caused the error:', req.url);
   // Log the query parameters from the request (if any)
   console.log('Query parameters:', req.query);
   // Log the headers sent with the request
   console.log('Request headers:', req.header);

  // Respond with a generic error message and status 500
  res.status(500).send('Route not found');
});



app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});
