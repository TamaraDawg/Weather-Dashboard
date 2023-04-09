//api related
const apiKey = '439e2addbc18b8368ececfb29ed3a010';
const searchBtn = document.getElementById('searchbtn')
//const lat = ;
//const lon= ;

//currentdate and city section
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



function loadResults() { 
const city = localStorage.getItem('city'); // replace with user input

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // handle the weather data here
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
