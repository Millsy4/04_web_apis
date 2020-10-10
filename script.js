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