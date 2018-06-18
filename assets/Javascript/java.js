/*
Create an array of Gif options.
Create an option to add new Gifs to display.
Push retrieved Gifs to display.
User form for requesting new gifs.
formula to animate Gif.
*/

//initial array of topics
var topics = ["Pythons", "Gorillas", "Frogs", "Alligators", "Tigers", "Lions", "Zebra", "Jaguar"];


function renderButtons(){

    //Empty Gif buttons and load new buttons from array.
    $("#gifButtons").empty()
    
    //loop through the array of topics
    for (var i = 0; i < topics.length; i++){
        
        //create a new button for each topic that is added to the array

        var gifTopic = $('<button type="button" class="btn-lg">');

        //add a class to each topic button that is generated

            gifTopic.addClass('topic');

            
        // adding a data attribute
            gifTopic.attr('data-name', topics[i]);


        //add initial button text

            gifTopic.text(topics[i]);
        

        //add the buttons to the buttons div in the HTML file
        $("#gifButtons").append(gifTopic);
        console.log(gifTopic);
        
    }


};


$("#addUserInput").on("click", function(event){

    //prevent page refresh after loading submitting user GIF
    event.preventDefault();
    
    //pulling data from user input box on html
    var newInput = $("#userInput").val().trim();

        console.log("--New User Input-- "+ newInput);

        //if function to prevent entry of blank topics

        if(newInput == ""){
            return false;
        }else{

        
            //take user input and push it to topics array
                 topics.push(newInput);

            //call to render button for new submission
                renderButtons();

            //empty user field after pressing submit
                $("#userInput").val("");
        };

    
    
});


function generateGifs(){
    
    var topicChoice = $(this).attr("data-name");
   
    
    
    //AJAX URL

    var queryURL = "https://api.giphy.com/v1/gifs/search?&q=wild+" + topicChoice + "&api_key=8gX4PRwrqoprgKTunDMhjwIIJ9Fb46Un&limit=10&offset=0&rating=PG&lang=en";
    

    //Performing an AJAX request with queryURL

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    

    //data return from Ajax
    .then(function(response){
        
        //validate the Query worked correctly
        console.log(queryURL);

        //store results from the AJAX GET request.    
       var results = response.data;

        //console for AJAX query results
        console.log(results);


        for (var i = 0; i < results.length; i++){

            //create a new div to hold the GIFs
            var gifDiv = $('<div>');


            //store rating data
            //var rating = response.data.rating;

            //element to have rating displayed
            //var gifRating = $("<p id='rating'>").text("Rating: " + rating.results[i].toUpperCase());


            // adding gif
            var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr('data-still', results[i].images.fixed_height_still.url);
                gifImage.attr('data-state', 'still');
                gifImage.addClass('gifImage');
                gifImage.attr('data-animate', results[i].images.fixed_height.url);

                
            

               


            //add rating info to Gif images
            //gifDiv.append(gifRating);
            gifDiv.append(gifImage);

            
            //adding new GIFs to the HTML
            $('.gifView').append(gifDiv);

    
        }
  

    })
    $(".displayBox").show();
};


$(document).on("click", '.gifImage', function(){
    
    //variable for current gif image state
    var state = $(this).attr('data-state');

    //if function to convert from still image to animated gif checking first if image state is still

    if( state === 'still'){

        //if image state is still, the data state attribute will update to animate - the GIF will loop

        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    
        //else function to return animated GIF to still image.
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }



})

$(document).ready(function(){

    renderButtons();
    console.log("Page has loaded!");
    $(".displayBox").hide();
})

$(document).on("click", ".topic", generateGifs);

//$(document).on("click", ".gifImage", animateGif);









