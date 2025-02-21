// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido al Timestamp Microservice!");
});

app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  const regex = /\d{4}-\d{2}-\d{2}/;

  if (date) {
    if (regex.test(date)) {
      date = new Date(date);
    } else {
      date = parseInt(date);
      date = new Date(date);
      if (date == "Invalid Date") {
        res.json({ error: "Invalid Date" });
        return;
      }
    }
  } else {
    date = new Date(); // Si no hay parámetro, usar fecha actual
  }

  console.log(date.getTime())
  res.json({ unix: date.getTime(), utc: date.toUTCString() })

});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
