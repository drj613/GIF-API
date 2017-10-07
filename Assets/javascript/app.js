$(document).ready(function(){
	//Array for animals
	var animals=["Dog", "Cat", "Hamster", "Kangaroo"];


	//Function to create buttons
	function renderButtons() {

        // Deleting the buttons prior to adding new ones
        $("#gif-buttons").empty();
        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          // Adding classes
          a.addClass("btn");
          a.addClass("btn-info");
          a.addClass("gif-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);          
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the gif-buttons div
          $("#gif-buttons").append(a);
        }
      }
  		
      //Add gif button on click of add button or when pressing enter

	$("#gif-button-adder").on("click", function(event) {
		event.preventDefault();
		//Take input from textbox
		var toAdd=$("#animal-input").val().trim();
		$("#animal-input").empty();
		console.log(toAdd);
		//Add it to the array
		animals.push(toAdd);

		//And re-render buttons
		renderButtons();
		gifBtnClicked();
		imgClicked();
	});



     //Run display on click
     //Not running on click
     function gifBtnClicked(){
     	$(".gif-btn").on("click", function() {

	 		var gifType=$(this).attr("data-name");
			var queryURL="https://api.giphy.com/v1/gifs/search?q="+gifType+"&api_key=dc6zaTOxFJmzC&limit=10";
			//Empty body before populating
			$("#body").empty();

			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {
				console.log(response.data);
				for (var i = 0; i < 10; i++) {
					//Div to hold the gif
					var gifDiv = $("<div class='animal col-sm-12 col-md-6 col-lg-4'>");
					var rating = response.data[i].rating;
					var ratP = $("<p>").text("Rated "+rating);
					var stillURL = response.data[i].images.fixed_height_still.url;
					var animatedURL= response.data[i].images.fixed_height.url;
            		var gifImg = $("<img />", {
              			src: stillURL,
              			'data-still': stillURL,
              			'data-animate': animatedURL,
              			'data-state': "still",
              			class: "gif"
            		});

					gifDiv.append(ratP);
					gifDiv.append(gifImg);

					$("#body").append(gifDiv);
				}			

			});
	 });}

	 //Unpause and pause gifs on click
	 function imgClicked() {
		 $("#body").on("click", ".gif", function (){
	 	// DIDN'T WORK   ---   $(".gif").on("click", function(){ 
	 		var state = $(this).attr("data-state");

	 		if (state === "still") {
	 			$(this).attr("src", $(this).attr("data-animate"));
	 			$(this).attr("data-state", "animate");
	 		} else {
	 			$(this).attr("src", $(this).attr("data-still"));
	 			$(this).attr("data-state", "still");
	 		}
	 });}

	 //Display initial buttons
     renderButtons();
     gifBtnClicked();
     imgClicked();

});

