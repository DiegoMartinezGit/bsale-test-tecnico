const serverless = require("serverless-http");
const express = require("express");
const app = express();
const mariadb = require('mariadb');
const cors=require('cors')

// db settings 
const pool = mariadb.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com", 
  user:'bsale_test', 
  password: 'bsale_test',
  database:"bsale_test"
});
//cors 
const corsOptions ={
  origin:'http://127.0.0.1:5500', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.get("/getAllProducts", (req, res, next) => {
  pool.getConnection()
    .then(conn => {
        console.log("conected!!");
        conn.query("select * from product;")
        .then(rows =>{
          res.status(200).json({productos: rows})
          return conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err);
          return conn.end();
        })
        
    }).catch(err => {
      console.log("Not conected")
      return res.status(503).json({
        message: "db not connected",
      });
    });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
