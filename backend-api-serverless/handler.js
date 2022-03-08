const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const dbConfig = require("./config");

// db settings
const pool = dbConfig;

//corsOtions allow for test local and in the deploy
const corsOptions = {
  "Access-Control-Allow-Origin": [
    "http://127.0.0.1:5500*",
    "https://dev.d1t5l4r66dfh6a.amplifyapp.com*",
  ],
  origin: [
    "http://127.0.0.1:5500",
    "https://dev.d1t5l4r66dfh6a.amplifyapp.com",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

//route for get all products
app.get("/getAllProducts", (req, res, next) => {
  //db quering
  pool
    .getConnection()
    .then((conn) => {
      console.log("conected!!");
      conn
        .query("select * from product;")
        .then((rows) => {
          //send status and products in json
          res.status(200).json({ productos: rows });
          return conn.end();
        })
        .catch((err) => {
          //handle error
          console.log(err);
          conn.end();
          return res.status(400).json({ message: "query error" });
        });
    })
    .catch((err) => {
      //handle error
      console.log("Not conected");
      return res.status(503).json({ message: "db not connected" });
    });
});

//get filters products with %like%
app.post("/getProductsLike", (req, res, next) => {
  //db quering
  pool
    .getConnection()
    .then((conn) => {
      console.log("conected!!");
      conn
        .query(
          "select * from product where name like '%" + req.body.like + "%';"
        )
        .then((rows) => {
          //return status 200 and products %like%
          res.status(200).json({ productos: rows });
          return conn.end();
        })
        .catch((err) => {
          //handle error
          console.log(err);
          conn.end();
          return res.status(400).json({ message: "query error" });
        });
    })
    .catch((err) => {
      console.log("Not conected");
      return res.status(503).json({ message: "db not connected" });
    });
});

//get All categories for navbar category menu
app.get("/getAllCategories", (req, res, next) => {
  //db quering
  pool
    .getConnection()
    .then((conn) => {
      console.log("conected!!");
      conn
        .query("select * from category;")
        .then((rows) => {
          //return categories and status 200 all ok
          res.status(200).json({ categorias: rows });
          return conn.end();
        })
        .catch((err) => {
          //handle error
          console.log(err);
          conn.end();
          return res.status(400).json({ message: "query error" });
        });
    })
    .catch((err) => {
      console.log("Not conected");
      return res.status(503).json({
        message: "db not connected",
      });
    });
});

//in case of conection refuse
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
