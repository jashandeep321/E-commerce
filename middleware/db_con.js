require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(function(err) {
    if (err) {
        console.error('❌ Error connecting to database:', err);
        throw err;
    }
    console.log('✅ Connected to database successfully!');
   
});



module.exports=db;