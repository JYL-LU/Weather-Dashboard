function onRecord(event) {
  var pressedButton = event.target;
  //var parentRow = pressedButton.parentNode;
  var songSearch = parentRow.querySelector("input"); //finding the element
  var rowValue = songSearch.value; //taking the value of an element and assign it to a var
  // var hour = parentRow.firstChild.textContent; //assign textcontent of the first child to that var
  window.localStorage.setItem();
}
var currentDate = new Date();
var APIkey = "6276b9aa897040f4bf0908895e0edfa7";

let url =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "appid" +
  APIkey;
