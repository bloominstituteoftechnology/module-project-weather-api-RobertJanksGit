
async function moduleProject4() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  const weatherWidget = document.querySelector("#weatherWidget");
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  const citySelect = document.querySelector("#citySelect");

  citySelect.addEventListener("change", () => {
    let city = citySelect.value;
    const pInfo = document.querySelector(".info")
    citySelect.disabled = true;
    weatherWidget.style.display = "none";
    pInfo.textContent = "Fetching weather data...";
    axios.get(`http://localhost:3003/api/weather?city=${city}`).then((res) => {
      citySelect.disabled = false;
      pInfo.textContent = '';
      weatherWidget.style.display = "block";

      //Todays weather stats
      const todayDescription = document.querySelector("#todayDescription");
      const todayStats = document.querySelector("#todayStats");
      const currentTempData = res.data.current.apparent_temperature;
      const tempMax = res.data.current.temperature_max;
      const tempMin = res.data.current.temperature_min;
      const precipitation = res.data.current.precipitation_probability;
      const humidity = res.data.current.humidity;
      const wind = res.data.current.wind_speed;
      const weatherDescription = res.data.current.weather_description;
      const weatherEmoji = [];
      descriptions.map((index) => {
        if (index[0] === weatherDescription) {
          weatherEmoji.push(index[1]);
        } 
      })

      document.querySelector("#apparentTemp").children[1].textContent = `${currentTempData}°`;
      todayStats.children[0].textContent = `${tempMin}° /${tempMax}°`;
      todayStats.children[1].textContent = `Precipitation: ${precipitation*100}%`;
      todayStats.children[2].textContent = `Humidity: ${humidity}%`;
      todayStats.children[3].textContent = `Wind: ${wind}m/s`
      todayDescription.textContent = `${weatherEmoji[0]}`

      //Weekly weather stats
      for (let i = 0; i < 3; i++) {
        const forecastDescription = document.querySelector("#forecast").children[i];
        const forecastStats = document.querySelector("#forecast").children[i];
        const forecastyMax = res.data.forecast.daily[i].temperature_max;
        const forecastMin = res.data.forecast.daily[i].temperature_min;
        const forecastPrecipitation = res.data.forecast.daily[i].precipitation_probability;
        const forecastWeatherDescription = res.data.forecast.daily[i].weather_description;
        const forecastWeatherEmoji = [];
        const dayOfWeek = res.data.forecast.daily[i].date;
        descriptions.map((index) => {
          if (index[0] === forecastWeatherDescription) {
            forecastWeatherEmoji.push(index[1]);
          }
        })

        forecastStats.children[2].textContent = `${forecastMin}° /${forecastyMax}°`;
        forecastStats.children[3].textContent = `Precipitation: ${forecastPrecipitation*100}%`;
        forecastDescription.children[1].textContent = `${forecastWeatherEmoji[0]}`;
        forecastDescription.children[0].textContent = `${getDayOfWeek(dayOfWeek)}`
        
        
        
      }
      const location = document.querySelector("#location");
      location.children[0].textContent = res.data.location.city;
      location.children[1].textContent = res.data.location.country;



      console.log(res.data, currentTempData, );
    }).catch((err) => {
      console.error(err.message)
    })
    
    console.log(city);
  });

  weatherWidget.style.display = "none";
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"],
  ];

  function getDayOfWeek(dateString) {
    // Array of day names
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Parse the date string to create a Date object
    const date = new Date(dateString);
    
    // Get the day of the week as a number (0-6)
    const dayIndex = date.getDay();
    
    // Return the corresponding day name
    return dayNames[dayIndex];
}
  // 👉 Tasks 1 - 5 go here

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { moduleProject4 };
else moduleProject4();
