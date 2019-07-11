$(document).ready(function(){
    console.log("hello")
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
        }).done(function(response){
            //Creating a for loop to create a new div everytime there is a call to the API, for up to the limit of gifs, which is defaulted to 10.
            for(var i = 0; i < limit; i++){
                //Creating a variable that will create new div for every iteration of the loop.
                var newDiv = $("<div>");
                //Need each div to have its own class
                newDiv.addClass("newDiv");
                //Created a variable that will create a new img within the div created. We will then use this new varaible to pull the different attributes from the API.
                var gif = $("<img>");
                //Now we will reference each part of the new image called and assign different parts of the response data to each part of the image.
                gif.attr("src", response.data[i].images.original_still.url);
                gif.attr("data-state", "still");
                gif.attr("data-still", response.data[i].images.orignal_still.url);
                gif.attr("class", "gif");
                gif.attr("data-animate", response.data[i].images.orginal.url);
                //After assigning the respective data from the response from the API to the gif to be displayed, we now add this gif to the newDiv variable we created.
                newDiv.append(gif)
                //Now we need to create a variable to store the rating retrieved from the gif data. 
                var ratings = response.data[i].rating;
                //After creating the variable ratings to store the rating, we add this to the newDiv variable we just created, but we want it to be dispayed with a label, so we have to assign it to another varaible that will be appended to our newDiv.
                var  ratingsDisplay = $("<p>").text("The Rating for this gif is: " + ratings)
                newDiv.append(ratingsDisplay)
                //Now that everything has been added to the new div created everytime we pull a gif from our API, we now add all this to our displaygifs div already within our html.
                $("#displaygifs").append(newDiv);
            }
        });
    }
    //Now that we've created the function to include our AJAX call to our API to retrieve the gifs, we will make a function to populate our buttons.
    function createButtons(){
        //Need to first empty the button div so we can run our for loop to poplate as many buttons as there are strings in our buttonsShown array.
        $("#buttons").empty();
        //We create a for loop to run for the iteration of our buttonsShown array.
        for (var i = 0; i < buttonsShown.length; i++){
            //Everytime our loop runs, a new button will be created and stored in our newButton vairable. 
            var newButton = $("<button>")
            //For every new button created, we want to assign specific attributes, inlcuding a class, id, and name, that will be pulled from the name provided. 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            //We will then add this new button to the our buttons div. 
            $("#buttons").append(newButton); 
        }
    }
    //Now that we've created the function to pull the gif from the API, and the function to create new buttons, we will now work on the function to start and stop our gifs when clicked. 
    function clickChange () {
        //We first have to create a varaible to store the original state of the image when recieved. We previously set this data state to still in our first displayGIFs function.
        var gifState = $(this).attr("data-state");
        //We now create a new variable to change the state of the gif to animated
        var gifAnimate = $(this).attr("data-animate");
        //Just like the variable was created to change the state of the gif to animated, we now make one the change the state to still
        var gifStill = $(this).attr("data-still");
        //Now we create an if else statement that will animate if it is still, or make still if it is animated. Either one of which will take place when the function is called, which is done on the click of a gif. 
        if (state === "still"){
            //First, if the image is still, we will target the image source to get the animated version, and then change the data state to animated. 
            $(this).attr("src", gifAnimate);
            $(this).attr("data-state", "animate");
        }else if(state === "animate"){
            //Now if the image is animated, we will target the image source to get the still version, and then change the data state to animated. 
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

})

