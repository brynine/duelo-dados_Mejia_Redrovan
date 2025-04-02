let scores = [0, 0];
let currentPlayer = 0;
let round = 1;
const maxRounds = 3;

function rollDice() {
    const dice = [document.getElementById("dice1"), document.getElementById("dice2")];
    const scoreElements = [document.getElementById("score1"), document.getElementById("score2")];
    
    let roll = Math.floor(Math.random() * 6) + 1;
    
    scores[currentPlayer] += roll;
    scoreElements[currentPlayer].textContent = scores[currentPlayer];
 
    dice[currentPlayer].classList.remove("rolling");
    void dice[currentPlayer].offsetWidth;
    dice[currentPlayer].classList.add("rolling");

    dice[currentPlayer].src = getDiceFace(roll);

    if (currentPlayer === 1) {
        round++;
        document.getElementById("round").textContent = round;
    }
    
    if (round > maxRounds) {
        determineWinner();
        document.getElementById("rollDice").disabled = true;
        return;
    }
    
    // Cambiar al siguiente jugador
    currentPlayer = 1 - currentPlayer; // Alternar entre 0 y 1
    document.getElementById("turn").textContent = `Jugador ${currentPlayer + 1}`;
}

function getDiceFace(num) {
    // Las imágenes de los dados para cada número (1-6)
    const faces = [
        "file:///C:/Users/bryam/OneDrive - Universidad Politecnica Salesiana/UNIVERSIDAD P66/Programacion y Plataformas Web/Practica1Dados/Practica1-Dados/cara1.jpg", // Cara 1
        "file:///C:/Users/bryam/OneDrive - Universidad Politecnica Salesiana/UNIVERSIDAD P66/Programacion y Plataformas Web/Practica1Dados/Practica1-Dados/cara2.jpg", // Cara 2
        "file:///C:/Users/bryam/OneDrive - Universidad Politecnica Salesiana/UNIVERSIDAD P66/Programacion y Plataformas Web/Practica1Dados/Practica1-Dados/cara3.jpg", // Cara 3
        "file:///C:/Users/bryam/OneDrive - Universidad Politecnica Salesiana/UNIVERSIDAD P66/Programacion y Plataformas Web/Practica1Dados/Practica1-Dados/cara4.jpg", // Cara 4
        "file:///C:/Users/bryam/OneDrive - Universidad Politecnica Salesiana/UNIVERSIDAD P66/Programacion y Plataformas Web/Practica1Dados/Practica1-Dados/cara5.jpg", // Cara 5
        "file:///C:/Users/bryam/OneDrive - Universidad Politecnica Salesiana/UNIVERSIDAD P66/Programacion y Plataformas Web/Practica1Dados/Practica1-Dados/cara6.jpg"  // Cara 6
    ];
    return faces[num - 1]; // Devolver la ruta de la imagen correspondiente
}

function determineWinner() {
    let winnerText = "";
    if (scores[0] > scores[1]) {
        winnerText = "¡Jugador 1 gana!";
    } else if (scores[1] > scores[0]) {
        winnerText = "¡Jugador 2 gana!";
    } else {
        winnerText = "¡Empate!";
    }
    document.getElementById("winner").textContent = winnerText;
}

function restartGame() {
    scores = [0, 0];
    currentPlayer = 0;
    round = 1;
    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("round").textContent = "1";
    document.getElementById("turn").textContent = "Jugador 1";
    document.getElementById("winner").textContent = "";
    document.getElementById("rollDice").disabled = false;
    document.getElementById("dice1").src = "file:///C:/Users/Atlas/Documents/yo/cara1.jpg";
    document.getElementById("dice2").src = "file:///C:/Users/Atlas/Documents/yo/cara1.jpg";
}

// Eventos para los botones
document.getElementById("rollDice").addEventListener("click", rollDice);
document.getElementById("restart").addEventListener("click", restartGame);
