$(document).ready(function() {

// array to store cities
var cities = [];

//capture city name
function dispayCityWeather() {

   

    //would like to clear the screen before showing new information

    // need explanation on this
    var city = $(this).attr("data-name");
    // console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=697b47836ddecca53fd9822ab4c82a6c"

    var queryURL1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=697b47836ddecca53fd9822ab4c82a6c"
    
    var currentDate = new Date();
    var month = currentDate.getMonth()+1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var fullDate = month + "/" + day + "/" + year;
    $("#date").text(fullDate);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var todayDiv = $("<div class = todayWeather>");
        var cityName = response.name;
        var one = $("<h5>").text("Weather for " + cityName + ":");
        // console.log(response);

        //adding icon
        var icon = response.weather[0].icon;
        var image = $("<img>").attr("src" , "http://openweathermap.org/img/wn/" + icon + ".png");
        // $("#date").append(image);

        var weather = (response.main.temp - 273.15) * 1.80 + 32;;
        var two = $("<p>").text("The temp today is: " + weather.toFixed(2));

        var feels = (response.main.feels_like - 273.15) * 1.80 + 32;;
        var three = $("<p>").text("But it feels like: " + feels.toFixed(2));

        var low = (response.main.temp_min - 273.15) * 1.80 + 32;;
        var four = $("<p>").text("The low for today is: " + low.toFixed(2));

        var high = (response.main.temp_max - 273.15) * 1.80 + 32;;
        var five = $("<p>").text("The high will be: " + high.toFixed(2));
        
        var des = response.weather[0].main; 
        var six = $("<p>").text("Current condition: " + des);

        var hum = response.main.humidity;
        var seven = $("<p>").text("Humidity level is: " + hum);

        var wind = response.wind.speed;
        var eight = $("<p>").text("Wind speed: " + wind);

        todayDiv.append(one, image, two, three, four, five, six, seven, eight);
        

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        // console.log(lat, lon);
        
        var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=697b47836ddecca53fd9822ab4c82a6c";
        $.ajax({
            url: queryURLuv,
            method: "GET"
          }).then(function(response) {
            // console.log(response);

            var uv = response.value

            todayDiv.append("UV Index: " + uv);
            $("#today").prepend(todayDiv);
        });

        // if (des === "Clouds" || "Cloudy") {
        //     var imgG = $("<img>").attr("src" , "assets/cloudsgif.gif");
        //     $("#imgGif").append(imgG);
        //     } else if (des === "Drizzle" || "Rain") {
        //         imgG = $("<img>").attr("src" , "assets/raingif.gif");
        //         $("#imgGif").append(imgG);
        //     } else if (des === "Thunderstorm") {
        //         imgG = $("<img>").attr("src" , "assets/thundgif.gif");
        //         $("#imgGif").append(imgG);
        //     } else if (des === "Clear") {
        //         imgG = $("<img>").attr("src" , "assets/cleargif.gif");
        //         $("#imgGif").append(imgG);
        //     } else if (des === "Sun" || "Sunny"){
        //         imgG = $("<img>").attr("src" , "assets/sungif.gif");
        //         $("#imgGif").append(imgG);
        //     } else if (des === "Mist"){
        //         imgG = $("<img>").attr("src" , "assets/mist.gif");
        //         $("#imgGif").append(imgG);
        //     } else if (des === "Snow"){
        //         imgG = $("<img>").attr("src" , "assets/snowgif.gif");
        //         $("#imgGif").append(imgG);
        //     }
        //     else (imgG.empty());

        $.ajax({
            url: queryURL1,
            method: "GET"
          }).then(function(response) {
            console.log(response);

            // //day 1
            var mo1 = response.list[0].dt_txt.split("-")[1];
            var dd1 = response.list[0].dt_txt.charAt(8);
            var dd11 = response.list[0].dt_txt.charAt(9); 
            var dd111 =(dd1+dd11);
            var yr1 = response.list[0].dt_txt.split("-")[0];
            var date1 = (mo1 + " / " + dd111 + " / " + yr1);
            var icon1 = response.list[0].weather[0].icon;
            var image = $("<img>").attr("src" , "http://openweathermap.org/img/wn/" + icon + ".png");
            var temp1 = response.list[0].main.temp;
            var hum1 = response.list[0].main.humidity;
            // console.log(date1);

            var day1F = $("<h7>").text(date1);
            var dayIcon = $("<p>").html(image);
            var day1A = $("<p>").text(" Temp: " + temp1 + ", Humidity: " + hum1);

            var fiveDiv1 = $("<div class = fiveWeather>");
            fiveDiv1.append(day1F, dayIcon, day1A);

            // //day 2
            var mo2 = response.list[10].dt_txt.split("-")[1];
            var dd2 = response.list[10].dt_txt.charAt(8);
            var dd22 = response.list[10].dt_txt.charAt(9); 
            var dd222 =(dd2+dd22);
            var yr2 = response.list[10].dt_txt.split("-")[0];
            var date2 = (mo2 + " / " + dd222 + " / " + yr2);
            var icon2 = response.list[10].weather[0].icon;
            var image2 = $("<img>").attr("src" , "http://openweathermap.org/img/wn/" + icon + ".png");
            var temp2 = response.list[10].main.temp;
            var hum2 = response.list[10].main.humidity;
            // console.log(date1);

            var day2F = $("<h7>").text(date2);
            var day2Icon = $("<p>").html(image2);
            var day2A = $("<p>").text(" Temp: " + temp2 + ", Humidity: " + hum2);

            var fiveDiv2 = $("<div class = fiveWeather>");
            fiveDiv2.append(day2F, day2Icon, day2A);

            // //day 3
            var mo3 = response.list[20].dt_txt.split("-")[1];
            var dd3 = response.list[20].dt_txt.charAt(8);
            var dd33 = response.list[20].dt_txt.charAt(9); 
            var dd333 =(dd3+dd33);
            var yr3 = response.list[20].dt_txt.split("-")[0];
            var date3 = (mo3 + " / " + dd333 + " / " + yr3);
            var icon3 = response.list[20].weather[0].icon;
            var image3 = $("<img>").attr("src" , "http://openweathermap.org/img/wn/" + icon + ".png");
            var temp3 = response.list[20].main.temp;
            var hum3 = response.list[20].main.humidity;
            // console.log(date1);

            var day3F = $("<h7>").text(date3);
            var day3Icon = $("<p>").html(image3);
            var day3A = $("<p>").text(" Temp: " + temp3 + ", Humidity: " + hum3);

            var fiveDiv3 = $("<div class = fiveWeather>");
            fiveDiv3.append(day3F, day3Icon, day3A);

            //day 4
            var mo4 = response.list[30].dt_txt.split("-")[1];
            var dd4 = response.list[30].dt_txt.charAt(8);
            var dd44 = response.list[30].dt_txt.charAt(9); 
            var dd444 =(dd4+dd44);
            var yr4 = response.list[30].dt_txt.split("-")[0];
            var date4 = (mo4 + " / " + dd444 + " / " + yr4);
            var icon4 = response.list[30].weather[0].icon;
            var image4 = $("<img>").attr("src" , "http://openweathermap.org/img/wn/" + icon + ".png");
            var temp4 = response.list[30].main.temp;
            var hum4 = response.list[30].main.humidity;
            // console.log(date1);

            var day4F = $("<h7>").text(date4);
            var day4Icon = $("<p>").html(image4);
            var day4A = $("<p>").text(" Temp: " + temp4 + ", Humidity: " + hum4);

            var fiveDiv4 = $("<div class = fiveWeather>");
            fiveDiv4.append(day4F, day4Icon, day4A);

            //day 5
            var mo5 = response.list[31].dt_txt.split("-")[1];
            var dd5 = response.list[31].dt_txt.charAt(8);
            var dd55 = response.list[31].dt_txt.charAt(9); 
            var dd555 =(dd5+dd55);
            var yr5 = response.list[31].dt_txt.split("-")[0];
            var date5 = (mo5 + " / " + dd555 + " / " + yr5);
            var icon5 = response.list[31].weather[0].icon;
            var image5 = $("<img>").attr("src" , "http://openweathermap.org/img/wn/" + icon + ".png");
            var temp5 = response.list[31].main.temp;
            var hum5 = response.list[31].main.humidity;
            // console.log(date1);

            var day5F = $("<h7>").text(date5);
            var day5Icon = $("<p>").html(image5);
            var day5A = $("<p>").text(" Temp: " + temp5 + ", Humidity: " + hum5);

            var fiveDiv5 = $("<div class = fiveWeather>");
            fiveDiv5.append(day5F, day5Icon, day5A);


            $("#forcast").prepend(fiveDiv1, fiveDiv2, fiveDiv3, fiveDiv4, fiveDiv5);        

        });
        
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
        $(".list-cities").prepend(ul);
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
$("#tdoay").empty();
addButtons();


})