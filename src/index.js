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
let degreeFehrn = "℉";

//information for api
let apiKey = "281450ec88936f4fa8ee9864682b49a0";
let url =
  "https://api.shecodes.io/weather/v1/current?query=boston&key=be4393eda0e0c5df64b74oft05bfad34&units=imperial";
let dailyUrl =
  "https://api.shecodes.io/weather/v1/forecast?query=boston&key=eac360db5fc86ft86450f3693e73o43f&units=imperial";

function defaultCity(original) {
  let city = document.querySelector(".city");
  city.innerHTML = original.data.city;
  let temperature = Math.round(original.data.temperature.current);
  tempF = temperature;
  tempC = Math.round(((temperature - 32) * 5) / 9);
  document.querySelector(".temp").innerHTML = temperature + degreeFehrn;
  document.querySelector("#feelsLike").innerHTML =
    Math.round(original.data.temperature.feels_like) + degreeFehrn;
  document.querySelector("#humidity").innerHTML =
    Math.round(original.data.temperature.humidity) + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(original.data.wind.speed) + "mph";
  document.querySelector(".description").innerHTML =
    original.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", original.data.condition.icon_url);
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

    let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${result}&key=be4393eda0e0c5df64b74oft05bfad34&units=imperial`;

    let dailyUrl = `https://api.shecodes.io/weather/v1/forecast?query=${result}&key=eac360db5fc86ft86450f3693e73o43f&units=imperial`;

    const element = document.getElementById("dailyUL");
    element.remove();

    axios.get(cityUrl).then(currentTemp);
    axios.get(dailyUrl).then(forecast);
  }
}

function currentTemp(current) {
  console.log(current.data);
  let temperature = Math.round(current.data.temperature.current);
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
  iconElement.setAttribute("src", original.data.condition.icon_url);
  iconElement.setAttribute("alt", current.data.weather[0].description);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function forecast(temp) {
  let daily = temp.data.daily;
  let forecast = document.querySelector("#dailyForecast");
  let ul = document.createElement("ul");
  ul.id = "dailyUL";
  ul.className = "d-flex";
  ul.classList.add("m-0");
  ul.classList.add("p-0");
  forecast.append(ul);

  daily.forEach((day, index) => {
    if (index < 6) {
      let container = document.createElement("div");
      let dayName = document.createElement("div");
      let img = document.createElement("img");
      let dailyTemp = document.createElement("div");

      img.className = "w-2";
      dayName.className = "text-center";
      dailyTemp.className = "text-center";

      dayName.innerHTML = formatDay(temp.data.daily[index + 1].time);
      img.src = day.condition.icon_url;
      dailyTemp.innerHTML = Math.round(day.temperature.day) + degreeFehrn;

      container.append(dayName);
      container.append(img);
      container.append(dailyTemp);

      ul.append(container);
    }
  });
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
axios.get(dailyUrl).then(forecast);
document.querySelector("#input").addEventListener("submit", getCity);
document.querySelector("#current").addEventListener("click", clickMe);
