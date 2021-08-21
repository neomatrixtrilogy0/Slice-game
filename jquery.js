var playing = false;
var score;
var trialsLeft;
var step;
var action // used for set Interval 
var fruits = ['apple', 'watermelon', 'mango', 'pear', 'grapes', 'orange', 'cherries', 'banana', 'pineapple']
$(function() {
    //Click on start/reset button
    $('#startreset').click (function (){
        //if we are playing 
        if (playing == true) {
            location.reload();
        } else {
            // We are not playing
            playing = true; // game initiated
            score = 0;
            $('#scorevalue').html(score);
            
            //Show trials left
            $('#trialsLeft').show();
            trialsLeft = 3;
            addHearts();
            
            //hide game over box
            $('#gameover').hide();
            
            //Change button text to reset
            $('#startreset').html('Reset Game');
            
            //start sending fruits
            startAction()
           
        }
    });

$('#fruit1').mouseover(function() {
    score++;
    $('#scorevalue').html(score) //updating the score
    
//    document.getElementById('slicesound').play();
    $('#slicesound')[0].play(); //plays sound after moving mouse over fruit
    
    //stop fruit 
   stopAction();
    
    //hide fruit
//    $('#fruit1').hide('explode', 500); //slicing the fruit
    
    //send new fruit
    startAction();
});    

function addHearts() {
    $('#trialsLeft').empty();
    for(i=0; i<trialsLeft; i++) {
                $('#trialsLeft').append('<img src="images/hearts.png" class="life"> ');
            }
}

 //start sending fruits functions
function startAction() {
    $('#fruit1').show();
    //Choose a random Fruit
    chooseFruit();
    $('#fruit1').css({'left': Math.floor(Math.random() * 550), 'top' : -50}) //random position
    
    //generate a random step
    step = 1 + Math.floor(Math.random() * 5) //change step randomly
    
    //Move fruit down by one step every 10ms
    action = setInterval(function() {
        $('#fruit1').css('top', $('#fruit1').position().top + step);
        
        //check if the ruit is too low
        if($('#fruit1').position().top > $('#fruitsContainer').height()) {
            // check if we have trials left
            if (trialsLeft > 1) {
                 $('#fruit1').show();
                //Choose a random Fruit
                chooseFruit();
                $('#fruit1').css({'left': Math.floor(Math.random() * 550), 'top' : -50}) //random position

                //generate a random step
                step = 1 + Math.floor(Math.random() * 5) //change step randomly
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts()
                
                
                } else {
                    //Game Over
                    playing = false; // we are not playing anymore
                    $('#startreset').html('Start Game'); // Change button to start game
                    
                    $('#gameover').show()
                    $('#gameover').html('<p>game over</p> <p>your score is ' + score + '</p>');
                    $('#trialsLeft').hide();
                    stopAction();
                }
           
           }
        
    }, 10);
    
}

//Generate a random fruit function
function chooseFruit(){
    $('#fruit1').attr('src', 'images/' + fruits[Math.floor(Math.random() * 9)] + '.png')
}

// Stop dropping fruits
function stopAction() {
    clearInterval(action);
    $('#fruit1').hide();
    
}

});