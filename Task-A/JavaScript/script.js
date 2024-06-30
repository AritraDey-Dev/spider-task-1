document.addEventListener('DOMContentLoaded', function() {
    const boardSize = 3; // Size of the initial 3x3 board
    let currentPlayer = 'X'; // X goes first
    let moves = 0;
    let gameEnded = false;

    const gameBoard = document.getElementById('game-board');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart-btn');

    // Initialize the game board
    function initializeBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => makeMove(cell));
            gameBoard.appendChild(cell);
        }
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Handle a player making a move
    function makeMove(cell) {
        if (cell.textContent === '' && !gameEnded) {
            cell.textContent = currentPlayer;
            moves++;

            // Check for win or draw
            if (checkWin()) {
                statusDisplay.textContent = `Player ${currentPlayer} wins!`;
                gameEnded = true;
            } else if (moves === boardSize * boardSize) {
                statusDisplay.textContent = 'It\'s a draw!';
                gameEnded = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Check for a win condition
    function checkWin() {
        const cells = document.getElementsByClassName('cell');
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => cells[index].textContent === currentPlayer);
        });
    }

    // Restart the game
    restartButton.addEventListener('click', function() {
        gameBoard.innerHTML = '';
        moves = 0;
        currentPlayer = 'X';
        gameEnded = false;
        initializeBoard();
    });

    // Start the game
    initializeBoard();
});
