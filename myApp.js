let express = require('express');
let app = express();

app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date_string;
  let regex = /\d{5,}/;

  if (regex.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    };
  };
});