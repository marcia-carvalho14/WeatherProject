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
let degreeCelcius = "℃";
let degreeFehrn = "℉";

//information for api
let apiKey = "281450ec88936f4fa8ee9864682b49a0";
let url =
  "https://api.openweathermap.org/data/2.5/weather?q=boston&appid=281450ec88936f4fa8ee9864682b49a0&units=imperial";
let dailyUrl =
  "https://api.shecodes.io/weather/v1/forecast?query=boston&key=eac360db5fc86ft86450f3693e73o43f&units=imperial";

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function forecast(temp) {
  console.log(temp.data);
  let daily = temp.data.daily;
  let forecast = document.querySelector("#dailyForecast");
  let ul = document.createElement("ul");
  ul.className = "d-flex";
  ul.classList.add("m-0");
  ul.classList.add("p-0");
  forecast.append(ul);

  daily.forEach((day, index) => {
    if (index < 6) {
      let container = document.createElement("div");
      let div1 = document.createElement("div");
      let img = document.createElement("img");
      let div2 = document.createElement("div");

      img.className = "w-2";
      div1.className = "text-center";
      div2.className = "text-center";

      div1.innerHTML = formatDay(temp.data.daily[index + 1].time);
      img.src = day.condition.icon_url;
      div2.innerHTML = Math.round(day.temperature.day) + degreeFehrn;

      container.append(div1);
      container.append(img);
      container.append(div2);

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
forecast();
