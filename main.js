const Player = (move) => {
    this.move = move;

    const getMove = () => {
        return move;
    }

    return { getMove };
};

const GameBoard = (() => {

    const gameField = document.querySelectorAll('.field');
    const playerMove = document.querySelector('.player_move');

    playerMove.textContent = 'X\'s turn';

    let board = [Player(''),Player(''),Player(''),Player(''),Player(''),Player(''),Player(''),Player(''),Player('')];

    let player1 = Player('X');
    let player2 = Player('O');

    const render = () => {
        gameField.forEach((field, index) => {
            field.textContent = board[index].getMove();
        });
    };

    let wasX = false;
    gameField.forEach((field, index) => {
        field.addEventListener('click', () => {
            if (!wasX && field.textContent === '') {
                field.textContent = player1.getMove();
                wasX = true;
                board[index] = player1;
                playerMove.textContent = 'O\'s turn';
            }
            else if (wasX && field.textContent === '') {
                field.textContent = player2.getMove();
                wasX = false;
                board[index] = player2;
                playerMove.textContent = 'X\'s turn';
            }
            GameController.checkWinner();
        });
    });


    const reset = () => {
        board.forEach((field, index) => {
            board[index] = Player('');
        });

        playerMove.textContent = 'X\'s turn';
        wasX = false;
    };

    return { board, render, reset };
})();

const GameController = (() => {

    let isGameFinished = false;

    const checkWinner = () => {

        const resultMessage = document.querySelector('.result');

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

        winCases.forEach((winCase) => {
            const [posA, posB, posC] = winCase;

            const signA = GameBoard.board[posA].getMove();
            const signB = GameBoard.board[posB].getMove();
            const signC = GameBoard.board[posC].getMove();

            if (signA !== '' && signA === signB && signB === signC) {
                console.log('Winner: ' + signA);
                resultMessage.textContent = 'Winner: ' + signA;
                isGameFinished = true;
                gameResults();
                return signA;
            }
        });

    };

    const resetGame = () => {
        console.log('game reset');
        GameBoard.reset();
        GameBoard.render();
    };

    const resetButton = document.querySelector('.resetBtn');
    resetButton.addEventListener('click', () => {
        GameController.resetGame();
    });

    const gameResults = () => {
        const endGameScreen = document.querySelector('.game_result');
        const boardField = document.querySelector('.game');
        const newGame = document.querySelector('.new_game button');

        if(isGameFinished) {
            endGameScreen.style.display = 'flex';
            boardField.style.display = 'none';
        }

        newGame.addEventListener('click', () => {
            endGameScreen.style.display = 'none';
            boardField.style.display = 'flex';
            GameController.resetGame();
        });

    };

    return { resetGame, checkWinner, gameResults };

})();