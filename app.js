function changeCityTitle(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#changeCityInput");

  let titleElement = document.querySelector(".title-city");
  titleElement.innerHTML = `${searchInput.value}`;
}

let searchFormElement = document.querySelector("#changeCityForm");
searchFormElement.addEventListener("submit", changeCityTitle);
