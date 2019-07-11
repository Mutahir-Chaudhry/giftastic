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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ input +"&api_key=oI7YWn3aO9m0rxfhuemjd1sPvKxsUk2D&limit=" + limit
        //AJAX used to utilize API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
            var results = response.data
            //Creating a for loop to create a new div everytime there is a call to the API, for up to the limit of gifs, which is defaulted to 10.
            for(var a = 0; a < input.length; a++){
                //Creating a variable that will create new div for every iteration of the loop.
                var newDiv = $("<div>");
                //Need each div to have its own class
                newDiv.addClass("newDiv");
                //Created a variable that will create a new img within the div created. We will then use this new varaible to pull the different attributes from the API.
                var gif = $("<img>");
                //Now we will reference each part of the new image called and assign different parts of the response data to each part of the image.
                gif.attr("src", results[a].images.fixed_height_still.url);
                gif.attr("data-still", results[a].images.fixed_height_still.url);
                gif.attr("data-animate", results[a].images.fixed_height.url);
                gif.attr("data-state", "still");
                gif.addClass("gif");
                //After assigning the respective data from the response from the API to the gif to be displayed, we now add this gif to the newDiv variable we created.
                newDiv.append(gif)
                //Now we need to create a variable to store the rating retrieved from the gif data. 
                var ratings = results[a].rating;
                console.log(ratings)
                //After creating the variable ratings to store the rating, we add this to the newDiv variable we just created, but we want it to be dispayed with a label, so we have to assign it to another varaible that will be appended to our newDiv.
                var  ratingsDisplay = $("<p>").text("The Rating for this gif is: " + ratings)
                newDiv.append(ratingsDisplay)
                //Now that everything has been added to the new div created everytime we pull a gif from our API, we now add all this to our displaygifs div already within our html.
                $("#displaygifs").prepend(newDiv);
            }
        });
    }
    //Now that we've created the function to include our AJAX call to our API to retrieve the gifs, we will make a function to populate our buttons.
    function createButtons(){
        //Need to first empty the button div so we can run our for loop to poplate as many buttons as there are strings in our buttonsShown array.
        $("#buttons").empty();
        //We create a for loop to run for the iteration of our buttonsShown array.
        for (var b = 0; b < buttonsShown.length; b++){
            //Everytime our loop runs, a new button will be created and stored in our newButton vairable. 
            var newButton = $("<button>")
            //For every new button created, we want to assign specific attributes, inlcuding a class, id, and name, that will be pulled from the name provided. 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", buttonsShown[b]); 
            newButton.text(buttonsShown[b]); 
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
        if (gifState === "still"){
            //First, if the image is still, we will target the image source to get the animated version, and then change the data state to animated. 
            $(this).attr("src", gifAnimate);
            $(this).attr("data-state", "animate");
        }else if(gifState === "animate"){
            //Now if the image is animated, we will target the image source to get the still version, and then change the data state to animated. 
            $(this).attr("src", gifStill);
            $(this).attr("data-state", "still");
        }
    }
    //Now that we have the function to pull gifs from the api, function to create new buttons, and function to change the state of our gif, we will lastly create the on click function for our submit button. 
    $("#submitbutton").on("click", function(){
        //We start by creating a variable to store the animanl name given by user in the form. After storing the value, we reset the form and push the collected value to our buttonsShown array.
        var input = $("#animalsearch").val().trim();
        FormData.reset();
        buttonsShown.push(input);
        //Once the button has been clicked, we want to run the createButtons function to add any additional buttons to be displayed. 
        createButtons();
        return false;
    })
    //Once all our functions are complete, we want to make sure the buttons in our original array display when the document loads. So we once again, call our createButtons funciton outside all other funcitons.
    createButtons();
    //Lastly, we add our on click function for buttons and gifs. 
    $(document).on("click", "#input", displayGIFs);
    $(document).on("click", ".gif", clickChange);


})

