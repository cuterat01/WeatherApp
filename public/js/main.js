document.querySelector('.submit').addEventListener('click', getWeather);

function getWeather() {
  const cityName = document.getElementById('cityName').value;
  //let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`;


  fetch('/forecast')
    .then((res) => res.json())
    .then((data) => {
      const forecastDays = data.forecast.forecastday;
      //console.log(forecastDays)
      // Send the forecast data to the server
      fetch('/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ forecastDays }),
      })
        .then((res) => res.text())
        .then((html) => {
          // Display the rendered EJS template
          document.getElementById('weather-info').innerHTML = html;
          document.querySelector('h2').innerText = `${data.location.name}, ${data.location.country}`
        });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
