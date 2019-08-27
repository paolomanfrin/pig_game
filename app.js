/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 20 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gameOver, previousScore;
init();


document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdScore);
document.querySelector('.btn-new').addEventListener('click', init);

function rollDice(){
    if (gameOver)
        return;
    
    var dice = Math.floor(Math.random()*6+1);
    console.log(dice);
    var diceDOM = document.querySelector('.dice');
    diceDOM.src = "dice-" + dice + ".png";
    diceDOM.style.display = "block";
    
    if (dice!==1){
        
        if (dice==6 && previousScore[activePlayer]==6)
        {
            console.log("Two six in a row");
            switchPlayer();
        }
        else {
            var currentScore = parseInt(document.getElementById('current-' + activePlayer).innerHTML);
            currentScore =  currentScore + dice;
            document.getElementById('current-' + activePlayer).innerHTML = currentScore;
            previousScore[activePlayer] = dice;
        }
        
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
    document.getElementById('score-' + activePlayer).textContent = totalScore;
    scores[activePlayer] = totalScore; // save score
    
    if (totalScore > 20){
        // a winner 
        document.getElementById('name-' + activePlayer).textContent = "WINNER!";
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
    
    console.log("current active player is " + (activePlayer+1));
    
    document.querySelector('.player-0-panel').classList.toggle("active");
    document.querySelector('.player-1-panel').classList.toggle("active");
    
}

function init()
{
    scores = [0,0];
    previousScore = [0,0];
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