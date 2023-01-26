// when input a city i get button with the city name(saved to a div)
// and output all the data for current weather and 5 days forecast

// Return a output with the relative data weather

let apiKey = "99c746c0900a3f6f8b4898438d454a38";


// add click event to search button
// get input value and create button style with input value
$("#search-button").on("click", function(event){
    // prevent page from reloading
    event.preventDefault();

    // save value of city input to variable
    let cityName = $("#search-input").val();
    console.log(cityName);

    // create buttons with city value
    let cityButton = $("<button>")
        .text(cityName)
        .addClass("btn btn-secondary history-btn");

    // append the button to history div
    $("#history").append(cityButton);
})
