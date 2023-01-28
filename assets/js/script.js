// when input a city i get button with the city name(saved to a div)
// and output all the data for current weather and 5 days forecast

// Return a output with the relative data weather
let apiKey = "99c746c0900a3f6f8b4898438d454a38";

let todayDiv = $("#today");
let forecastDiv = $("#forecast");

// add click event to search button
// get input value and create button style with input value
$("#search-button").on("click", function (event) {
    // prevent page from reloading
    event.preventDefault();

    // style ON for today and forecast DIVs
    todayDiv.css("border", "1px solid black");


    // save value of city input to variable
    let cityName = $("#search-input").val();
    // remove all whitespaces from input
    // cityName.replace(/\s/g, '');
    // console.log(cityName); // TEST

    // create buttons with city value
    let cityButton = $("<button>")
        // add content with input value
        .text(cityName)
        // add classes for style
        .addClass("btn btn-secondary history-btn")
        // add data attribute
        .attr("data-name", cityName);

    // append the button to history div
    $("#history").append(cityButton);

    // queryURL API by city name
    let queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    // let queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=5&appid=" + apiKey;
    console.log(queryUrl); // TEST


    // retrieve data from API call
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        // console.log(response); // TEST

        // TODAY FORECAST
        // TOP DIV
        // Today List Array
        let todayList = response.list[0];
        // create div for today weather city and date at the TOP
        let topToday = $("<div>", { class: "top-today" })
        todayDiv.prepend(topToday);

        // Create H1 el with city name of request and save to var
        let todayCityName = $("<h1>").text(response.city.name);
        // Append current date using moment.js unix converter
        todayCityName.append(" (" + moment.unix(todayList.dt).format("DD, MM, YYYY") + ")");
        // Append city name to todayDiv
        topToday.append(todayCityName);

        // Append weather icon 
        // icon 
        let iconcode = todayList.weather[0].icon;
        // console.log(iconcode); // TEST
        // icon URL
        let iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        // Create div with img el for icon
        // and Add URL attribute to icon image
        let iconEl = $("<img>", { src: iconUrl });
        //Append div with icon image to today weather div
        topToday.append($("<div>", { class: "icon-img" }).append(iconEl))

        // BOTTOM DIV

        // create div for Temperature, Wind, Humidity 
        // At Bottom of Today Forecast
        let bottomToday = $("<div>", { class: "bottom-today" });
        todayDiv.append(bottomToday);

        // Temperature element
        let todayTempToC = todayList.main.temp - 273.15;
        bottomToday.append($("<p>", { class: "today-param" }).text("Temp: " + todayTempToC.toFixed(2) + " C"));

        // Wind element
        let todayWind = todayList.wind.speed;
        bottomToday.append($("<p>", { class: "today-param" }).text("Wind: " + todayWind + " KPH"));

        // Humidity element 
        let todayHumidity = todayList.main.humidity;
        bottomToday.append($("<p>", { class: "today-param" }).text("Humidity: " + todayHumidity + "%"));

        // 5 DAYS FORECAST

        // 2 DAY FORECAST [6] INDEX
        // 3 DAY FORECAST [14]
        // 4 DAY FORECAST [22]
        // 4 DAY FORECAST [30]

        // Div for the 5 days Cards
        let forecastFiveCards = $("<div>", { class: "forecast-cards" }).css("display", "flex");

        // Div Forecast Container Flex
        let flexContainerForecast = $("<div>", { class: "wrap-forecast" });
        // Title for forecast Cards, Append to Div
        flexContainerForecast.prepend($("<h2>").text("5-Day Forecast"));
        // Append Forecast Cards
        flexContainerForecast.append(forecastFiveCards);
        // Append Cards Div to Forecast Div
        forecastDiv.append(flexContainerForecast)


        // Loop through forecast list array and return only list with time 12pm
        let listForecast = response.list;
        for (let i = 0; i < listForecast.length; i++) {
            // Target 12pm time array list to use for forecast
            let forecastDateTime = listForecast[i].dt_txt.substring(10);
            // If time is 12pm
            if (forecastDateTime.includes("12:00:00")) {
                // console.log(forecastDateTime); // TEST
                console.log(listForecast[i]); // TEST

                // Div for each Card
                let forecastCard = $("<div>", { class: "card" }).css("background-color", "grey");
                
                // Content for each Card
                // Add date to card
                forecastCard.append($("<h4>")
                    .text(moment.unix(listForecast[i].dt).format("DD, MM, YYYY")));

                // weather Icon
                let forecastIconcode = listForecast[i].weather[0].icon;
                // Icon URL
                let forecastIconUrl = "http://openweathermap.org/img/w/" + forecastIconcode + ".png";

                // Create div with img element for icon
                let iconImg = $("<div>", {class: "icon-img"}).append($("<img>", {src: forecastIconUrl}))
                
                // Append icon Img to Card
                forecastCard.append(iconImg);

                // Append Card to Cards Div
                forecastFiveCards.append(forecastCard);
            }
        }


        // initialize var to save
        // list array with days forecast
        // Loop through array of forecast list
        // for (let i = 0; i < listForecast.length; i++) {
        // TODAY FORECAST

        // save dt proprety to convertit into date
        // let unixDateToday = listForecast[].dt;
        // console.log(unixDate); // TEST

        // convert dt property into date
        // let day = new Date(unixDate*1000);
        // console.log(day.toDateString());
        // get today date
        // get today weather icon
        // append to div together with H1 city name

        // Get today temperature
        // Get today wind
        // Get today humidity
        // }
    })


    // GEOCODING API // DON'T NEED FOR NOW
    // let queryUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
    // console.log(queryUrl);
    // // retrieve data from API call
    // $.ajax({
    //     url: queryUrl,
    //     method: "GET"
    // }).then(retrieveCoordinates)
})


// FUNCTION FOR GEOCODING API // DON'T NEED FOR NOW
// // function to retrieve coordinates from input city name
// function retrieveCoordinates(city){
//     console.log(city); // TEST
//     // loop through the response to get city object
//     for (let i = 0; i < city.length; i++) {
//         console.log(city[i]) // TEST
//         // latitude
//         let lat = city[i].lat;
//         console.log(lat);
//         // longitude
//         let lon = city[i].lon;
//         console.log(lon);
//     }
// }

// function to render weather forecast

// function local storage


