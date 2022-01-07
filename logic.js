const cityInput = document.querySelector("#city-input");
const searchForm = document.querySelector("#search-form");
const APIKey = "b4c54130ab13df94f32df953f198e331";



function renderForecast(info) {
    console.log(info);
    let temperature = Math.round((info.main.temp - 273.5) * 1.8 + 32);
    let high = Math.round((info.main.temp_max - 273.5) * 1.8 + 32);
    let low = Math.round((info.main.temp_min - 273.5) * 1.8 + 32);
    console.log(low);
}

function saveCity(input){
    var history = localStorage.getItem("search-history");
    var tempArr = []
    if (history) {
        tempArr.push(history);
    }
    tempArr.push(input);
    localStorage.setItem("search-history", tempArr);
    renderHistory();
}

function renderHistory() {
    console.log(localStorage.getItem("search-history"));
    //So what I have gathered at this point is that I can't simply JSON.parse a list coming back from localStorage
    //var histArr = JSON.parse(localStorage.getItem("search-history"));
    console.log(histArr);
}

function getForecast(e){
    e.preventDefault();
    let city = cityInput.value.trim();
    let cityCoordURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    saveCity(city);
    fetch(cityCoordURL)
        .then(response => response.json())
        .then(data => renderForecast(data))
        .catch(error => console.log(error));
    
}

searchForm.addEventListener("submit", getForecast);