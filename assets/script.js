var currentDate = new Date();
var APIkey = "d91f911bcf2c0f925fb6535547a5ddc9";
var todayAndForecastWeather = document.getElementById("todayAndForecast");

var searchBtn = document.getElementById("search-button");

var lastSearches = [];

function formatDate(date) {
  // Code from a friend who claims its a much better way to do the same thing,but i am not deleting my two hours of codes:
  // return date.toLocaleString(undefined, {
  //   dateStyle: "medium",
  //   timeStyle: undefined
  // });
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

function getData(cityName) {
  // need to get latitude/longitude for the OpenWeather One Call API.
  // starting with a city name, then use the first
  // query to get long/lat and then a second query to get the data for it.
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIkey +
    "&units=imperial";

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.coord)
    .then((coord) => {
      let url =
        "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
        coord.lat +
        "&lon=" +
        coord.lon +
        "&appid=" +
        APIkey;
      return fetch(url);
    })
    .then((response) => response.json());
}

function displayWeather(cityName, data) {
  console.log(data);

  // reset container
  while (todayAndForecastWeather.firstChild) {
    todayAndForecastWeather.removeChild(todayAndForecastWeather.firstChild);
  }

  var currentDate = new Date();
  //console.log(currentDate);
  var daytag = document.createElement("p");
  daytag.textContent = formatDate(currentDate);

  //console.log(daytag);

  var weatherPic = data.current.weather[0].icon;
  var currentPic = document.createElement("img");
  currentPic.setAttribute(
    "src",
    "https://openweathermap.org/img/w/" + weatherPic + ".png"
  );

  var nametag = document.createElement("div");
  nametag.textContent = cityName;
  nametag.classList = "city-title";

  var dayTag = document.createElement("div");
  dayTag.className = "dayBox";

  var tempt = data.current.temp;
  var temptag = document.createElement("p");
  temptag.textContent = "Temperature: " + tempt + " ºF";

  var humidity = data.current.humidity;
  var humiditytag = document.createElement("p");
  humiditytag.textContent = "Humidity: " + humidity + "%";

  var windSpeed = data.current.wind_speed;
  var windtag = document.createElement("p");
  windtag.textContent = "Wind Speed: " + windSpeed + " MPH";

  var uvi = data.current.uvi;
  var uvitag = document.createElement("p");
  uvitag.textContent = "UVI: " + uvi;

  //console.log(daytag, nametag, temptag, humiditytag, windtag);
  //console.log(todayWeather);
  //console.log(currentPic);
  todayAndForecastWeather.append(
    nametag,
    daytag,
    currentPic,
    temptag,
    humiditytag,
    windtag,
    uvitag
  );
}

function forecastWeather(cityName, data) {
  var forecastTag = document.createElement("div");
  forecastTag.id = "forecastContainer";

  var forecastTitle = document.createElement("div");
  forecastTitle.textContent = "5-Day-Forecast: ";
  forecastTitle.classList = "forecast-title";

  for (let i = 0; i < 5; i++) {
    let dailyData = data.daily[i];

    var dayTag = document.createElement("div");
    dayTag.className = "dayBox";

    var day = new Date(dailyData.dt * 1000);
    var dateTag = document.createElement("p");
    dateTag.textContent = formatDate(day);

    var picIcon = dailyData.weather[0].icon; // "w0"
    var picTag = document.createElement("img"); // <img />
    picTag.setAttribute(
      "src",
      "https://openweathermap.org/img/w/" + picIcon + ".png"
    );

    var tempTag = document.createElement("p");
    tempTag.textContent = "Temp: " + dailyData.temp.day + " ºF";

    var humTag = document.createElement("p");
    humTag.textContent = "Humi: " + dailyData.humidity + "%";

    var windTag = document.createElement("p");
    windTag.textContent = "Wind: " + dailyData.wind_speed + " MPH";

    var uviTag = document.createElement("p");
    uviTag.textContent = "UVI: " + dailyData.uvi;

    dayTag.append(dateTag, picTag, tempTag, humTag, windTag, uviTag);
    forecastTag.appendChild(dayTag);
  }
  todayAndForecastWeather.append(forecastTitle, forecastTag);
}

function showWeather(cityName) {
  getData(cityName).then((data) => {
    displayWeather(cityName, data);
    forecastWeather(cityName, data);
  });
}

function showHistoryList() {
  let container = document.getElementById("historyList");
  // reset container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let city of lastSearches) {
    let button = document.createElement("button");
    let link = document.createElement("a");
    link.href = "#";
    link.textContent = city;
    button.classList = "cityHistory";

    //()=> shedule this function
    link.addEventListener("click", () => showWeather(city));
    button.appendChild(link);
    container.appendChild(button);
  }
}

function updateHistoryList(cityName) {
  // The maximum number of searches kept in memory.
  let maxSearches = 5;
  lastSearches = lastSearches.slice(0, maxSearches - 1);
  lastSearches.unshift(cityName);
}

function onCitySelect(cityName) {
  showWeather(cityName);
  updateHistoryList(cityName);
  showHistoryList();
}

function search() {
  var cityName = document.getElementById("city").value;
  onCitySelect(cityName);
}

searchBtn.addEventListener("click", search);
