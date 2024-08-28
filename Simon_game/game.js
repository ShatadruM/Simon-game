var gamepattern=[];
var userClickedPattern=[];
var buttonColours = ["red","blue","green","yellow"]

$(".btn").click(function(){
    var userChosenColour;
    userChosenColour = $(this).attr("id"); //"this" is not a jquery elem so had to be wrapped in $()
    animatePress(userChosenColour);
    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1) //runs for each click
   
})
var level=0;
var gameBool = false;
$(document).keydown(function(){
    if(!gameBool){
        
        $("#level-title").text("level "+level);
        nextSequence();
        gameBool = true;
    }
})


function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed")
    },100)
}
function nextSequence(){
    userClickedPattern=[] //so that user gets to give the whole sequence,
    level++;
    $("h1").text("level "+level)
    
    var randomChosenColour;
    
    var randomNumber = Math.floor(Math.random()*4);
    
    randomChosenColour=buttonColours[randomNumber];
    
    gamepattern.push(randomChosenColour);
    console.log("gamepattern "+gamepattern)

    checkAnswer(randomChosenColour);
    
    //animating the buttons  
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    //sound
    playSound(randomChosenColour);
    
    
}

function checkAnswer(currentLevel){
     
    if(userClickedPattern[currentLevel]==gamepattern[currentLevel]){
        console.log("pass")
        //checking if the user have completed, p.s : disaster without the below code
        if (userClickedPattern.length === gamepattern.length) {  //checks the arrays one click at a time to gamepattern
            // Call nextSequence after a short delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("fail");
        $("body").addClass("game-over")
        playSound("wrong");
        setInterval(function(){
            $("body").removeClass("game-over")
        },1000)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        $("body").keydown(function(){
            startOver();
        })
    }
}


function playSound(name){
     //playing the sound
     var audio = new Audio("sounds/"+name+".mp3")
     audio.play(); 
}

function startOver(){
    gamepattern = [];
    gameBool = true;
}


