	var questions = [{
		question: "What is the population of Brazil?",
		choices: ["145 million", "199 million", "182 million", "205 million"],
		correctAnswer: 1 
	}, {
		question: "What is 27*14?",
		choices: ["485", "634", "408", "528"],
		correctAnswer: 2
	}, {
		question: "What is the busiest train station in the world?",
		choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
		correctAnswer: 1
	}, {
		question: "What is the longest river?",
		choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
		correctAnswer: 0
	}, {
		question: "What is the busiest tube station in the London?",
		choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
		correctAnswer: 0
	}];
	

	var currentQuestion = 0;
	var correctAnswers = 0;
	var quizOver = false;

	

	$(document).ready( function() {

		//display the first question
		displayCurrentQuestion();
		$(this).find(".quizMessage").hide();

		//on clicking next, display the next question
		$(this).find(".nextButton").on("click", function(){
			if(!quizOver) {
				
				$("input[type='radio']").focus(function(){
					$(document).find(".quizMessage").hide();
				});	
				

				value = $("input[type='radio']:checked").val();
				if(value == undefined ){
					$(document).find(".quizMessage").text("please select an answer");
					$(document).find(".quizMessage").show();
				} else {
			   	    // TODO : remove any message -> not sure if this is efficient to call this each time.
			   	    //$(document).find(".quizMessage").hide();
			   	    
			   	    if(value == questions[currentQuestion].correctAnswer){
			   	    	correctAnswers++;
			   	    	console.log(correctAnswers);
			   	    }
			   	    console.log("current question: " + questions[currentQuestion].question);
			   	    currentQuestion++; // since we have already displayed the first question on DOM ready
			   	    //console.log(currentQuestion);
			   	    if(currentQuestion < questions.length){ // currentQuestion = 5, question length = 5 {
			   	    	displayCurrentQuestion(); //question 2, 3 , 4, 5  
			   	    }else{
			   	    	displayScore();
			   	    	//$(document).find(".nextButton").toggle();
			   	    	//$(document).find(".playAgainButton").toggle();
			   	    	// Change the text in the next button to ask if user wants to play again
			   	    	$(document).find(".nextButton").text("play again?");
			   	    	quizOver = true;
			   	    }
			   	}

			   }else{
				// quiz is over and clicked the next button (which now displays 'Play again?')
				quizOver = false;
				$(document).find(".nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
			}

		});

	});

	//this display the current question and the choices
	function displayCurrentQuestion() {

		var question = questions[currentQuestion].question;
		var questionClass = $(document).find(".quizContainer > .question");
		var choiceList = $(document).find(".quizContainer > .choiceList");
		var numChoices = questions[currentQuestion].choices.length; //4

		//set the question class text to the current question
		$(questionClass).text(question);

		// remove all current <li> elements if any
		$(choiceList).find("li").remove();

		var choice;
		for(i = 0; i < numChoices; i++){
			choice = questions[currentQuestion].choices[i];
			$('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
		}
		$(document).find(".questionDisplaying").text("Question No " + (currentQuestion + 1) + "out of: " + questions.length);
	}	

	function resetQuiz() {
		currentQuestion = 0;
		currentAnswers = 0;
		hideScore();
	}
	function displayScore() {
		$(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + "out of: " + questions.length);
		$(document).find(".result").show();                                
	}

	function hideScore() {
		$(document).find(".result").hide();
	}