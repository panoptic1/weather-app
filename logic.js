let city = "";
const cityInput = document.querySelector("#city-input");
const inputBtn = document.querySelector("#search-btn");
const APIKey = "11f79b3d45f42e998837721c4179ed02";
const citySearchURL = `api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIKey}`

function getCity(e){
    e.preventDefault();
    city = cityInput.value;
    console.log(city); 
}

inputBtn.addEventListener("click", getCity);