const board = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell clicks
function handleCellClick(clickedCell, index) {
    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkWinner();
}

// Check if the current player has won
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check if the game is a draw
    if (!gameState.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

// Restart the game
function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];

    board.forEach(cell => (cell.innerText = ""));
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

// Add event listeners to cells and reset button
board.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
});

resetBtn.addEventListener("click", resetGame);
