// Update Date and time

function formatDay(date) {
  let years = date.getFullYear();
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let months = month[date.getMonth()];
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = day[date.getDay()];
  let dates = date.getDate();

  return `${days} ${dates} ${months}`;
}
let now = new Date();
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = formatDay(now);

function formatHour(hour) {
  let hours = hour.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = hour.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = formatHour(now);

// Update the searching city

let form = document.querySelector(".searching");
form.addEventListener("submit", updateCity);
function updateCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#searching-location");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity.value}`;
  searchCity(currentCity.value);
}

// Convert celsius to fahrenheit

let tempF = document.querySelector(".fahrenheit");
tempF.addEventListener("click", changeCelsToFahr);
function changeCelsToFahr(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".temperature");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  let currentFahrenheit = Math.round((temperature * 9) / 5 + 32);
  currentTemperature.innerHTML = `${currentFahrenheit}`;
}
let tempS = document.querySelector(".celsius");
tempS.addEventListener("click", changeFahrToCels);
function changeFahrToCels(event) {
  event.preventDefault();
  currentTemperature = document.querySelector(".temperature");
  temperature = currentTemperature.innerHTML;
  emperature = Number(temperature);
  let currentCelsius = Math.round(((temperature - 32) * 5) / 9);
  currentTemperature.innerHTML = `${currentCelsius}`;
}

// Add API to code
function searchCity(city) {
  let apiKey = "c14461d947d8a9b418ae1e3abaf3b604";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
// update all information about new city(city, country, temperature, wind and etc...)
function showTemperature(response) {
  console.log(response.data);
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country} `;
  document.querySelector(".weather-situation").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".weather-icon").innerHTML =
    response.data.weather[0].icon;
}
