const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3000;

const request = require('request');

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/forecast', (req, res) => {
  request(
    { url: `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
