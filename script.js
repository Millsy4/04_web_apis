var questionArea = document.querySelector("#questionArea");
var info = document.querySelector("#info");
var startButton = document.querySelector("#startButton");
var testing = document.querySelector("#testing");

var answersHolderOne = ["adsfaf", "asdfare", "adsfaf", "adsfafa"];
var answersHolderTwo = ["123424", "42341", "3241834", "432781"];

startButton.addEventListener("click", function(event) {
    renderQuestionOne();
})

function renderQuestionOne() {
    questionArea.textContent = "Commonly used data types do NOT include:"
    info.remove();
    startButton.setAttribute("style", "visibility: hidden;")
    
    var ol = document.createElement("ol");
    testing.appendChild(ol);
    ol.setAttribute("id", "testAgain");

    // Render a new li for each todo
    for (var i = 0; i < answersHolderOne.length; i++) {
      var answers = answersHolderOne[i];

      var li = document.createElement("li");
      li.textContent = answers;
      li.setAttribute("data-index", i);
      li.setAttribute("style", "text-align: left;")
  
      //var button = document.createElement("button");
      //button.textContent = "Submit";
  
      testAgain.appendChild(li);
    }

    testing.addEventListener("click", function(event) {
      var element = event.target;
        if (element.matches("li") === true) {
          var index = element.getAttribute("data-index");
          console.log(index);
          if (index == 0) {
            var correct = document.createElement("p");
            correct.textContent = "Correct!";
            testing.appendChild(correct);
            renderQuestionTwo();
          } else {
            var incorrect = document.createElement("p");
            incorrect.textContent = "Incorrect!";
            testing.appendChild(incorrect);
            renderQuestionTwo();
          }
        }
      })
}

function renderQuestionTwo() {
    questionArea.textContent = "The condition in an if/else statement is enclosed within ______."
    //info.remove();
    testAgain.remove();
    var ol = document.createElement("ol");
    testing.appendChild(ol);

    // Render a new li for each todo
    for (var i = 0; i < answersHolderTwo.length; i++) {
      var answers = answersHolderTwo[i];

      var li = document.createElement("li");
      li.textContent = answers;
      li.setAttribute("data-index", i);
      li.setAttribute("style", "text-align: left;");

      ol.appendChild(li);
    }

    testing.addEventListener("click", function(event) {
      var element = event.target;
        if (element.matches("li") === true) {
          var index = element.getAttribute("data-index");
          console.log(index);
          if (index == 0) {
            var correct = document.createElement("p");
            correct.textContent = "Correct!";
            testing.appendChild(correct);
          } else {
            var incorrect = document.createElement("p");
            incorrect.textContent = "Incorrect!";
            testing.appendChild(incorrect);
          }
        }
      })
}

  testing.addEventListener("click", function(event) {
      var element = event.target;

      if (element.matches("button") === true) {
          var index = element.parentElement.getAttribute("data-index");

      }
  })