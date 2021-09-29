
  
const bird=document.querySelector('.bird');
const gameDisplay = document.querySelector('.game-container');
const ground = document.querySelector('.ground');
let score = document.getElementById("Score");
let instruction= document.getElementById("instruction");

let birdLeft = 220;
let birdbottom = 100;
let gravity = 2;
let isGameOver = false;
let gap = 420;
var count = 1;
var countMultiplier = 1 

function gameStart(){
    birdbottom -= gravity
    bird.style.bottom = birdbottom +'px';
    bird.style.left = birdLeft +'px';
    
}

let gametimerId=setInterval(gameStart , 20);
   



function control(e){
    if(e.keyCode === 32){
        jump();
        instruction.style.display="none"
    } 
    
}

function jump(){
    if(birdbottom < 500) birdbottom += 50;
    
    bird.style.bottom = birdbottom +'px';
}

document.addEventListener("keyup" , control)


function generateObstracle(){
    let obstracleLeft = 500;
    let randomHeight = Math.random() * 100;
    let obstracleBottom = randomHeight;
    const obstracle = document.createElement('div');
    const topobstracle = document.createElement('div');
    if(!isGameOver){
       obstracle.classList.add('obstracle');
       topobstracle.classList.add('top-obstracle'); 
    } 
    gameDisplay.appendChild(obstracle);
    gameDisplay.appendChild(topobstracle);
    obstracle.style.left = obstracleLeft + 'px';
    topobstracle.style.left = obstracleLeft + 'px';
    obstracle.style.bottom = obstracleBottom + 'px';
    topobstracle.style.bottom = obstracleBottom + gap + 'px';

    function moveObstracle(){
        if(!isGameOver)obstracleLeft -= 2;
        obstracle.style.left = obstracleLeft +'px';
        topobstracle.style.left = obstracleLeft +'px';
        if(obstracleLeft === -60){
            clearInterval(timerId)
            gameDisplay.removeChild(obstracle)
            gameDisplay.removeChild(topobstracle)
        }
        let contactPosition = 300 - (150 - randomHeight);
       
    

        if( obstracleLeft >= 160 && obstracleLeft <= 280 && (birdbottom < contactPosition || birdbottom + 45 >= contactPosition+120 )  ||birdbottom === 0){
            gameOver();
            clearInterval(timerId);
        }
        
        if(!isGameOver){
            count++;
            score.innerText=`Score: ${count}`;
        }
    
    }
    let timerId = setInterval(moveObstracle , 20);
    if(!isGameOver) setTimeout(generateObstracle , 3000)
}

generateObstracle(); 

    function gameOver(){
        clearTimeout(gametimerId)
        isGameOver = true
        document.removeEventListener( 'keyup' , control);
        score.id="ScoreCard"
    }


