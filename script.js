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
      
        // Create current date
     
        // Create current weather icon
        
        // Create current city and append it
        
        // Create variable for temperature

        // get temperature and add ° F, append it
        
        // get humidity and add %, append it
        
        // get wind speed in mph, and append it
        
        // add latitude & longitude variables
       
        // add api for latitude/longitude coordinates for the city searched