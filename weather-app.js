$(document).ready(function() {

// array to store cities
var cities = [];

//capture city name
// need explanation on this
function dispayCityWeather() {

    var city = $(this).attr("data-name");
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=697b47836ddecca53fd9822ab4c82a6c"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        var todayDiv = $("<div class = todayWeather>");

        var cityName = response.name;
        var one = $("<h5>").text("Weather for " + cityName + ":");
        console.log(one);
        todayDiv.append(one);

        var weather = response.main.temp;
        var two = $("<p>").text("The temp today is: " + weather);
        todayDiv.append(two);

        var feels = response.main.feels_like;
        var three = $("<p>").text("But it feels like: " + feels);
        todayDiv.append(three);

        var low = response.main.temp_min;
        var four = $("<p>").text("The low for today is: " + low);
        todayDiv.append(four);

        var high = response.main.temp_max;
        var five = $("<p>").text("The high will be: " + high);
        todayDiv.append(five);

        $("#today").prepend(todayDiv);

      });
}

//function to display weather
function addButtons() {
//prevent from showing duplicates
$(".list-cities").empty();
    // loop through array of cities
    for (var i = 0; i < cities.length; i++) {
        // add buttons to the web page
        var a = $("<button>");
        //adding class to allow to be selected
        a.addClass("city-weather");
        //adding a data-atrribute
        a.attr("data-name",cities[i]);
        // adding the name of the city by user input
        a.text(cities[i]);
        var ul = $("<ul>").html(a);
        $(".list-cities").append(ul);
    }
};

//when add button is clicked
$("#add").on("click", function(event) {
    event.preventDefault();
    //get text from input field
    var city = $("#input-city").val().trim();
    //push the city to the array
    cities.push(city);

    //call addButtons function
    addButtons();
});

//adding click event listener to all elements with "city-weather" class
$(document).on("click", ".city-weather", dispayCityWeather);

addButtons();


})