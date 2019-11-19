const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const dbConfig = require('./config/var');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/greeting', (req, res) => {
  res.send({ greeting: 'SERVER hello YOU!!!'});
});

const port = process.env.PORT || 5000;
app.listen(port);
  
console.log(`server listening on ${port}`);