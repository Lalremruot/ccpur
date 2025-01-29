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
     res.json(newUser);
     
    }
  } catch (error) {
    console.error(error.message)
  }
})

//new users registration
app.post('/users/new-add', async(req, res) => {
  try {
    
     const { name, email, password }= req.body;
     if (!name || !password)
    {
      return res.status(400).json({ error: 'Name and password are required' });
    }
     const newUser = await pool.query('INSERT INTO users ( name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
     res.json(newUser);
     
    
  } catch (error) {
    console.error(error.message)
  }
})
//application form submit

app.post('/users/newApplication', async(req, res) => {
    try {
      // Destructure the fields from the request body
      const {
        name,
        date_of_birth,
        aadhaar_no,
        sex,
        category,
        nationality,
        religion,
        name_of_community,
        contact_no,
        blood_group,
        email_id,
        fathers_name,
        fathers_occupation,
        mothers_name,
        mothers_occupation,
        permanant_address,
        present_address,
        guardian_name,
        guardian_address,
        course,
        applicant_signature,
        payment_status
      } = req.body;
  
      // Simple validation for required fields
      if (
        !name || 
        !date_of_birth || 
        !aadhaar_no || 
        !sex || 
        !category || 
        !nationality || 
        !relegion || 
        !name_of_community || 
        !contact_no || 
        !blood_group || 
        !email_id || 
        !fathers_name || 
        !fathers_occupation || 
        !mothers_name || 
        !mothers_occupation || 
        !permanant_address || 
        !present_address || 
        !guardian_name || 
        !guardian_address || 
        !course || 
        !applicant_signature || 
        !payment_status
      ) {
        return res.status(400).json({ error: 'All fields are required. Please check your inputs' });
      }
  
      // Insert the new user into the database
      const newUser = await pool.query(
        'INSERT INTO studentdata (name, date_of_birth, aadhaar_no, sex, category, nationality, religion, name_of_community, contact_no, blood_group, email_id, fathers_name, fathers_occupation, mothers_name, mothers_occupation, permanant_address, present_address, guardian_name, guardian_address, course, applicant_signature, payment_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,$22) RETURNING *',
        [
          name,
          date_of_birth,
          aadhaar_no,
          sex,
          category,
          nationality,
          religion,
          name_of_community,
          contact_no,
          blood_group,
          email_id,
          fathers_name,
          fathers_occupation,
          mothers_name,
          mothers_occupation,
          permanant_address,
          present_address,
          guardian_name,
          guardian_address,
          course,
          applicant_signature,
          payment_status
        ]
      );
  
      // Send the inserted user as the response
      res.json(newUser);
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  



//get TABLE USERS

//get all TABLE USERS

//update TABLE USERS

//delete FROM TABLE 

app.listen(port, async() => {
  console.log(`Server is running on port ${port}`);
  await connectDB(); // connect to the database
});
