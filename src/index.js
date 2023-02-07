// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// // write your code here

// let city = prompt("Enter a city").trim().toLowerCase();

// if (weather[city]) {
//   let cel = weather[city].temp;
//   let fern = Math.round(cel * 1.8 + 32);
//   cel = Math.round(cel);

//   alert(
//     `It is currently ${cel}℃ (${fern}℉) in ${city} with a humidity of ${weather[city].humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

//information for current day and time
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
  "https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=281450ec88936f4fa8ee9864682b49a0&units=imperial";

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
  //   let contWeek = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${result}&cnt=5&appid=281450ec88936f4fa8ee9864682b49a0&units=imperial`;
  //   axios.get(contWeek).then(weekTemp);
}

//couldn't do this function bc api key doesn't have access for daily call
// function weekTemp(weeks) {
//   console.log(weeks);
//   let temperature = Math.round(weeks.data.main.temp);
//   document.querySelector(".temp").innerHTML = temperature;
// }

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

document.querySelector("#input").addEventListener("submit", getCity);
document.querySelector("#celcius").addEventListener("click", celcius);
document.querySelector("#fahrenheit").addEventListener("click", fehrn);
document.querySelector("#current").addEventListener("click", clickMe);

// document.querySelector("#fahrenheit").addEventListener("click", fahrenheit);
// let tempFahr = 10;
// let tempBottom = 15;
// let degreeCelcius = "℃";
// function fahrenheit() {}
