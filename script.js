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


var goBackButton = document.createElement("button");
var clearButton = document.createElement("button");
var nextButton = document.createElement("button");

var correct = document.createElement("p");
var incorrect = document.createElement("p");

var highscores = [];
var initialArray = [];
var initialTexts = "";
var initialInput = "";

var buttonPressCount = 0;
var mCount = 0;
var questionsCount = 0;

var answersHolderOne = ["adsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafdsfafred", "asdfare", "adsfaf", "adsfafa"];
var answersHolderTwo = ["123424", "42341", "3241834", "432781"];
var answersHolderThree = ["adsfaf", "42342", "adsfaf", "32414"];
var answersHolderFour = ["12334", "asdfadfa", "124324", "asdfadfa"];
var answersHolderFive = ["This", "Is", "A", "Test"];

var aqHolder = [
  {
    question: 'Question 1',
    answers: answersHolderOne,
    correctAnswer: 2
  },
  {
    question: 'Question 2',
    answers: answersHolderTwo,
    correctAnswer: 1
  },
  {
    question: 'Question 3',
    answers: answersHolderThree,
    correctAnswer: 0
  },
  {
    question: 'Question 4',
    answers: answersHolderFour,
    correctAnswer: 3
  },
  {
    question: 'Question 5',
    answers: answersHolderFive,
    correctAnswer: 1
  }
]


startButton.addEventListener("click", function(event) {  
  renderQuestion();
  startTimer();
});

viewHighscores.addEventListener("click", function(event) {  
  info.remove();
  questionArea.textContent = "Highscores";
  if (buttonPressCount == 1){
    nextButton.remove();
    // incorrect.remove();
    // correct.remove();
    buttonPressCount = 0;
  }
  answersList.remove();
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

function setTime() {
  clearInterval(interval);
  secondsDisplay.textContent = totalSeconds;
}

function getFormattedSeconds() {
  secondsLeft = (totalSeconds - secondsElapsed);

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  secondsDisplay.textContent = getFormattedSeconds();
  if (timerStatus == true) {
      questionArea.textContent = "Highscores";
      if (buttonPressCount == 1){
        nextButton.remove();
        // incorrect.remove();
        // correct.remove();
        buttonPressCount = 0;
      }
      // answersList.remove();
      info.remove();
      stopTimer();

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
      // stopTimer();
  }
}

function startTimer() {
  setTime();

  // We only want to start the timer if totalSeconds is > 0
  if (totalSeconds > 0) {
    /* The "interval" variable here using "setInterval()" begins the recurring increment of the
       secondsElapsed variable which is used to check if the time is up */
      interval = setInterval(function() {
        secondsElapsed++;
        if (test == 1) {
          secondsElapsed = (secondsElapsed + 10);
          test--;
        }
        // So renderTime() is called here once every second.
        renderTime();
      }, 1000);

  } else if (totalSeconds === 0) {
    alert("Game over!");
  }
}

var timerStatus = false;
var timer = "";
var time = 70;


function startTimer() {
  
}

  if (totalSeconds <= 0) {
    timerStatus = false;
    clearInterval(interval);
    alert("Game over!");
    console.log(timerStatus);
  }
}

function stopTimer() {
  totalSeconds = 0;
  secondsElapsed = 0;
  setTime();
  renderTime();
}

function renderQuestion() {
  info.remove();
  startButton.remove();
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
  buttonPressCount++;
  console.log(buttonPressCount);
  var element = event.target;
    if (element.matches("li") === true) {
      var index = element.getAttribute("data-index");
      if (index == aqHolder[questionsCount].correctAnswer) {
        answerList.remove();
        correct = document.createElement("p");
        correct.textContent = "Correct!";
        mainInfo.appendChild(correct);
        nextButton = document.createElement("button");
        

        mainInfo.appendChild(nextButton);
        nextButton.setAttribute("class", "btn btn-info ml-auto mr-auto");
        nextButton.textContent = "Next Question";
        nextButton.addEventListener("click", function(event) {
          buttonPressCount--;
          buttonPressCount--;
          console.log(buttonPressCount);
          correct.remove();
          questionsCount++;
          nextButton.remove();
          console.log(questionsCount);
          if (questionsCount == 5) {
            storeHighscores();
            stopTimer();
          } else {
          renderQuestion();
          }
        });
        

        
      } else {
        answerList.remove();
        incorrect = document.createElement("p");
        incorrect.textContent = "Incorrect!";
        mainInfo.appendChild(incorrect);
        var nextButton = document.createElement("button");
        
        mainInfo.appendChild(nextButton);
        nextButton.setAttribute("class", "btn btn-info ml-auto mr-auto");
        nextButton.textContent = "Next Question";
        nextButton.addEventListener("click", function(event){ 
          buttonPressCount--;
          buttonPressCount--;
          console.log(buttonPressCount);
          test++;
          incorrect.remove();
          questionsCount++;
          nextButton.remove();
          if (questionsCount == 5) {
            storeHighscores();
            stopTimer();
          } else {
          renderQuestion();
          }
        });
      }
    }
  });

function getSecondsLeft() {
  // localStorage.setItem("highscores", JSON.stringify(highscores));
  var score = secondsLeft;
  return score;
}

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
  var holdHighscore = getSecondsLeft();
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

  // if (deletion == 1) {
  //   highscoreLabel.remove();
  //   highscoreInput.remove();
  //   deletion--;
  // }

  highscoreForm.addEventListener("submit", function(event) {
    event.preventDefault();

    initialInput = document.querySelector("#initialText");
    initialTexts = initialInput.value;
    initialArray.push(initialTexts);
    console.log(initialTexts);
    console.log(initialArray);
    console.log(initialInput);
    localStorage.setItem("initialArray", JSON.stringify(initialArray));
    // storeInitials();
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
      secondsLeft = 0;
      totalSeconds = 70;
      secondsElapsed = 0;
      interval;
      test = 0;
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