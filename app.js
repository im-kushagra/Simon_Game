var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keydown(function(event){

    if(!started)
    {
        $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    }
})

$(".btn").click(function()
{
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
playSound(userChosenColor);
animatePress(userChosenColor);

});

function startOver()
{
    gamePattern=[];
    started=false;
    level=0;

}

function checkAnswer(currentLevel)
{
if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
{
    console.log("Success");

if(userClickedPattern.length==gamePattern.length)
{
    setTimeout(function () {
        nextSequence();
      }, 1000);

}
}
else{

    var audio =new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function()
    {
        $("body").removeClass("game-over")  
    },200);

    $("#level-title").text("Game Over,Press Any To Restart");
    startOver();
}
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
   
}


function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}


function playSound(name)
{
    
    var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();

}