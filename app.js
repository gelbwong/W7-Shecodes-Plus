function changeCurrentWeather(response) {
  let changeCurrentTemp = document.querySelector(".current-temperature");
  let temp = response.data.temperature.current;

  let weatherConditionElement = document.querySelector(
    "#currentWeatherCondition"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let iconElement = document.querySelector("#weatherIcon");

  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);

  weatherConditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" alt="${response.data.condition.description}" />`;
  dateElement.innerHTML = formatDate(date);
  changeBlanks(response.data.city);
  changeCity(response.data.city);
  changeCountry(response.data.country);
  getForecast(response.data.city);

  changeCurrentTemp.innerHTML = Math.round(temp);
}
function changeCountry(country) {
  let titleCountryElement = document.querySelector(".title-country");
  if (country === "United States of America") {
    titleCountryElement.innerHTML = "USA";
  } else if (
    country === "United Kingdom of Great Britain and Northern Ireland"
  ) {
    titleCountryElement.innerHTML = "UK";
  } else {
    titleCountryElement.innerHTML = country;
  }
}
function changeCity(city) {
  let titleElement = document.querySelector(".title-city");
  if (city === "New York County") {
    titleElement.innerHTML = "New York";
  } else {
    titleElement.innerHTML = city;
  }
}
function changeBlanks(city) {
  let blank = "&nbsp";
  let blankAElement = document.querySelector("#blankSpacesA");
  let blankBElement = document.querySelector("#blankSpacesB");

  if (city.length > 11) {
    blankAElement.innerHTML = ``;
    blankBElement.innerHTML = ``;
  } else if (city.length === 10 || city.length === 11) {
    blankAElement.innerHTML = `${blank}`;
    blankBElement.innerHTML = `${blank}`;
  } else if (city.length === 8 || city.length === 9) {
    blankAElement.innerHTML = `${blank}${blank}${blank}`;
    blankBElement.innerHTML = `${blank}${blank}${blank}`;
  } else if (city.length === 6 || city.length === 7) {
    blankAElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}`;
    blankBElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}`;
  } else if (city.length === 4 || city.length === 5) {
    blankAElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}${blank}${blank}`;
    blankBElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}${blank}${blank}`;
  } else if (city.length === 2 || city.length === 3) {
    blankAElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}${blank}${blank}${blank}`;
    blankBElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}${blank}${blank}${blank}`;
  } else {
    blankAElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}${blank}${blank}${blank}${blank}`;
    blankBElement.innerHTML = `${blank}${blank}${blank}${blank}${blank}${blank}${blank}${blank}${blank}`;
  }
  //debugger;
}
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a5ca0d6dt74bbobcf0c9aa390574f791";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(changeCurrentWeather);
}

function changeCityTitle(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#changeCityInput");

  searchCity(searchInput.value);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div>
            <div class="forecast-date">${day}</div>
            <div class="future-forecast-emoji">☀️</div>
            <div class="forecast-temperature">
              <span class="forecast-temp-max">12</span>°/<span
                class="forecast-temp-min"
                >10</span>°
            </div> 
            </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(city) {
  let apiKey = "a5ca0d6dt74bbobcf0c9aa390574f791";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}
let searchFormElement = document.querySelector("#changeCityForm");
searchFormElement.addEventListener("submit", changeCityTitle);

searchCity("Melbourne");
