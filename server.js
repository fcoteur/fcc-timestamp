// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  
  let inputString = req.params.date_string;
  let regDate = /\d{4}\-\d{2}\-\d{2}/;
  let regInteger = /^\+?[1-9][\d]*$/;
  let date;
   
  if (inputString === undefined) date = new Date();
  if (regDate.exec(inputString)) date = new Date(inputString);
  if (regInteger.exec(inputString)) date = new Date(parseInt(inputString));
  if (date === undefined) {
    date = {"error" : "Invalid Date" }
    res.json(date);
  } else {
    let output = {};
    output.unix = date.getTime();
    output.utc = date.toUTCString();
    res.json(output);
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});