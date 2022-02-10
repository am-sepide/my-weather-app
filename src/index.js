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
  if (currentCity.value.length > 0) {
    searchCity(currentCity.value);
  } else {
    currentLocation(event);
  }
}

// Convert celsius to fahrenheit

let tempF = document.querySelector("#fahrenheit");
tempF.addEventListener("click", changeCelsToFahr);
let celsiusTemperature = null;
function changeCelsToFahr(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let currentTemperature = document.querySelector(".temperature");
  let currentFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  currentTemperature.innerHTML = currentFahrenheit;
}

let tempS = document.querySelector("#celsius");
tempS.addEventListener("click", changeFahrToCels);
function changeFahrToCels(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  currentTemperature = document.querySelector(".temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

// Add API to code

function searchCity(city) {
  let apiKey = "c14461d947d8a9b418ae1e3abaf3b604";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

// Find the  current location

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c14461d947d8a9b418ae1e3abaf3b604";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

// Add forecast-hourly and forecast-daily HTML in JS

function getForecast(coordinates) {
  let apiKey = "c14461d947d8a9b418ae1e3abaf3b604";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecastHourly);
  axios.get(apiUrl).then(displayForecastDaily);
}

function formatForecastHour(hourstamp) {
  let date = new Date(hourstamp * 1000);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  hour = `${hour}:00`;
  return hour;
}

function displayForecastHourly(response) {
  let forecastHourInfo = response.data.hourly;
  let forecastHourly = document.querySelector("#forecast-hourly");
  let forecastHourlyHTML = "";
  forecastHourInfo.forEach(function (forecastHour, index) {
    if (index !== 0 && index < 5) {
      forecastHourlyHTML += ` <div class="col-3">
        <ul>
          <li>${formatForecastHour(forecastHour.dt)}</li>
          <li><img src="http://openweathermap.org/img/wn/${
            forecastHour.weather[0].icon
          }@2x.png" alt="${
        forecastHour.weather[0].description
      }"  width="42" /></li>
          <li>
            ${Math.round(forecastHour.temp)}°
          </li>
        </ul>
      </div>`;
    }
  });
  forecastHourly.innerHTML = forecastHourlyHTML;
}

function formatForecastDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}
function displayForecastDaily(response) {
  console.log(response.data.daily);
  let forecastDayInfo = response.data.daily;
  let forecastDaily = document.querySelector("#forecast-daily");
  let forecastDailyHTML = "";
  forecastDayInfo.forEach(function (forecastDay, index) {
    if (index !== 0 && index < 5) {
      forecastDailyHTML += ` 
      <div class="clo-3" class="forecast-days">
                    
                      <span>${formatForecastDay(forecastDay.dt)} </span>
                    
      </div>
      `;
    }
    if (index !== 0 && index < 5) {
      forecastDailyHTML += `             
        <div class="clo-1" class="forecast-icon">
                    
          <span><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="${forecastDay.weather[0].description}" class="forecast-icon" width="25" /> </span>
                     
      </div>
      `;
    }
    if (index !== 0 && index < 5) {
      forecastDailyHTML += `             
        <div class="clo-2" class="forecast-temp">
                    
           <span> ${Math.round(
             forecastDay.temp.max
           )}°/<span class="min">${Math.round(
        forecastDay.temp.min
      )}°</span> </span>
                     
      </div>                                           
                    
                      `;
    }
  });

  //    forecastDailyHTML += `
  //       <ul>
  //           <li>${formatForecastDay(forecastDay.dt)}</li>
  //           <li><img src="http://openweathermap.org/img/wn/${
  //             forecastDay.weather[0].icon
  //           }@2x.png" alt="${
  //       forecastDay.weather[0].description
  //     }" class="forecast-icon" width="25" /></li>
  //           <li>${Math.round(
  //             forecastDay.temp.max
  //           )}°/<span class="min">${Math.round(
  //       forecastDay.temp.min
  //     )}°</span></li>
  //       </ul>
  //     `;
  //   }
  // });
  forecastDaily.innerHTML = forecastDailyHTML;
}

// update all information about new city(city, country, temperature, wind and etc...)

function displayWeatherCondition(response) {
  console.log(response.data);
  getForecast(response.data.coord);

  celsiusTemperature = response.data.main.temp;

  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector(".max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector(".feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".visibility").innerHTML = Math.round(
    response.data.visibility / 1000
  );
  // document.querySelector(".precipitation").innerHTML = response.data.pop;

  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country} `;
  document.querySelector(".weather-situation").innerHTML =
    response.data.weather[0].main; //weather[0].description
  let iconElement = document.querySelector(".weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

searchCity("Berlin");
