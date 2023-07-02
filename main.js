const gameBoard = document.querySelector('.gameBoard');
const gameField = document.querySelectorAll('.field');

const GameBoard = () => {
    let board = ['X', 'X', 'X', 'X', 'O', 'O', 'X', 'O', 'O'];

    const render = () => {
        gameField.forEach((field, index) => {
            field.textContent = board[index];
        });
    }

    return { board, render };
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

