$(document).ready(function () {

    // array to store cities
    var cities = [];

    //capture city name
    function dispayCityWeather() {



        //would like to clear the screen before showing new information

        // need explanation on this
        var city = $(this).attr("data-name");
        // console.log(city);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=697b47836ddecca53fd9822ab4c82a6c"

        var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=697b47836ddecca53fd9822ab4c82a6c"

        var currentDate = new Date();
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
        var year = currentDate.getFullYear();
        var fullDate = month + "/" + day + "/" + year;
        $("#date").text(fullDate);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var todayDiv = $("<div class = todayWeather>");
            var cityName = response.name;
            var one = $("<h5>").text("Weather for " + cityName + ":");
            // console.log(response);

            //adding icon
            var icon = response.weather[0].icon;
            var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
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

            var queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=697b47836ddecca53fd9822ab4c82a6c";
            $.ajax({
                url: queryURLuv,
                method: "GET"
            }).then(function (response) {
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
            }).then(function (response) {
                console.log(response);

                var identifyDate = new Date();

                identifyDate.setDate(identifyDate.getDate() + 1);


                for (let index = 0; index < response.list.length; index++) {
                    // console.log(response.list[index].dt)
                    var forecastDate = new Date(response.list[index].dt * 1000)
                    console.log(identifyDate + "  " + forecastDate);
                    //take todays date and one, for tomorrow, add two for the next, etc
                    //for loop to go through array and find the correct dates
                    //add the correct array to the html
                    if (forecastDate.getDate() === identifyDate.getDate()) {
                        console.log("thank God");

                        var icon1 = response.list[index].weather[0].icon;
                        var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
                        var temp1 = response.list[index].main.temp;
                        var hum1 = response.list[index].main.humidity;

                        var day1F = $("<h7>").text(identifyDate.toDateString());
                        var dayIcon = $("<p>").html(image);
                        var day1A = $("<p>").text(" Temp: " + temp1 + ", Humidity: " + hum1);

                        var fiveDiv1 = $("<div class = fiveWeather>");
                        fiveDiv1.append(day1F, dayIcon, day1A);

                        identifyDate.setDate(identifyDate.getDate() + 1);
                        console.log(" next day");
                        console.log(index)

                        $("#forecast").append(fiveDiv1);


                    }


                }

                // //day 1


                // console.log(date1);



                

               
                

                

                
                


                

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
            a.attr("data-name", cities[i]);
            // adding the name of the city by user input
            a.text(cities[i]);
            var ul = $("<ul>").html(a);
            $(".list-cities").prepend(ul);
        }
    };

    //when add button is clicked
    $("#add").on("click", function (event) {
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