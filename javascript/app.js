$(document).ready(function() {
    // Handler for .ready() called.

    var selection;
    var percentScore;

    var triviaQandA = [{
            "question": "Creating awareness or questioning the status quo is the strategy for which stage of the customer journey?",
            "answers": ["A - Inspire", "B - Guide", "C - Captivate", "D - Persuade"],
            "correct": "A - Inspire",
            "response": "We want to INSPIRE our potential buyers to create awareness or question their status quo."
        },
        {
            "question": "How many people are typically involved in the average purchase decision today?",
            "answers": ["A - 3.4", "B - 4.5", "C - 5.4", "D - 12"],
            "correct": "C - 5.4",
            "response": "5.4 people are now typically involved in the average purchase decision today."
        },
        {

            "question": "What percent of the buyer's journey is typically completed before a salesperson gets involved?",
            "answers": ["A - 40%", "B - 50%", "C - 60%", "D - more than 60%"],
            "correct": "D - more than 60%",
            "response": "More than 60% - as much as 80% of the purchase journey is complete before a buyer will typically talk to a salesperson."
        },
        {
            "question": "When our prospects are exploring, what strategy should we take as sellers?",
            "answers": ["A - Inspire", "B - Guide", "C - Captivate", "D - Persuade"],
            "correct": "B - Guide",
            "response": "We want to GUIDE our potential buyers by positioning ourselves as a valuable resource."
        },
        {
            "question": "Which of these tools is NOT likely to be used to create awareness?",
            "answers": ["A - Videos", "B - Proposals", "C - Social Forums", "D - Email Blasts"],
            "correct": "B - Proposals",
            "response": "Proposals are not generally used to create awareness, but instead to persuade when the buyer is in the decision phase."
        }
        
            

    ];

    var questionIndex = 0;
    var correctAnswer = 0;
    var wrongAnswer = 0;
    var timeOutAnswer = 0;

    //Timer program
    var interValID;
    var timeLeft = 20
    var counter = 0;
    var timer = $("#timer");

    function timeIt() {
        
        timer.html("<h2>You have " + (timeLeft - counter) + " seconds left</h2>");
        if (counter == timeLeft) {
            timer.html("<h2>Your time is up!</h2>");
            clearInterval(interValID);
            $("#response").show();
            $("#response").html("You ran out of time. " + selection.response);
            timeOutAnswer++;
            
            //checkEnd();
        }
        counter++
    }


    $("#startGame").click(function() {
        timer.html("<h2>Starting timer...</h2>")
        getQuestion();
    });

    function showProgress() {
        var currentQuestionNumber = questionIndex + 1;
        var element = $("#progress");
        element.text("Question " + currentQuestionNumber + " of " + triviaQandA.length);

    }

    function getQuestion() {
        //var a = 0;

        $("#startTheGame").hide();
        $("#startGame").hide();
        $("#response").hide();
        $(".grid").show();
        interValID = setInterval(timeIt, 1000);
        selection = triviaQandA[questionIndex];
        $("#question").html(selection.question);
        console.log(question);

        for (var i = 0; i < selection.answers.length; i++) {
            btn = $("button#btn" + [i]).text(selection.answers[i]);


        }
        showProgress();
    }


    $("button").click(function() {
        var choice = $(this).text();



        checkAnswer(choice);

    });



    function checkAnswer(choice) {

        if (choice === selection.correct) {
            correctAnswer++
            $("#response").show();
            $("#response").html("Way to go!  You are correct! " + selection.response);

        } else {
            wrongAnswer++
            $("#response").show();
            $("#response").html("Oops, you are incorrect! " + selection.response);
        }

        
        
        clearInterval(interValID);

        checkEnd();


    }

    function showResults() {

         var percentScore = (correctAnswer/triviaQandA.length)*100
    

        $(".grid").hide();
        $("#resultsCorrect").show();
        $("#resultsCorrect").html("# of Correct Answers = " + correctAnswer) 
        $("#resultsIncorrect").show();
        $("#resultsIncorrect").html("# of Incorrect Answers = " + 
            wrongAnswer)
        $("#resultsTimedOut").show();
        $("#resultsTimedOut").html("# of Timed Out = " + timeOutAnswer );
        $("#resultsPercent").show();
        $("#resultsPercent").html("Your score is " + percentScore + "%")
      
if (percentScore > 70) {
    var wayToGo = $("<img/>");
    wayToGo.attr("src", "images/tenorWayToGo.gif")
    $("#scoreImg").show();
    $("#scoreImg").append(wayToGo);
} else {
   var tryHarder = $("<img/>");
    tryHarder.attr("src", "images/tenorTryHarder.gif")
    $("#scoreImg").show();
    $("#scoreImg").append(tryHarder);
}
        $("#resultsTwo").show();
    }

    function checkEnd() {
            questionIndex++;
            if (questionIndex === (triviaQandA.length)){
               
            setTimeout(showResults, 3000);
            } else  {
                counter=0;
                
                setTimeout(getQuestion, 3000);

            }
    }

});