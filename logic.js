const cityInput = document.querySelector("#city-input");
const searchForm = document.querySelector("#search-form");
const APIKey = "b4c54130ab13df94f32df953f198e331";
const histBox = document.querySelector('.buttons');
const dailyBox = document.querySelector('#daily');
const fiveDayBox = document.querySelector('#five-day');

let city;

function renderForecast(info){
    console.log(info);
    console.log(city);
}

function getForecast(info) {
    console.log(info);
    city = info.name;
    let timestamp = info.dt;
    let dateObj = new Date(timestamp * 1000);
    let humanDate = dateObj.toLocaleString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"});;
    let temperature = Math.round((info.main.temp - 273.5) * 1.8 + 32);
    let high = Math.round((info.main.temp_max - 273.5) * 1.8 + 32);
    let low = Math.round((info.main.temp_min - 273.5) * 1.8 + 32);
    let icon = info.weather[0].icon;
    let description = info.weather[0].description;
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
    console.log(history);
    console.log(typeof history);
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