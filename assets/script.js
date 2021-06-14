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
      //console.log(currentDate);
      var daytag =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1) +
        "-" +
        currentDate.getDate();
      document.getElementById("today").innerHTML = daytag;
      //console.log(daytag);

      var weatherPic = data.weather[0].icon;
      var currentPic = document.getElementById("currentPic");
      currentPic.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + weatherPic + ".png"
      );

      var cityName = data.name;
      var nametag = document.createElement("p");
      nametag.textContent = cityName;

      var tempt = data.main.temp;
      var temptag = document.createElement("p");
      temptag.textContent = "Temperature: " + tempt + " ºF";

      var humidity = data.main.humidity;
      var humiditytag = document.createElement("p");
      humiditytag.textContent = "Humidity: " + humidity + "%";

      var windSpeed = data.wind.speed;
      var windtag = document.createElement("p");
      windtag.textContent = "Wind Speed: " + windSpeed + " MPH";

      //console.log(daytag, nametag, temptag, humiditytag, windtag);
      //console.log(todayWeather);
      //console.log(currentPic);
      todayWeather.append(nametag, currentPic, temptag, humiditytag, windtag);
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
