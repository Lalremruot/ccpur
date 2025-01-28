const { Pool } = require('pg');

// configure the database connection
const connectDB = async () => {
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'test'
});

 // test the connection
 pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected successfully");
  }
});
}
module.exports = connectDB; // Export pool as the default export
