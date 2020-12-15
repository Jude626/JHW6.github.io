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
