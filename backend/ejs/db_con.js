var mysql=require('mysql');
var db=mysql.createConnection({
    hostname:"localhost",
    user:"jashan",
    password:"Root123!@#",
    database:"ecommerce",
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