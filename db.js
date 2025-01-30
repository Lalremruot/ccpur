const { Pool } = require('pg');

// configure the database connection
const pool = new Pool({
  user: 'postgres',    // your PostgreSQL user
  password: 'root',    // your PostgreSQL password
  host: 'localhost',   // your PostgreSQL host
  port: 5432,          // default PostgreSQL port
  database: 'test'     // your database name
});

// Function to check the DB connection
const connectDB = async () => {
  try {
    // test the connection asynchronously
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected successfully:", res.rows[0]);
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

// Export pool for use in other files (such as for queries)
module.exports = pool;

connectDB();
