/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gameOver;
init();


document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdScore);
document.querySelector('.btn-new').addEventListener('click', init);

function rollDice(){
    if (gameOver)
        return;
    
    var dice = Math.floor(Math.random()*6+1);
    document.querySelector('.dice').src = "dice-" + dice + ".png";
    document.querySelector('.dice').style.display = "block";
    
    if (dice!==1){
        var currentScore = parseInt(document.getElementById('current-' + activePlayer).innerHTML);
        currentScore =  currentScore + dice;
        document.getElementById('current-' + activePlayer).innerHTML = currentScore;
        
        
    }
    else {
        // change player
        switchPlayer();
    }
    
};

function holdScore() {
    
    if (gameOver)
        return;
    
    var currentScore = parseInt(document.getElementById('current-' + activePlayer).innerHTML);
    var totalScore = scores[activePlayer];
    
    
    
    totalScore = totalScore + currentScore;
    document.getElementById('score-' + activePlayer).innerHTML = totalScore;
    scores[activePlayer] = totalScore; // save score
    
    if (totalScore > 20){
        // a winner 
        document.getElementById('name-' + activePlayer).innerHTML = "WINNER!";
        console.log("winner!");
        gameOver = true;
    }
    else // switchPlayer
        switchPlayer();
};

function switchPlayer(){
    
    document.querySelector('.dice').style.display = "none";
    document.getElementById('current-' + activePlayer).innerHTML= "0";
    activePlayer = activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    console.log("current active player is " + activePlayer);
    
    document.querySelector('.player-0-panel').classList.toggle("active");
    document.querySelector('.player-1-panel').classList.toggle("active");
    
}

function init()
{
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameOver = false;
    
    // reset players name
    document.getElementById('name-0').innerHTML = "PLAYER 1";
    document.getElementById('name-1').innerHTML = "PLAYER 2";
    
    // reset total score
    document.getElementById('score-0').innerHTML = "0";
    document.getElementById('score-1').innerHTML = "0";
    
    // reset partial score
    document.getElementById('current-0').innerHTML = "0";
    document.getElementById('current-1').innerHTML = "0";
    
    // set player 1 as starter
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-1-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");
    
    
    
    
}