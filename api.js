const express = require('express');

const serverless = require('serverless-http');

const index = require('./routes/index');
const app = express();

app.use('/.netlify/functions/api', index);  // path must route to lambda

module.exports.handler = serverless(app);