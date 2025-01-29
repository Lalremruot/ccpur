const pool = require('../db');

// Application form
const newapps = async (req, res) => {
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
      !religion ||
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
    const result = await pool.query(
      'INSERT INTO studentdata (name, date_of_birth, aadhaar_no, sex, category, nationality, religion, name_of_community, contact_no, blood_group, email_id, fathers_name, fathers_occupation, mothers_name, mothers_occupation, permanant_address, present_address, guardian_name, guardian_address, course, applicant_signature, payment_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *',
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

    // Extract the inserted user data from the result
    const newUser = result.rows[0]; // This gives you the inserted row

    // Send the inserted user as the response
    res.json(newUser);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = newapps;
