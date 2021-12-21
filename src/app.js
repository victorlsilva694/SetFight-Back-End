const express = require('express');
const app = express();
const router = express.Router();
const index = require('./Routes/Routes');
const cors = require("cors");


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

function verifyAuth(req, res, next){
  next()
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(verifyAuth);
app.use(router)
app.use('/', index);

module.exports = app;