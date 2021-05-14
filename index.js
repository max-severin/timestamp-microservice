const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

//;

app.use(cors());

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/public', express.static(`${__dirname}/public`));

//

app.get('/', (req, res) => res.sendFile(`${__dirname}/view/index.html`));

app.get('/api/', (req, res) => {
  const dateObj = new Date();

  res.json({
    unix: dateObj.valueOf(),
    utc: dateObj.toUTCString()
  });
});

app.get('/api/:date', (req, res) => {  
  const dateStr = req.params.date;

  if (/\d{5,}/.test(dateStr)) {
    const dateInt = parseInt(dateStr);

    res.json({
      unix: dateInt,
      utc: new Date(dateInt).toUTCString()
    });
  } else {
    const dateObj = new Date(dateStr);

    if (dateObj.toString() === 'Invalid Date') {
      res.json({ error : 'Invalid Date' });
    } else {
      res.json({
        unix: dateObj.valueOf(),
        utc: dateObj.toUTCString()
      });
    }
  }
});

//

app.listen(port, () => console.log(`Node is listening on port ${port}...`));
