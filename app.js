function changeCurrentWeather(response) {
  let changeCurrentTemp = document.querySelector(".current-temperature");
  let temp = response.data.temperature.current;

  let titleElement = document.querySelector(".title-city");
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
  console.log(response.data.condition.icon_url);

  if (response.data.city === "New York County") {
    titleElement.innerHTML = "New York";
  } else {
    titleElement.innerHTML = response.data.city;
  }

  let blankSpace = "&nbsp";
  let blankAElement = document.querySelector("#blankSpacesA");
  let blankBElement = document.querySelector("#blankSpacesB");

  if (response.data.city.length >= 12) {
  } else if (
    response.data.city.length === 10 ||
    response.data.city.length === 11
  ) {
    blankAElement.innerHTML = `${blankSpace}${blankSpace}`;
    blankBElement.innerHTML = `${blankSpace}${blankSpace}`;
    console.log("Hello?");
  } else if (
    response.data.city.length === 8 ||
    response.data.city.length === 9
  ) {
    blankAElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}`;
    blankBElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}`;
  } else if (
    response.data.city.length === 6 ||
    response.data.city.length === 7
  ) {
    blankAElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
    blankBElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
  } else if (
    response.data.city.length === 4 ||
    response.data.city.length === 5
  ) {
    blankAElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
    blankBElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
  } else if (
    response.data.city.length === 2 ||
    response.data.city.length === 3
  ) {
    blankAElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
    blankBElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
  } else {
    blankAElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
    blankBElement.innerHTML = `${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}${blankSpace}`;
  }
  //debugger;

  changeCurrentTemp.innerHTML = Math.round(temp);
  titleCountryElement = document.querySelector(".title-country");
  if (response.data.country === "United States of America") {
    titleCountryElement.innerHTML = "USA";
  } else {
    titleCountryElement.innerHTML = response.data.country;
  }
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

let searchFormElement = document.querySelector("#changeCityForm");
searchFormElement.addEventListener("submit", changeCityTitle);

searchCity("Melbourne");
