let scores = [0, 0]; 
let currentPlayer = 0; 
let round = 1; 
const maxRounds = 3;
let playerNames = ["Jugador 1", "Jugador 2"];
const diceSound = new Audio("dice-roll.mp3");
let bestScore = 0;

function setPlayerNames() {
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    
    if (name1) playerNames[0] = name1;
    if (name2) playerNames[1] = name2;
    
    document.getElementById("player1Name").textContent = playerNames[0];
    document.getElementById("player2Name").textContent = playerNames[1];
    document.getElementById("history1Name").textContent = playerNames[0] + ":";
    document.getElementById("history2Name").textContent = playerNames[1] + ":";

    document.getElementById("turn").textContent = `Turno de: ${playerNames[currentPlayer]}`;
    document.getElementById("name1").value = "";
    document.getElementById("name2").value = "";
}

function rollDice() {
    diceSound.play();
    let roll = Math.floor(Math.random() * 6) + 1;
    scores[currentPlayer] += roll;
    document.getElementById(`score${currentPlayer + 1}`).textContent = scores[currentPlayer];
    document.getElementById(`dice${currentPlayer + 1}`).src = getDiceFace(roll);

    // Agregar al historial
    let historyElement = document.getElementById(`history${currentPlayer + 1}List`);
    let historyItem = document.createElement("li");
    historyItem.textContent = `Ronda ${round}: ${roll} puntos`;
    historyElement.appendChild(historyItem);

    // Cambiar de jugador
    if (currentPlayer === 1) {
        if (round === maxRounds) {
            determineWinner();
            document.getElementById("rollDice").disabled = true;
            return;
        }
        round++;
        document.getElementById("currentRound").textContent = round;
    }

    // Alternar jugador
    currentPlayer = 1 - currentPlayer;
    document.getElementById("turn").textContent = ` ${playerNames[currentPlayer]}`;
}

function getDiceFace(num) {
    return `img/cara${num}.jpg`;
}

function determineWinner() {
    let winnerText = "";
    let highestScore = Math.max(scores[0], scores[1]);

    if (scores[0] > scores[1]) {
        winnerText = `${playerNames[0]} gana!`;
    } else if (scores[1] > scores[0]) {
        winnerText = `${playerNames[1]} gana!`;
    } else {
        winnerText = "¡Empate!";
    }
    document.getElementById("winner").textContent = winnerText;

    // Actualizar la mejor puntuación si es mayor a la anterior
    if (highestScore > bestScore) {
        bestScore = highestScore;
        document.getElementById("bestScore").textContent = bestScore;
    }
}

function restartGame() {
    scores = [0, 0];
    currentPlayer = 0;
    round = 1;
    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("currentRound").textContent = "1";
    document.getElementById("turn").textContent = ` ${playerNames[0]}`;
    document.getElementById("winner").textContent = "";
    document.getElementById("rollDice").disabled = false;
    document.getElementById("dice1").src = "img/cara1.jpg";
    document.getElementById("dice2").src = "img/cara1.jpg";
    document.getElementById("history1List").innerHTML = "";
    document.getElementById("history2List").innerHTML = "";
}

document.getElementById("setNames").addEventListener("click", setPlayerNames);
document.getElementById("rollDice").addEventListener("click", rollDice);
document.getElementById("restart").addEventListener("click", restartGame);
