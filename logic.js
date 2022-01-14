const cityInput = document.querySelector("#city-input");
const searchForm = document.querySelector("#search-form");
const APIKey = "b4c54130ab13df94f32df953f198e331";
const histBox = document.querySelector('.buttons');
const dailyBox = document.querySelector('#daily');
const fiveDayBox = document.querySelector('#five-day');
//putting 'city' in the global scope since the One Call API object doesn't seem to have a city name property
let city;

function renderForecast(info){
    console.log(info);
    //create variables for all of the relevant weather info that needs to be displayed
    let timestamp = info.current.dt;
    let dateObj = new Date(timestamp * 1000);
    let humanDate = dateObj.toLocaleString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"});
    let temperature = Math.round((info.current.temp - 273.5) * 1.8 + 32);
    let uvi = info.current.uvi;
    let wind = info.current.wind_speed;
    let humidity = info.current.humidity;
    let icon = info.current.weather[0].icon;
    let description = info.current.weather[0].description;
    
    //create variable for the template that will be appended to the forecast box
    let template = `
        <span>${city}</span> - <span>${humanDate}</span>
        <br>
        <span>Temp: ${temperature}°F</span>
        <br>
        <span>Wind: ${wind}mph</span>
        <br>
        <span>Humidity: ${humidity}%</span>
    `
    
    dailyBox.innerHTML = template;
    renderFiveDay(info);
}

function renderFiveDay(info){
    console.log(info);
}

function getForecast(info) {
    city = info.name;
    let lon = info.coord.lon;
    let lat = info.coord.lat;
    let coordUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    fetch(coordUrl)
        .then(response => response.json())
        .then(data => renderForecast(data))
        .catch(error => console.log(error));
    
    // let template = `
    //     <span>${name}</span> - <span>${humanDate}</span>
    // `
    // dailyBox.innerHTML = template;
}

function saveCity(input){
    var history = localStorage.getItem("search-history");
    var tempArr = []
    if(!input){
        return;
    }
    if (history) {
        history = JSON.parse(localStorage.getItem("search-history"));
        for (city of history) {
            tempArr.push(city);
        }
    } 

    if (tempArr.includes(input)){
        console.log("Already got that one!");
        localStorage.setItem("search-history", JSON.stringify(tempArr));
        renderHistory();
    } else {
        console.log("That's a new one!");
        tempArr.push(input);
        localStorage.setItem("search-history", JSON.stringify(tempArr));
        renderHistory();
    }
    
}

function renderHistory() {
    var histArr = JSON.parse(localStorage.getItem("search-history"));
    //So what I have gathered at this point is that I can't simply JSON.parse a list coming back from localStorage
    //var histArr = JSON.parse(localStorage.getItem("search-history"));
    console.log(histArr);
    histBox.innerHTML = "";
    for (city of histArr) {
        var city = city;
        var button = document.createElement("button");
        button.classList.add("hist-btn");
        button.innerText = city;
        button.addEventListener("click", getCoordsAgain)
        histBox.append(button);

    }
    
}

function getCoordsAgain(e){
    console.log(e.target.innerText);
    let city = e.target.innerText;
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => getForecast(data))
        .catch(error => console.log(error));

}

function getCoords(e){
    e.preventDefault();
    let city = cityInput.value.trim();
    if(!city){
        return
    }
    let cityCoordURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    saveCity(city);
    fetch(cityCoordURL)
        .then(response => response.json())
        .then(data => getForecast(data))
        .catch(error => console.log(error));
    
}

searchForm.addEventListener("submit", getCoords);
renderHistory();