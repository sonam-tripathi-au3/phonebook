var express = require('express')
var cors = require('cors')
var app = express()
var db = require('./dbConfig/db')
const Directory = require('./models/model')
var bodyParser=require("body-parser")

app.use(bodyParser.json());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);
const fs = require('fs');
let userData = fs.readFileSync('./database.json');  
let jsonArr = JSON.parse(userData);

  for(let obj of jsonArr){
      const loan = new Directory({...obj})
      loan.save()
  }
  app.use(cors())
  app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
  })
require('./routes/route')(app)

app.listen('8080', console.log('listening'))