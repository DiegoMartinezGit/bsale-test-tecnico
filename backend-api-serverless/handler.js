const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors=require('cors');
const dbConfig =require('./config');


// db settings 
const pool = dbConfig;
//corsOtions
const corsOptions ={
  "Access-Control-Allow-Origin": "http://127.0.0.1:5500*",
  origin:'http://127.0.0.1:5500', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
//middlewares
app.use(cors(corsOptions));
app.use(express.json());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/');
//   res.header('Access-Control-Allow-Credentials', true); 
//   next();
// });
app.get("/getAllProducts", (req, res, next) => {
  //db quering 
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

app.post("/getProductsLike", (req, res, next) => {
  //db quering 
  pool.getConnection()
    .then(conn => {
        console.log("conected!!", req.body);
        console.log(req.body.like)

        conn.query("select * from product where name like '%" + req.body.like+"%';")
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

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
