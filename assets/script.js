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

searchBtn.addEventListener("click", searchCity);


function searchCity(event) {
    event.preventDefault()
    var cityInput = document.querySelector("#city");
    var city = cityInput.value;
    console.log(city);
    localStorage.setItem('city', city);
    loadResults();
} 

function hidebuttonhides() {
    hideforecast.classList.add('hidden');
    loadResults();
}

function loadResults() { 
    
const city = localStorage.getItem('city'); // replace with user input

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
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

seeforecast.addEventListener("click", forecast);

function forecast() {
    const city = localStorage.getItem('city');
 console.log('worked');
 seeforecast.classList.add('hidden');
 hideforecast.classList.remove('hidden');
 hideforecast.addEventListener("click", hidebuttonhides);

 
 fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    
      
    console.log(data);
    console.log
  })
  .catch(error => {
    console.error('Error:', error);
  });
   


};
