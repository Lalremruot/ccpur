const pool = require('../db');

// Application form
const newapps = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const {
      session,
      full_name,
      date_of_birth,
      aadhaar_no,
      sex,
      category,
      nationality,
      religion,
      name_of_community,
      contact_no,
      blood_group,
      email,
      fathers_name,
      fathers_occupation,
      mothers_name,
      mothers_occupation,
      permanent_address,
      present_address,
      guardian_name,
      guardian_address,
      hslc_board,
      hslc_rollno,
      hslc_year,
      hslc_div,
      hslc_tmarks,
      hslc_inst,
      classXII_board,
      classXII_rollno,
      classXII_year,
      classXII_div,
      classXII_tmarks,
      classXII_inst,
      course,
      mil,
      subject,
      } = req.body;

    // Simple validation for required fields
    if (
      !session ||
      !full_name || 
      !date_of_birth || 
      !aadhaar_no || 
      !sex || 
      !category || 
      !nationality || 
      !religion ||
      !name_of_community || 
      !contact_no || 
      !blood_group || 
      !email || 
      !fathers_name || 
      !fathers_occupation || 
      !mothers_name || 
      !mothers_occupation || 
      !permanent_address || 
      !present_address || 
      !guardian_name || 
      !guardian_address || 
      !hslc_board ||
      !hslc_rollno||
      !hslc_div||
      !hslc_tmarks||
      !hslc_inst||
      !classXII_board||
      !classXII_rollno||
      !classXII_year||
      !classXII_div||
      !classXII_tmarks||
      !classXII_inst||
      !course||
      !mil||
      !subject
    ) {
      return res.status(400).json({ error: 'All fields are required. Please check your inputs' });
    }

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO studentdata (' +
        'session, full_name, date_of_birth, aadhaar_no, sex, category, nationality, religion, ' +
        'name_of_community, contact_no, blood_group, email, fathers_name, fathers_occupation, ' +
        'mothers_name, mothers_occupation, permanent_address, present_address, guardian_name, ' +
        'guardian_address, hslc_board, hslc_rollno, hslc_year, hslc_div, hslc_tmarks, hslc_inst, ' +
        'classXII_board, classXII_rollno, classXII_year, classXII_div, classXII_tmarks, ' +
        'classXII_inst, course, mil, subject) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, ' +
        '$22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35) ' +
      'RETURNING *',
      [
        session,
        full_name,
        date_of_birth,
        aadhaar_no,
        sex,
        category,
        nationality,
        religion,
        name_of_community,
        contact_no,
        blood_group,
        email,
        fathers_name,
        fathers_occupation,
        mothers_name,
        mothers_occupation,
        permanent_address,
        present_address,
        guardian_name,
        guardian_address,
        hslc_board,
        hslc_rollno,
        hslc_year,
        hslc_div,
        hslc_tmarks,
        hslc_inst,
        classXII_board,
        classXII_rollno,
        classXII_year,
        classXII_div,
        classXII_tmarks,
        classXII_inst,
        course,
        mil,
        subject,
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
