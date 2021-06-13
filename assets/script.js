var currentDate = new Date();
var APIkey = "d91f911bcf2c0f925fb6535547a5ddc9";
var todayWeather = document.getElementById("today");

var searchBtn = document.getElementById("search-button");

//5 day forecast
var forecastFive = document.querySelector("#forecastAll");
var searchHistory = document.querySelector("#history");
var cityHistory = 1;

function Weather(cityName) {
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIkey +
    "&units=imperial";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      var currentDate = new Date();
      console.log(currentDate);
      var day = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      //nameEl.innerHTML =
      // response.data.name + "(" + month + "/" + day + "/" + year + ")";

      var cityName = data.name;
      var nametag = document.createElement("p");
      nametag.textContent = cityName;

      var tempt = data.main.temp;
      var temptag = document.createElement("p");
      temptag.textContent = tempt;

      var humidity = data.main.humidity;
      var humiditytag = document.createElement("p");
      humiditytag.textContent = humidity;

      var windSpeed = data.wind;
      var windtag = document.createElement("p");
      windtag.textContent = windSpeed;

      todayWeather.append(nametag, temptag, humiditytag, windtag);
    })

    .then(function (forcastResponse) {
      for (let i = 1; i < 6; i++) {}
    });
}

function search() {
  var citySearch = document.getElementById("city").value;
  console.log(citySearch);
  Weather(citySearch);
}

searchBtn.addEventListener("click", search);
