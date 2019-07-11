$(document).ready(function(){
    // created an array for all of our initial buttons. Going with the animal theme. 
    var buttonsShown = ["Lion", "Cat", "Dog", "Zebra", "Monkey", "Horse"];
    // began the function to actually pull and populate the displaygif with the requested api call.
    function displayGIFs (){
        //Need to first empty the gif display so we dont have it putting new gifs on previous gifs.
        $("#displaygifs").empty();
        //Created all necessary initial varaibles.
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oI7YWn3aO9m0rxfhuemjd1sPvKxsUk2D&q=" + input + "&limit=" + limit + "&offset=0&rating=G&lang=en"
        //AJAX used to utilize API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(animals){
            //Creating a for loop to create a new div everytime there is a call to the API, for up to the limit of gifs, which is defaulted to 10.
            for(var i = 0; i < limit; i++){
                //Creating a variable that will create new div for every iteration of the loop.
                var newDiv = $("<div>");
                //Need each div to have its own class
                newDiv.addClass("newDiv");
                //Created a variable that will create a new img within the div created. We will then use this new varaible to pull the different attributes from the API.
                var gif = $("<img>");
        
              



            }
        })
    }
})