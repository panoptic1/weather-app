const cityInput = document.querySelector("#city-input");
const searchForm = document.querySelector("#search-form");
const APIKey = "b4c54130ab13df94f32df953f198e331";

function getCoords(input){
    console.log(input);
    let city = input;
    let cityCoordURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    fetch(cityCoordURL)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

}

function getForecast(e){
    e.preventDefault();
    city = cityInput.value.trim();
    console.log(city);
    getCoords(city);
    
}

searchForm.addEventListener("submit", getForecast);