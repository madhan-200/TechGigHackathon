// weather.js
// Weather Component (OpenWeatherMap)

const OPENWEATHER_API_KEY = '76a7afd0d03e34ad6968b9873096cecf'; // <-- Replace with your OpenWeatherMap API key

function renderWeatherUI() {
  const section = document.getElementById('weather-section');
  section.innerHTML = `
    <h2>Weather</h2>
    <div id="weather-info">Fetching weather...</div>
  `;
}

function updateWeatherInfo(html) {
  document.getElementById('weather-info').innerHTML = html;
}

function fetchWeather(lat, lon) {
  updateWeatherInfo('Fetching weather...');
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        updateWeatherInfo('Weather data unavailable.');
        return;
      }
      const icon = data.weather[0].icon;
      const desc = data.weather[0].description;
      const temp = Math.round(data.main.temp);
      const city = data.name;
      updateWeatherInfo(`
        <div style="display:flex;align-items:center;gap:1rem;">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon" style="width:60px;height:60px;">
          <div>
            <div style="font-size:2rem;font-weight:600;">${temp}&deg;C</div>
            <div style="text-transform:capitalize;">${desc}</div>
            <div style="font-size:1rem;color:#888;">${city}</div>
          </div>
        </div>
      `);
    })
    .catch(() => updateWeatherInfo('Weather data unavailable.'));
}

function getLocationAndFetchWeather() {
  if (!navigator.geolocation) {
    updateWeatherInfo('Geolocation not supported.');
    return;
  }
  updateWeatherInfo('Getting location...');
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      fetchWeather(latitude, longitude);
    },
    () => updateWeatherInfo('Location access denied.')
  );
}

function initWeather() {
  renderWeatherUI();
  getLocationAndFetchWeather();
}

function cleanupWeather() {
  // Weather component doesn't need cleanup as it's just a one-time fetch
  // But we keep the function for consistency with the interface
}

window.initWeather = initWeather;
window.cleanupWeather = cleanupWeather;