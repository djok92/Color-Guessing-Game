  var numOfSquares = 6;
  var colors = [];
  var correctColor;
  var squares = document.querySelectorAll(".square");
  var colorDisplay = document.getElementById("colorDisplay");
  var messageDisplay = document.getElementById("messageDisplay");
  var h1 = document.querySelector("h1");
  var resetButton = document.getElementById("resetButton");
  var modeButtons = document.querySelectorAll(".mode");

  init();

  function init() {
    setupModeButtons();
    setupSquares();
    reset();
  }


  function setupModeButtons() {
    //mode buttons event listeners
    for (var i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function() {
        //remove class selected from buttons to be sure
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        //add class selected on button that is clicked
        this.classList.add("selected");
        if (this.textContent === "Easy") {
          numOfSquares = 3;
        } else {
          numOfSquares = 6;
        }
        reset();
      });
    }
  }

  function setupSquares() {
    //square listeners
    for (var i = 0; i < squares.length; i++) {
      //add click event listeneres for each square
      squares[i].addEventListener("click", function() {
        // grab color of clicked square
        var clickedColor = this.style.background;
        //compare color to correctColor
        if (clickedColor === correctColor) {
          messageDisplay.textContent = "Correct!";
          resetButton.textContent = "Play Again?"
          changeColors(correctColor);
          h1.style.background = correctColor;
        } else {
          this.style.background = "#232323";
          messageDisplay.textContent = "Try Again!"
        }
      });
    }
  }

  function reset() {
    //generate all new Colors
    colors = generateRandomColors(numOfSquares);
    //pick a new random color from array
    correctColor = pickColor();
    //display  color that is random picked for guessing
    colorDisplay.textContent = correctColor;
    // reset from play again? to new Colors
    resetButton.textContent = "New Colors";
    //reset messageDisplay to empty string
    messageDisplay.textContent = "";
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
      if (colors[i]) {
        squares[i].style.display = "block";
        squares[i].style.background = colors[i];
      } else {
        squares[i].style.display = "none";
      }
    }
    h1.style.background = "steelblue"
  }

  resetButton.addEventListener("click", function() {
    reset();
  });

  function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
      //change each color to match correctColor
      squares[i].style.background = color;
    }
  }

  function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  function randomColor() {
    // pick a "red" from 0 - 255
    var red = Math.floor(Math.random() * 256);
    // pick a "green" from 0 - 255
    var green = Math.floor(Math.random() * 256);
    // pick a "blue" from 0 - 255
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
  }

  function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
      //get random color and push into arr
      arr.push(randomColor());
    }
    //return that array
    return arr;
  }
