const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const pool = require('../backEnd/db');
const userRouter = require('./route/route.js');
const connectDB = require('./db.js');

// Initialize dotenv to access environment variable
const port = process.env.PORT
dotenv.config();

//Middleware
const app = express();
app.use(cors());
app.use(express.json());// req.body


//Routes//

// User routes
app.use("/api/user", userRouter);

// Use the application router for the /newapps route
app.use("/api/user", applicationRouter);

// Unknown route handler
app.use((req, res) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

//User registration : existing student
app.post('/users/exist-user', async(req, res) => {
  try {
    
     const { name, email, phone_number, roll_number,semester, password}= req.body;
     
    if (!name || !password || !roll_number)
    {
      return res.status(400).json({ error: 'Name, rollnumber and password are required' });
    }else 
    {
     const newUser = await pool.query('INSERT INTO users ( name, email, phone_number, roll_number,semester, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [ name, email, phone_number, roll_number,semester, password]);
     res.json(newUser[0]);
     
    }
  } catch (error) {
    console.error(error.message)
  }
});

//new users registration
app.post('/users/new-add', async(req, res) => {
  try {
    
     const { name, email, password }= req.body;
     if (!name || !password)
    {
      return res.status(400).json({ error: 'Name and password are required' });
    }
     const newUser = await pool.query('INSERT INTO users ( name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
     res.json(newUser[0]);
     
    
  } catch (error) {
    console.error(error.message)
  }
})

  

app.listen(port, async() => {
  console.log(`Server is running on port ${port}`);
  await connectDB(); // connect to the database
});
