const mysql = require("mysql2");

const conn = mysql.createConnection({
    // user:process.env.DB_USER,
    // host:process.env.DB_HOST,
    // password:process.env.DB_PASSWORD,
    // database:process.env.DB_DATABASE
    user:"root",
    host:"localhost",
    password:"Akathoniya@1234",
    database: "crudmysql"
});


conn.connect((err)=>{
    if(err) throw err;
    console.log("DB connected");
});


module.exports = conn;