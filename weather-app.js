$(document).ready(function() {

// array to store cities
var cities = [];

//function to display weather
function addButtons() {
//prevent from showing duplicates
$(".list-cities").empty();
    // loop through array of cities
    for (var i = 0; i < cities.length; i++) {
        // add buttons to the web page
        var a = $("<button>");
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

addButtons();


})