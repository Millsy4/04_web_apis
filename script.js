var questionArea = document.querySelector("#questionArea");
var info = document.querySelector("#info");
var startButton = document.querySelector("#startButton");
var mainInfo = document.querySelector("#mainInfo");
var secondsDisplay = document.querySelector("#seconds");
var viewHighscores = document.querySelector("#highscoreView");


var secondsLeft = 0;
var totalSeconds = 40;
var secondsElapsed = 0;
var interval;
var test = 0;
var highscoreList;
var deletion = 0;
var timerStatus = false;

var goBackButton = document.createElement("button");
var clearButton = document.createElement("button");
var nextButton = document.createElement("button");

var correctOrIncorrect = document.createElement("p");

var highscores = [];
var initialArray = [];
var initialTexts = "";
var initialInput = "";


var buttonPressCount = 0;
var mCount = 0;
var questionsCount = 0;

var answersHolderOne = ["strings", "booleans", "alerts", "numbers"];
var answersHolderTwo = ["quotes", "parenthesis", "curly brackets", "square brackets"];
var answersHolderThree = ["numbers and strings", "other arrays", "booleans", "all of the above"];
var answersHolderFour = ["commas", "curly brackets", "quotes", "square brackets"];
var answersHolderFive = ["javascript", "terminal/bash", "for loops", "console.log"];

var aqHolder = [
  {
    question: 'Commonly used data types DO NOT include ______.',
    answers: answersHolderOne,
    correctAnswer: 2
  },
  {
    question: 'The condition in an if/else statement is enclosed within ______.',
    answers: answersHolderTwo,
    correctAnswer: 1
  },
  {
    question: 'Arrays in Javascript can be used to store _____.',
    answers: answersHolderThree,
    correctAnswer: 3
  },
  {
    question: 'String values must be enclosed within ______ when being assigned to variables.',
    answers: answersHolderFour,
    correctAnswer: 2
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is ______.',
    answers: answersHolderFive,
    correctAnswer: 3
  }
]

var timerStatus = false;
var timer = "";
var time = 70;

function startTimer() {
  
  if (!timerStatus) {
    interval = setInterval(count, 1000);
    timerStatus = true;
  }
}

function count() {
  if (deletion === 0) {
    time--;
  }
  if (deletion == 1) {
    deletion--;
    time = (time - 10);
  }
  secondsDisplay.textContent = time;
  if (time === 0) {
    
    clearInterval(interval);
    timerStatus = false;
    if (questionsCount != 5) {
      answerList.remove();
      renderHighscores();
      storeHighscores();
    }
  }
  if (questionsCount == 5) {
    clearInterval(interval);
    timerStatus = false;

  }
}


// function stopTimer() {
//   totalSeconds = 0;
//   secondsElapsed = 0;
// }

startButton.addEventListener("click", function(event) {  
  renderQuestion();
  startTimer();
});



viewHighscores.addEventListener("click", function(event) {  
  info.remove();
  questionArea.textContent = "Highscores";
  answerList.remove();
  var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

  if (storedHighscores !== null) {
    highscores = storedHighscores;
  }

  var storedInitials = JSON.parse(localStorage.getItem("initialArray"));

  if (storedInitials !== null) {
    initialArray = storedInitials;
  }

  for (var k = 0; k < highscores.length; k++) {
    mCount++;
    var hs = highscores[k];

    var init = initialArray[k];

    var ol = document.createElement("ol");
    ol.textContent = (k + 1) + ") " + init + " - " + hs;
    ol.setAttribute("id", "highscoreList");

    questionArea.appendChild(ol);
  }
});

// function setTime() {
//   clearInterval(interval);
//   secondsDisplay.textContent = totalSeconds;
// }

// function getFormattedSeconds() {
//   secondsLeft = (totalSeconds - secondsElapsed);

//   var formattedSeconds;

//   if (secondsLeft < 10) {
//     formattedSeconds = "0" + secondsLeft;
//   } else {
//     formattedSeconds = secondsLeft;
//   }

//   return formattedSeconds;
// }

// function renderTime() {
//   // When renderTime is called it sets the textContent for the timer html...
//   secondsDisplay.textContent = getFormattedSeconds();
//   if (totalSeconds <= 0) {
//       questionArea.textContent = "Highscores";
//       if (buttonPressCount == 1){
//         nextButton.remove();
//         // incorrect.remove();
//         // correct.remove();
//         buttonPressCount = 0;
//       }
//       // answersList.remove();
//       info.remove();
//       stopTimer();

//       var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

//       if (storedHighscores !== null) {
//         highscores = storedHighscores;
//       }
    
//       var storedInitials = JSON.parse(localStorage.getItem("initialArray"));
    
//       if (storedInitials !== null) {
//         initialArray = storedInitials;
//       }
      
//       for (var k = 0; k < highscores.length; k++) {
//         mCount++;
//         var hs = highscores[k];
    
//         var init = initialArray[k];
    
//         var ol = document.createElement("ol");
//         ol.textContent = (k + 1) + ") " + init + " - " + hs;
//         ol.setAttribute("id", "highscoreList");
    
//         questionArea.appendChild(ol);
//       }
//       // stopTimer();
//   }
// }

// function startTimer() {
//   setTime();

//   // We only want to start the timer if totalSeconds is > 0
//   if (totalSeconds > 0) {
//     /* The "interval" variable here using "setInterval()" begins the recurring increment of the
//        secondsElapsed variable which is used to check if the time is up */
//       interval = setInterval(function() {
//         secondsElapsed++;
//         if (test == 1) {
//           secondsElapsed = (secondsElapsed + 10);
//           test--;
//         }
//         // So renderTime() is called here once every second.
//         renderTime();
//       }, 1000);

//   } else if (totalSeconds === 0) {
//     alert("Game over!");
//   }
// }

// function startTimer() {
//   setTime();

//   if (totalSeconds > 0) {
//     timerStatus = true;
//     interval = setInterval(function() {
//       console.log(timerStatus);
//       secondsElapsed++;
//       console.log(secondsElapsed);
//       if (test == 1) {
//         secondsElapsed = (secondsElapsed + 10);
//         test--;
//       }

//       renderTime();
//     }, 1000);
//   }

//   if (totalSeconds === 0) {
//     timerStatus = false;
//     clearInterval(interval);
//     alert("Game over!");
//     console.log(timerStatus);
//   }
// }



function renderQuestion() {
  info.remove();
  startButton.remove();
  correctOrIncorrect.remove();
  questionArea.textContent = aqHolder[questionsCount].question;
  questionArea.setAttribute("style", "text-align: left");
  renderAnswers(aqHolder[questionsCount].answers);
}

function renderAnswers(array) {
  var ol = document.createElement("ol");
  mainInfo.appendChild(ol);
  ol.setAttribute("id", "answerList");
  answerList.setAttribute("style", "color: white;");

  for (var i = 0; i < array.length; i++) {
    var answers = array[i];

    var li = document.createElement("li");
    li.textContent = answers;
    li.setAttribute("data-index", i);
    li.setAttribute("style", "text-align: left; margin-bottom: 10px; background-color: teal; font-size: 24px; color: white;")

    ol.appendChild(li);
  }
}

mainInfo.addEventListener("click", function(event) {
  var element = event.target;
    if (element.matches("li") === true) {
      var index = element.getAttribute("data-index");
      if (index == aqHolder[questionsCount].correctAnswer) {
        answerList.remove();
        correctOrIncorrect.textContent = "Correct!";
        mainInfo.appendChild(correctOrIncorrect);
        questionsCount++;
        if (questionsCount == 5) {
          correctOrIncorrect.textContent = "Correct!";
          mainInfo.appendChild(correctOrIncorrect);
          setTimeout(storeHighscores, 1000);
        } else {
          setTimeout(renderQuestion, 1000);
        }
        

        
      } else {
        answerList.remove();
        correctOrIncorrect.textContent = "Incorrect!";
        mainInfo.appendChild(correctOrIncorrect);
        questionsCount++;
        deletion++;
          if (questionsCount == 5) {
            correctOrIncorrect.textContent = "Incorrect!";
            mainInfo.appendChild(correctOrIncorrect);
            setTimeout(storeHighscores, 1000);
          } else {
            setTimeout(renderQuestion, 1000);
          }
      }
    }
  });

function renderHighscores() {
  for (var k = 0; k < highscores.length; k++) {
    mCount++;
    var hs = highscores[k];

    var init = initialArray[k];

    var ol = document.createElement("ol");
    ol.textContent = (k + 1) + ") " + init + " - " + hs;
    ol.setAttribute("id", "highscoreList");
    ol.setAttribute("style", "margin-top: 25px;")

    questionArea.appendChild(ol);
  }
}

function deleteHighscores() {
  for (var m = 0; m < mCount; m++) {
    var highscoreListRemoval = document.querySelector("#highscoreList");
    highscoreListRemoval.remove();
  }
}

function storeHighscores() {
  correctOrIncorrect.remove();
  var holdHighscore = time;
  questionArea.textContent = "Highscores";
  highscores.push(holdHighscore);
  holdHighscore.value = "";
  localStorage.setItem("highscores", JSON.stringify(highscores));

  var highscoreForm = document.createElement("form");
  highscoreForm.setAttribute("id", "highscoreForm");
  highscoreForm.setAttribute("method", "POST");
  mainInfo.appendChild(highscoreForm);

  var highscoreLabel = document.createElement("label");
  highscoreForm.appendChild(highscoreLabel);
  highscoreLabel.setAttribute("for", "initialText");
  highscoreLabel.textContent = "Enter your initials";

  var highscoreInput = document.createElement("input");
  highscoreForm.appendChild(highscoreInput);
  highscoreInput.setAttribute("type", "text");
  highscoreInput.setAttribute("name", "initialText");
  highscoreInput.setAttribute("id", "initialText");

  highscoreForm.addEventListener("submit", function(event) {
    event.preventDefault();

    initialInput = document.querySelector("#initialText");
    initialTexts = initialInput.value;
    initialArray.push(initialTexts);
    localStorage.setItem("initialArray", JSON.stringify(initialArray));
    renderHighscores();
    highscoreLabel.remove();
    highscoreInput.remove();


    goBackButton = document.createElement("button");
    highscoreForm.appendChild(goBackButton);
    goBackButton.setAttribute("class", "btn btn-info ml-auto mr-auto mt-3");
    goBackButton.textContent = "Start Again";


    clearButton = document.createElement("button");
    highscoreForm.appendChild(clearButton);
    clearButton.setAttribute("class", "btn btn-info ml-auto mr-auto mt-3");
    clearButton.textContent = "Clear Scores";

    goBackButton.addEventListener("click", function(event) {
      time = 70;
      questionsCount = 0;
      renderQuestion();
      startTimer();
      goBackButton.remove();
      clearButton.remove();
      
    })
    clearButton.addEventListener("click", function(event) {
      event.preventDefault();
      localStorage.clear();   
      clearButton.remove();
      initialArray = [];
      localStorage.setItem("initialArray", JSON.stringify(initialArray));
      highscores = [];
      localStorage.setItem("highscores", JSON.stringify(highscores));
      deleteHighscores(); 
      answerList.remove();
    })
  })
}

// clearButton.addEventListener("click", function(event) {
//   event.preventDefault();
//   localStorage.clear();
//   highscoreList.remove();
      
// })

// goBackButton.addEventListener("click", function(event) {
//   secondsLeft = 0;
//   totalSeconds = 70;
//   secondsElapsed = 0;
//   interval;
//   test = 0;
//   questionsCount = 0;
//   renderQuestion();
//   startTimer();
//   goBackButton.remove();
// })

// function storeInitials() {
//   localStorage.setItem("initialArray", JSON.stringify(initialArray));
// }


  // goBackButton = document.createElement("button");
  // highscoreForm.appendChild(goBackButton);
  // goBackButton.setAttribute("class", "btn btn-info ml-auto mr-auto");
  // goBackButton.textContent = "Start Again";

  // goBackButton.addEventListener("click", function(event) {
  //   secondsLeft = 0;
  //   totalSeconds = 70;
  //   secondsElapsed = 0;
  //   interval;
  //   test = 0;
  //   questionsCount = 0;
  //   renderQuestion();
  //   startTimer();
  // })
  
  





  // var submitButton = document.createElement("button"); 

  // submitButton.addEventListener("click", function(event){

  // })

  // getSecondsLeft();
  // console.log(score)
  // localStorage.getItem(score);
  // stopTimer();
  







// highscoreForm.addEventListener("submit", function(event) {
//   var initialInput = document.querySelector("#initialText");

//   initialText = initialInput.value.trim();

//   initialArray.push(initialText);
//   initialText.value = "";

//   storeInitials();
// })



// function renderAnswers() {
//   for (var i = 0; i < answersHolderOne.length; i++) {
//     var answers = answersHolderOne[i];

//     var li = document.createElement("li");
//     li.textContent = answers;
//     li.setAttribute("data-index", i);
//     li.setAttribute("style", "text-align: left;")

//     //var button = document.createElement("button");
//     //button.textContent = "Submit";

//     answerListOne.appendChild(li);
//   }
// }

// function renderQuestionOne() {
//     questionArea.textContent = "Commonly used data types do NOT include:"
//     info.remove();
//     startButton.setAttribute("style", "visibility: hidden;")
    
//     var ol = document.createElement("ol");
//     mainInfo.appendChild(ol);
//     ol.setAttribute("id", "answerListOne");

//     // Render a new li for each todo
//     for (var i = 0; i < answersHolderOne.length; i++) {
//       var answers = answersHolderOne[i];

//       var li = document.createElement("li");
//       li.textContent = answers;
//       li.setAttribute("data-index", i);
//       li.setAttribute("style", "text-align: left;")
  
//       //var button = document.createElement("button");
//       //button.textContent = "Submit";
  
//       answerListOne.appendChild(li);
//     }

//     mainInfo.addEventListener("click", function(event) {
//       var element = event.target;
//         if (element.matches("li") === true) {
//           var index = element.getAttribute("data-index");
//           console.log(index);
//           if (index == 0) {
//             var correct = document.createElement("p");
//             correct.setAttribute("id", "correctOrIncorrectOne");
//             correct.textContent = "Correct!";
//             mainInfo.appendChild(correct);
//             renderQuestionTwo();
//           } else {
//             var incorrect = document.createElement("p");
//             incorrect.setAttribute("id", "correctOrIncorrectOne");
//             incorrect.textContent = "Incorrect!";
//             mainInfo.appendChild(incorrect);
//             renderQuestionTwo();
//           }
//         }
//       })
// }

// function renderQuestionTwo() {
//     questionArea.textContent = "The condition in an if/else statement is enclosed within ______."
//     correctOrIncorrectOne.remove();
//     answerListOne.remove();
//     var ol = document.createElement("ol");
//     mainInfo.appendChild(ol);
//     ol.setAttribute("id", "answerListTwo");

//     // Render a new li for each todo
//     for (var i = 0; i < answersHolderTwo.length; i++) {
//       var answers = answersHolderTwo[i];

//       var li = document.createElement("li");
//       li.textContent = answers;
//       li.setAttribute("data-index", i);
//       li.setAttribute("style", "text-align: left;");

//       answerListTwo.appendChild(li);
//     }

//     mainInfo.addEventListener("click", function(event) {
//       var element = event.target;
//         if (element.matches("li") === true) {
//           var index = element.getAttribute("data-index");
//           console.log(index);
//           if (index == 0) {
//             var correct = document.createElement("p");
//             correct.setAttribute("id", "correctOrIncorrectTwo");
//             correct.textContent = "Correct!";
//             mainInfo.appendChild(correct);
//             renderQuestionThree();
//           } else {
//             var incorrect = document.createElement("p");
//             incorrect.setAttribute("id", "correctOrIncorrectTwo");
//             incorrect.textContent = "Incorrect!";
//             mainInfo.appendChild(incorrect);
//             renderQuestionThree();
//           }
//         }
//       })
// }

// function renderQuestionThree() {
//   questionArea.textContent = "Question Number Three"
//   correctOrIncorrectTwo.remove();
//   answerListTwo.remove();
//   var ol = document.createElement("ol");
//   mainInfo.appendChild(ol);
//   ol.setAttribute("id", "answerListThree");

//   // Render a new li for each todo
//   for (var i = 0; i < answersHolderThree.length; i++) {
//     var answers = answersHolderThree[i];

//     var li = document.createElement("li");
//     li.textContent = answers;
//     li.setAttribute("data-index", i);
//     li.setAttribute("style", "text-align: left;");

//     answerListThree.appendChild(li);
//   }

//   mainInfo.addEventListener("click", function(event) {
//     var element = event.target;
//       if (element.matches("li") === true) {
//         var index = element.getAttribute("data-index");
//         console.log(index);
//         if (index == 0) {
//           var correct = document.createElement("p");
//           correct.setAttribute("id", "correctOrIncorrectThree");
//           correct.textContent = "Correct!";
//           mainInfo.appendChild(correct);
//           renderQuestionFour();
//         } else {
//           var incorrect = document.createElement("p");
//           incorrect.setAttribute("id", "correctOrIncorrectThree");
//           incorrect.textContent = "Incorrect!";
//           mainInfo.appendChild(incorrect);
//           renderQuestionFour();
//         }
//       }
//     })
// }

// function renderQuestionFour() {
//   questionArea.textContent = "Question Number Four"
//   correctOrIncorrectThree.remove();
//   answerListThree.remove();
//   var ol = document.createElement("ol");
//   mainInfo.appendChild(ol);
//   ol.setAttribute("id", "answerListFour");

//   // Render a new li for each todo
//   for (var i = 0; i < answersHolderFour.length; i++) {
//     var answers = answersHolderFour[i];

//     var li = document.createElement("li");
//     li.textContent = answers;
//     li.setAttribute("data-index", i);
//     li.setAttribute("style", "text-align: left;");

//     answerListFour.appendChild(li);
//   }

//   mainInfo.addEventListener("click", function(event) {
//     var element = event.target;
//       if (element.matches("li") === true) {
//         var index = element.getAttribute("data-index");
//         console.log(index);
//         if (index == 0) {
//           var correct = document.createElement("p");
//           correct.setAttribute("id", "correctOrIncorrectFour");
//           correct.textContent = "Correct!";
//           mainInfo.appendChild(correct);
//           renderQuestionFive();
//         } else {
//           var incorrect = document.createElement("p");
//           incorrect.setAttribute("id", "correctOrIncorrectFour");
//           incorrect.textContent = "Incorrect!";
//           mainInfo.appendChild(incorrect);
//           renderQuestionFive();
//         }
//       }
//     })
// }

// function renderQuestionFive() {
//   questionArea.textContent = "Question Number Five"
//   correctOrIncorrectFour.remove();
//   answerListFour.remove();
//   var ol = document.createElement("ol");
//   mainInfo.appendChild(ol);
//   ol.setAttribute("id", "answerListFive");

//   // Render a new li for each todo
//   for (var i = 0; i < answersHolderFive.length; i++) {
//     var answers = answersHolderFive[i];

//     var li = document.createElement("li");
//     li.textContent = answers;
//     li.setAttribute("data-index", i);
//     li.setAttribute("style", "text-align: left;");

//     answerListFive.appendChild(li);
//   }

//   mainInfo.addEventListener("click", function(event) {
//     var element = event.target;
//       if (element.matches("li") === true) {
//         var index = element.getAttribute("data-index");
//         console.log(index);
//         if (index == 0) {
//           var correct = document.createElement("p");
//           correct.setAttribute("id", "correctOrIncorrectFive");
//           correct.textContent = "Correct!";
//           mainInfo.appendChild(correct);
//         } else {
//           var incorrect = document.createElement("p");
//           incorrect.setAttribute("id", "correctOrIncorrectFive");
//           incorrect.textContent = "Incorrect!";
//           mainInfo.appendChild(incorrect);
//         }
//       }
//     })
// }


//   // mainInfo.addEventListener("click", function(event) {
//   //     var element = event.target;

//   //     if (element.matches("button") === true) {
//   //         var index = element.parentElement.getAttribute("data-index");

//   //     }
//   // })