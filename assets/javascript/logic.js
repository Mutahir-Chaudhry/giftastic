$(document).ready(function(){
    // created an array for all of our initial buttons. Going with the animal theme. 
    var animalButtons = ["Lion", "Cat", "Dog", "Zebra", "Monkey", "Horse"];
    // began the function to actually pull and populate the displaygif with the requested api call.
    function displayGIFs(){
        $("#displaygifs").empty();

        var userInput = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oI7YWn3aO9m0rxfhuemjd1sPvKxsUk2D&q=" + input + "&limit=" + limit + "&offset=0&rating=G&lang=en"

        
    }
})