const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3000;
app.set('views', './views');
app.set('view engine', 'ejs');

require('dotenv').config();


const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', { apiKey: process.env.API_KEY });
  });
  
app.post('/weather', (req, res) => {
  const forecastDays = req.body.forecastDays;
  res.render('weather', { forecastDays });
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
