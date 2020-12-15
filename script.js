// Create global variables
var cityList = [];
var cityname;
// Create local storage functions
initCityList();
initWeather();
// Create function to search for the city searched by the user
function renderCities(){
    $("#cityList").empty();
    $("#cityInput").val("");
    
    for (i=0; i<cityList.length; i++){
        var a = $("<a>");
        a.addClass("list-group-item list-group-item-action list-group-item-primary city");
        a.attr("data-name", cityList[i]);
        a.text(cityList[i]);
        $("#cityList").prepend(a);
    } 
}
// Create function to open city array list from local storage
function initCityList() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cityList = storedCities;
    } renderCities();
    }
// Create function to display the stored city's weather forecast
function initWeather() {
    var storedWeather = JSON.parse(localStorage.getItem("currentCity"));
    if (storedWeather !== null) {
        cityname = storedWeather;
        displayWeather();
        displayFiveDayForecast();
    }
}
// CReate function to save the city array
function storeCityArray() {
    localStorage.setItem("cities", JSON.stringify(cityList));
    }
// Create function to save current city to array
function storeCurrentCity() {
    localStorage.setItem("currentCity", JSON.stringify(cityname));
}
// Create event handler when you click the orange search button
$("#citySearchBtn").on("click", function(event){
    event.preventDefault();

    cityname = $("#cityInput").val().trim();
     if (cityList.length >= 5){  
        cityList.shift();
        cityList.push(cityname);
    }else{
    cityList.push(cityname);
    }
    storeCurrentCity();
    storeCityArray();
    renderCities();
    displayWeather();
    displayFiveDayForecast();
});
// Create api ajax call function to search & display the user inputted city forecast; linking the given openweathermap api

async function displayWeather() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=d3b85d453bf90d469c82e650a0a3da26";

    var response = await $.ajax({
        url: queryURL,
        method: "GET"
      })
        console.log(response);
        // Create div for main body
        var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
        var getCurrentCity = response.name;
        // Create current date
        var date = new Date();
        var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
        // Create current weather icon
        var getCurrentWeatherIcon = response.weather[0].icon;
        var displayCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png />");
        // Create current city and append it
        var currentCityEl = $("<h3 class = 'card-body'>").text(getCurrentCity+" ("+val+")");
        currentCityEl.append(displayCurrentWeatherIcon);
        currentWeatherDiv.append(currentCityEl);
        // Create variable for temperature
        var getTemp = response.main.temp.toFixed(1);
        // get temperature and add ° F, append it
        var tempEl = $("<p class='card-text'>").text("Temperature: "+getTemp+"° F");
        currentWeatherDiv.append(tempEl);
        var getHumidity = response.main.humidity;
        // get humidity and add %, append it
        var humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
        currentWeatherDiv.append(humidityEl);
        // get wind speed in mph, and append it
        var getWindSpeed = response.wind.speed.toFixed(1);
        var windSpeedEl = $("<p class='card-text'>").text("Wind Speed: "+getWindSpeed+" mph");
        currentWeatherDiv.append(windSpeedEl);
        // add latitude & longitude variables
        var getLong = response.coord.lon;
        var getLat = response.coord.lat;
        // add api for latitude/longitude coordinates for the city searched
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=d3b85d453bf90d469c82e650a0a3da26&lat="+getLat+"&lon="+getLong;
        var uvResponse = await $.ajax({
            url: uvURL,
            method: "GET"
        })

    // Created if & else statements for UV index results
    var getUVIndex = uvResponse.value;
    var uvNumber = $("<span>");
    if (getUVIndex > 0 && getUVIndex <= 4){
        uvNumber.addClass("favorable");
    }else if(getUVIndex >= 4.01 && getUVIndex <= 8){
        uvNumber.addClass("moderate");
    }else if(getUVIndex >= 8.01 && getUVIndex <= 11){
        uvNumber.addClass("severe");
    } 
    uvNumber.text(getUVIndex);
    var uvIndexEl = $("<p class='card-text'>").text("UV Index: ");
    uvNumber.appendTo(uvIndexEl);
    currentWeatherDiv.append(uvIndexEl);
    $("#weatherContainer").html(currentWeatherDiv);
}
// Create ajax and api call for the 5-day forecast container
async function displayFiveDayForecast() {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&units=imperial&appid=d3b85d453bf90d469c82e650a0a3da26";

    var response = await $.ajax({
        url: queryURL,
        method: "GET"
      })