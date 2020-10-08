var questionArea = document.querySelector("#questionArea");
var info = document.querySelector("#info");
var startButton = document.querySelector("#startButton");
var mainInfo = document.querySelector("#mainInfo");

var secondsDisplay = document.querySelector("#seconds");

var questionsCount = 0;

var answersHolderOne = ["adsfaf", "asdfare", "adsfaf", "adsfafa"];
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
});

function renderQuestion() {
  info.remove();
  startButton.remove();
  questionArea.textContent = aqHolder[questionsCount].question;
  renderAnswers(aqHolder[questionsCount].answers);
}

function renderAnswers(array) {
  var ol = document.createElement("ol");
  mainInfo.appendChild(ol);
  ol.setAttribute("id", "answerList");

  for (var i = 0; i < array.length; i++) {
    var answers = array[i];

    var li = document.createElement("li");
    li.textContent = answers;
    li.setAttribute("data-index", i);
    li.setAttribute("style", "text-align: left;")

    answerList.appendChild(li);
  }
}

mainInfo.addEventListener("click", function(event) {
  var element = event.target;
    if (element.matches("li") === true) {
      var index = element.getAttribute("data-index");
      console.log(index);
      if (index == aqHolder[questionsCount].correctAnswer) {
        var correct = document.createElement("p");
        correct.textContent = "Correct!";
        mainInfo.appendChild(correct);
        var nextButton = document.createElement("button");
        
        mainInfo.appendChild(nextButton);
        nextButton.setAttribute("class", "btn btn-info ml-auto mr-auto");
        nextButton.textContent = "Next Question";
        nextButton.addEventListener("click", function(event) {
          correct.remove();
          questionsCount++;
          answerList.remove();
          nextButton.remove();
          renderQuestion();
          
        });
        mainInfo.removeEventListener();

        
      } else {
        var incorrect = document.createElement("p");
        incorrect.textContent = "Incorrect!";
        mainInfo.appendChild(incorrect);
        var nextButton = document.createElement("button");
        
        mainInfo.appendChild(nextButton);
        nextButton.setAttribute("class", "btn btn-info ml-auto mr-auto");
        nextButton.textContent = "Next Question";
        nextButton.addEventListener("click", function(event){ 
          incorrect.remove();
          questionsCount++;
          answerList.remove();
          nextButton.remove();
          renderQuestion();
        });
      }
    }
  });

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

function renderQuestionOne() {
    questionArea.textContent = "Commonly used data types do NOT include:"
    info.remove();
    startButton.setAttribute("style", "visibility: hidden;")
    
    var ol = document.createElement("ol");
    mainInfo.appendChild(ol);
    ol.setAttribute("id", "answerListOne");

    // Render a new li for each todo
    for (var i = 0; i < answersHolderOne.length; i++) {
      var answers = answersHolderOne[i];

      var li = document.createElement("li");
      li.textContent = answers;
      li.setAttribute("data-index", i);
      li.setAttribute("style", "text-align: left;")
  
      //var button = document.createElement("button");
      //button.textContent = "Submit";
  
      answerListOne.appendChild(li);
    }

    mainInfo.addEventListener("click", function(event) {
      var element = event.target;
        if (element.matches("li") === true) {
          var index = element.getAttribute("data-index");
          console.log(index);
          if (index == 0) {
            var correct = document.createElement("p");
            correct.setAttribute("id", "correctOrIncorrectOne");
            correct.textContent = "Correct!";
            mainInfo.appendChild(correct);
            renderQuestionTwo();
          } else {
            var incorrect = document.createElement("p");
            incorrect.setAttribute("id", "correctOrIncorrectOne");
            incorrect.textContent = "Incorrect!";
            mainInfo.appendChild(incorrect);
            renderQuestionTwo();
          }
        }
      })
}

function renderQuestionTwo() {
    questionArea.textContent = "The condition in an if/else statement is enclosed within ______."
    correctOrIncorrectOne.remove();
    answerListOne.remove();
    var ol = document.createElement("ol");
    mainInfo.appendChild(ol);
    ol.setAttribute("id", "answerListTwo");

    // Render a new li for each todo
    for (var i = 0; i < answersHolderTwo.length; i++) {
      var answers = answersHolderTwo[i];

      var li = document.createElement("li");
      li.textContent = answers;
      li.setAttribute("data-index", i);
      li.setAttribute("style", "text-align: left;");

      answerListTwo.appendChild(li);
    }

    mainInfo.addEventListener("click", function(event) {
      var element = event.target;
        if (element.matches("li") === true) {
          var index = element.getAttribute("data-index");
          console.log(index);
          if (index == 0) {
            var correct = document.createElement("p");
            correct.setAttribute("id", "correctOrIncorrectTwo");
            correct.textContent = "Correct!";
            mainInfo.appendChild(correct);
            renderQuestionThree();
          } else {
            var incorrect = document.createElement("p");
            incorrect.setAttribute("id", "correctOrIncorrectTwo");
            incorrect.textContent = "Incorrect!";
            mainInfo.appendChild(incorrect);
            renderQuestionThree();
          }
        }
      })
}

function renderQuestionThree() {
  questionArea.textContent = "Question Number Three"
  correctOrIncorrectTwo.remove();
  answerListTwo.remove();
  var ol = document.createElement("ol");
  mainInfo.appendChild(ol);
  ol.setAttribute("id", "answerListThree");

  // Render a new li for each todo
  for (var i = 0; i < answersHolderThree.length; i++) {
    var answers = answersHolderThree[i];

    var li = document.createElement("li");
    li.textContent = answers;
    li.setAttribute("data-index", i);
    li.setAttribute("style", "text-align: left;");

    answerListThree.appendChild(li);
  }

  mainInfo.addEventListener("click", function(event) {
    var element = event.target;
      if (element.matches("li") === true) {
        var index = element.getAttribute("data-index");
        console.log(index);
        if (index == 0) {
          var correct = document.createElement("p");
          correct.setAttribute("id", "correctOrIncorrectThree");
          correct.textContent = "Correct!";
          mainInfo.appendChild(correct);
          renderQuestionFour();
        } else {
          var incorrect = document.createElement("p");
          incorrect.setAttribute("id", "correctOrIncorrectThree");
          incorrect.textContent = "Incorrect!";
          mainInfo.appendChild(incorrect);
          renderQuestionFour();
        }
      }
    })
}

function renderQuestionFour() {
  questionArea.textContent = "Question Number Four"
  correctOrIncorrectThree.remove();
  answerListThree.remove();
  var ol = document.createElement("ol");
  mainInfo.appendChild(ol);
  ol.setAttribute("id", "answerListFour");

  // Render a new li for each todo
  for (var i = 0; i < answersHolderFour.length; i++) {
    var answers = answersHolderFour[i];

    var li = document.createElement("li");
    li.textContent = answers;
    li.setAttribute("data-index", i);
    li.setAttribute("style", "text-align: left;");

    answerListFour.appendChild(li);
  }

  mainInfo.addEventListener("click", function(event) {
    var element = event.target;
      if (element.matches("li") === true) {
        var index = element.getAttribute("data-index");
        console.log(index);
        if (index == 0) {
          var correct = document.createElement("p");
          correct.setAttribute("id", "correctOrIncorrectFour");
          correct.textContent = "Correct!";
          mainInfo.appendChild(correct);
          renderQuestionFive();
        } else {
          var incorrect = document.createElement("p");
          incorrect.setAttribute("id", "correctOrIncorrectFour");
          incorrect.textContent = "Incorrect!";
          mainInfo.appendChild(incorrect);
          renderQuestionFive();
        }
      }
    })
}

function renderQuestionFive() {
  questionArea.textContent = "Question Number Five"
  correctOrIncorrectFour.remove();
  answerListFour.remove();
  var ol = document.createElement("ol");
  mainInfo.appendChild(ol);
  ol.setAttribute("id", "answerListFive");

  // Render a new li for each todo
  for (var i = 0; i < answersHolderFive.length; i++) {
    var answers = answersHolderFive[i];

    var li = document.createElement("li");
    li.textContent = answers;
    li.setAttribute("data-index", i);
    li.setAttribute("style", "text-align: left;");

    answerListFive.appendChild(li);
  }

  mainInfo.addEventListener("click", function(event) {
    var element = event.target;
      if (element.matches("li") === true) {
        var index = element.getAttribute("data-index");
        console.log(index);
        if (index == 0) {
          var correct = document.createElement("p");
          correct.setAttribute("id", "correctOrIncorrectFive");
          correct.textContent = "Correct!";
          mainInfo.appendChild(correct);
        } else {
          var incorrect = document.createElement("p");
          incorrect.setAttribute("id", "correctOrIncorrectFive");
          incorrect.textContent = "Incorrect!";
          mainInfo.appendChild(incorrect);
        }
      }
    })
}


  // mainInfo.addEventListener("click", function(event) {
  //     var element = event.target;

  //     if (element.matches("button") === true) {
  //         var index = element.parentElement.getAttribute("data-index");

  //     }
  // })