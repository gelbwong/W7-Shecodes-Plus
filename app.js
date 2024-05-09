function changeCurrentWeather(response) {
  let changeCurrentTemp = document.querySelector(".current-temperature");
  console.log(response);
  let temp = response.data.temperature.current;
  let titleElement = document.querySelector(".title-city");
  if (response.data.city === "New York County") {
    titleElement.innerHTML = "New York";
  } else {
    titleElement.innerHTML = response.data.city;
  }

  changeCurrentTemp.innerHTML = Math.round(temp);
  titleCountryElement = document.querySelector(".title-country");
  if (response.data.country === "United States of America") {
    titleCountryElement.innerHTML = "USA";
  } else {
    titleCountryElement.innerHTML = response.data.country;
  }
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
