var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");
      if(gamePattern.length === userClickedPattern.length){
          setTimeout(function(){
            nextSequence();
          },1000);
      }
  }
  else{
    console.log("wrong");
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
      $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var sounds = new Audio("./sounds/" + name + ".mp3");
  sounds.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
  }, 100);
}
