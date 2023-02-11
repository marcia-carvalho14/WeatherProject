let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let day = days[now.getDay()];
let weekDay = document.querySelector("#week-day");
weekDay.innerHTML = day;
let currentTime = document.querySelector(".time");
let hour = now.getHours();
let minute = now.getMinutes();
currentTime.innerHTML = `${hour}:${minute}`;

//information for temperature
let tempC;
let tempF;
let tempCelBottom = 15;
let tempFernBottom = 25;
let degreeCelcius = "℃";
let degreeFehrn = "℉";

//information for api
let apiKey = "281450ec88936f4fa8ee9864682b49a0";
let url =
  "https://api.openweathermap.org/data/2.5/weather?q=boston&appid=281450ec88936f4fa8ee9864682b49a0&units=imperial";

function defaultCity(original) {
  let city = document.querySelector(".city");
  city.innerHTML = original.data.name;
  let temperature = Math.round(original.data.main.temp);
  tempF = temperature;
  tempC = Math.round(((temperature - 32) * 5) / 9);
  document.querySelector(".temp").innerHTML = temperature + degreeFehrn;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    original.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    Math.round(original.data.main.humidity) + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(original.data.wind.speed) + "mph";
  document.querySelector(".description").innerHTML =
    original.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${original.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", original.data.weather[0].description);
}

function getCity(run) {
  run.preventDefault();
  let city = document.querySelector(".city");
  let search = document.querySelector("#search");
  let result = search.value;

  if (result === "") {
    alert("Please enter city 😐");
  } else {
    city.innerHTML = result;

    let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=281450ec88936f4fa8ee9864682b49a0&units=imperial`;

    axios.get(cityUrl).then(currentTemp);
  }
}

function celcius() {
  let num = document.querySelector(".temp");
  if (tempC === undefined) {
    tempC = -1;
  }
  num.innerHTML = `${tempC}${degreeCelcius}`;
  let others = document.querySelectorAll(".degree");
  others.forEach(
    (degree) => (degree.innerHTML = `${tempCelBottom}${degreeCelcius}`)
  );
}

function fehrn() {
  let num = document.querySelector(".temp");
  if (tempF === undefined) {
    tempF = 29;
  }
  num.innerHTML = `${tempF}${degreeFehrn}`;
  let others = document.querySelectorAll(".degree");
  others.forEach(
    (degree) => (degree.innerHTML = `${tempFernBottom}${degreeFehrn}`)
  );
}

// function runTemp(response) {
//   console.log(response);
//   let temperature = Math.round(response.data.main.temp);
//   let h1 = document.querySelector("h1");
//   h1.innerHTML = `It is ${temperature}℉ in Sydney`;
// }

function currentTemp(current) {
  console.log(current.data);
  let temperature = Math.round(current.data.main.temp);
  tempF = temperature;
  tempC = Math.round(((temperature - 32) * 5) / 9);
  document.querySelector(".temp").innerHTML = temperature + degreeFehrn;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    current.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    Math.round(current.data.main.humidity) + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(current.data.wind.speed) + "mph";
  document.querySelector(".description").innerHTML =
    current.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${current.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", current.data.weather[0].description);
}

function clickMeWeather(current) {
  let h1 = document.querySelector(".city");
  console.log(current.data);
  let temperature = Math.round(current.data.main.temp);
  h1.innerHTML = current.data.name;
  tempF = temperature;
  document.querySelector(".temp").innerHTML = temperature + degreeFehrn;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    current.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    Math.round(current.data.main.humidity) + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(current.data.wind.speed) + "mph";
  document.querySelector(".description").innerHTML =
    current.data.weather[0].description;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(clickMeWeather);
}

function clickMe() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

axios.get(url).then(defaultCity);
document.querySelector("#input").addEventListener("submit", getCity);
document.querySelector("#celcius").addEventListener("click", celcius);
document.querySelector("#fahrenheit").addEventListener("click", fehrn);
document.querySelector("#current").addEventListener("click", clickMe);

// document.querySelector("#fahrenheit").addEventListener("click", fahrenheit);
// let tempFahr = 10;
// let tempBottom = 15;
// let degreeCelcius = "℃";
// function fahrenheit() {}
