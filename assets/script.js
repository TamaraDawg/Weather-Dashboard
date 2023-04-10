//api related
const apiKey = '439e2addbc18b8368ececfb29ed3a010';
const searchBtn = document.getElementById('searchbtn')
//const lat = ;
//const lon= ;

//currentdate and city section
const date = document.getElementById('currentDate');
const seeforecast = document.getElementById('seeforecast');
const hideforecast = document.getElementById('hideforecast')
date.classList.add('hidden');
seeforecast.classList.add('hidden');
hideforecast.classList.add('hidden');
var currentDate = dayjs().format("MMM D, YYYY");
document.getElementById("currentDate").textContent = currentDate;
var cityInput = document.querySelector("#city");

searchBtn.addEventListener("click", searchCity);

cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

  
function searchCity(event) {
  event.preventDefault()
  var city = cityInput.value;
  console.log(city);
  localStorage.setItem('city', city); 
  loadResults();
}

function hidebuttonhides() {
  hideforecast.classList.add('hidden');
  const forecastList = document.querySelector('.forecastcontainer');
  forecastList.classList.add('hidden');
  seeforecastbtn();
}

function loadResults() {

  const city = localStorage.getItem('city'); // replace with user input
  var cityInput = document.querySelector("#city");
  cityInput.value = '';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      const temp = Math.round(data.main.temp - 273.15);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      document.getElementById("city-name").textContent = city;
      date.classList.remove('hidden');
      document.getElementById("weather-icon").setAttribute("src", icon);
      document.getElementById("temp").textContent = `${temp}°C`;
      document.getElementById("humid").textContent = `Humidity: ${humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${windSpeed} m/s`;
      seeforecast.classList.remove('hidden');
      console.log(data);
      history();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function history() {
  const list = document.querySelector('ul');
  const li = document.createElement('li');
  const city = localStorage.getItem('city');
  li.textContent = (city);
  li.classList.add('prevcity');
  list.appendChild(li);
  li.addEventListener('click', function () {
    this.remove();
    localStorage.setItem('city', city);
    loadResults();
  });

}

seeforecast.addEventListener("click", forecast);


function seeforecastbtn() {
  seeforecast.classList.remove('hidden');
  hideforecast.classList.add('hidden');
  
};

function forecast() {
  const city = localStorage.getItem('city');
  console.log('worked');
  seeforecast.classList.add('hidden');
  hideforecast.classList.remove('hidden');
  hideforecast.addEventListener("click", hidebuttonhides);
  
  const forecastList = document.querySelector('.forecastcontainer');
forecastList.classList.remove('hidden');
  forecastList.innerHTML = '';

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const forecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
      forecasts.forEach(forecast => {
        const icon = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        const temp = Math.round(forecast.main.temp - 273.15);
        const humidity = forecast.main.humidity;
        const date = dayjs(forecast.dt_txt).format('ddd MMM D');

        const listItem = document.createElement('li');

        const dateElement = document.createElement('div');
        dateElement.textContent = date;
        listItem.appendChild(dateElement);
        dateElement.classList.add('casttextcss')

        const iconElement = document.createElement('img');
        iconElement.src = icon;
        listItem.appendChild(iconElement);

        const tempElement = document.createElement('div');
        tempElement.textContent = `${temp}°C`;
        listItem.appendChild(tempElement);
tempElement.classList.add('casttextcss')
        const humidElement = document.createElement('div');
        humidElement.textContent = `Humidity: ${humidity}%`;
        listItem.appendChild(humidElement);

        forecastList.appendChild(listItem);
        forecastList.appendChild(listItem);
      });
    });
}
