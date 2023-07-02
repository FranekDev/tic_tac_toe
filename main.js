const gameBoard = document.querySelector('.gameBoard');
const gameField = document.querySelectorAll('.field');

const GameBoard = () => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        gameField.forEach((field, index) => {
            field.textContent = board[index];
        });
    };

    const reset = () => {
        board.forEach((field, index) => {
            board[index] = '';
        });
    };

    return { board, render, reset };
};

let Player = (move) => {
    this.move = move;

    const getMove = () => {
        return move;
    }

    return { getMove };
};

const game = GameBoard();
game.render();

const GameController = (() => {

    const winCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] 
    ];

    const checkWinner = () => {
        let winner = '';
        return winner;
    }

    const resetGame = () => {
        console.log('game reset');
        game.reset();
        game.render();
    };

    return { resetGame, checkWinner };

})();

let wasX = false;
gameField.forEach((field) => {
    field.addEventListener('click', () => {
        if (!wasX && field.textContent == '') {
            field.textContent = 'X';
            wasX = true;
        }
        else if (wasX && field.textContent == '') {
            field.textContent = 'O';
            wasX = false;
        }
        GameController.checkWinner();
    });
});


const resetButton = document.querySelector('.resetBtn');
resetButton.addEventListener('click', () => {
    GameController.resetGame();
});