// Target divs for Weather Output
let todayDiv = $("#today");
let forecastDiv = $("#forecast");

// Initialize variable for input value
let cityName = "";
// Initialize variable for Buttons of City History Inputs
let cityButton = "";

// Function to create Buttons with cities history search
function renderHistoryButton() {
    // create buttons with city value
    cityButton = $("<button>", {
        class: "btn btn-secondary history-btn",
        "data-name": cityName
    }).text(cityName);

    // append the button to history div
    $("#history").append(cityButton);
}

function displayWeather() {
    let apiKey = "99c746c0900a3f6f8b4898438d454a38";
    // queryURL API by city name
    let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    // console.log(queryUrl); // TEST

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
        let iconUrl = "https://openweathermap.org/img/w/" + iconcode + ".png";
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

        // Div for the 5 days Cards
        let forecastFiveCards = $("<div>", { class: "forecast-cards" }).css("display", "flex");

        // Div Forecast Container Flex
        let wrapForecast = $("<div>", { class: "wrap-forecast" });
        // Title for forecast Cards, Append to Div
        wrapForecast.prepend($("<h2>").text("5-Day Forecast"));
        // Append Forecast Cards
        wrapForecast.append(forecastFiveCards);
        // Append Cards Div to Forecast Div
        forecastDiv.append(wrapForecast)


        // Loop through forecast list array and return only list with time 12pm
        let listForecast = response.list;
        for (let i = 1; i < listForecast.length; i++) {
            // Target 9am time array list to use for forecast
            let forecastDateTime = listForecast[i].dt_txt.substring(10);
            // If time is 9am
            if (forecastDateTime.includes("09:00:00")) {
                // console.log(forecastDateTime); // TEST
                // console.log(listForecast[i]); // TEST

                // Div for each Card
                let forecastCard = $("<div>", { class: "card" }).css({
                    "background-color": "cadetblue",
                    "color": "white",
                    "padding": "10px",
                    "margin": "5px"
                });

                // Content for each Card
                // Add date to card
                forecastCard.append($("<h4>")
                    .text(moment.unix(listForecast[i].dt).format("DD, MM, YYYY")));

                // Weather Icon
                let forecastIconcode = listForecast[i].weather[0].icon;
                // Icon URL
                let forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIconcode + ".png";
                // Create div with img element for icon
                let iconImg = $("<div>", { class: "icon-img" }).append($("<img>", { src: forecastIconUrl }))
                // Append icon Img to Card
                forecastCard.append(iconImg);

                // print card forecast temperature 
                let forecastTempToC = listForecast[i].main.temp - 273.15;
                forecastCard.append($("<p>").text("Temp: " + forecastTempToC.toFixed(2) + " C"));
                // print forecast wind
                forecastCard.append($("<p>").text("Wind: " + listForecast[i].wind.speed + " KPH"));
                // print forecast humidity
                forecastCard.append($("<p>").text("Humidity: " + listForecast[i].main.humidity + "%"));

                // Append Card to Cards Div
                forecastFiveCards.append(forecastCard);
            }
        }
    })

}

// add click event to search button
// get input value and create button style with input value
$("#search-button").on("click", function (event) {

    // prevent page from reloading
    event.preventDefault();

    // clear weather dashboard every time a new search is made
    todayDiv.empty();
    forecastDiv.empty();

    // style ON for today and forecast DIVs
    todayDiv.css("border", "1px solid black");

    // save value of city input to variable
    cityName = $("#search-input").val();
    // console.log(cityName); // TEST


    renderHistoryButton();
    displayWeather();

})

// Add click event on the document object 
// hen a button with .history-button class is present
// To show the button city weather info
$(document).on("click", ".history-btn", function () {

    // Set cityName to clicked Button attribute "data-name"
    cityName = $(this).attr("data-name");

    // clear weather dashboard every time a new search is made
    todayDiv.empty();
    forecastDiv.empty();

    displayWeather();
});

// SAVE SEARCHES TO LOCAL STORAGE

// FIX MOBILE MEDIA LAYOUT