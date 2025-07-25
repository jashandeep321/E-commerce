require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(function(err){
    if(err)
    throw err;

// let sql="insert into emp(depid,empname,add1,salary,DOB,DOJ) values(4,'vijay','22/3 sunny enclave','46000','1998-10-10','2022-12-03');";
// db.query(sql,function(err,result)
// {
//     if(err)
//     throw err;
// console.log("one record inserted");
// console.log(result);
// });

});
module.exports=db;