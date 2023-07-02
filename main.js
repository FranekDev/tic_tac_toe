const Player = (move) => {
    this.move = move;

    const getMove = () => {
        return move;
    }

    return { getMove };
};

const GameBoard = (() => {

    const gameField = document.querySelectorAll('.field');

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
            }
            else if (wasX && field.textContent === '') {
                field.textContent = player2.getMove();
                wasX = false;
                board[index] = player2;
            }
            GameController.checkWinner();
        });
    });


    const reset = () => {
        board.forEach((field, index) => {
            board[index] = Player('');
        });

        wasX = false;
    };

    return { board, render, reset };
})();

const GameController = (() => {

    const checkWinner = () => {

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
                alert('Winner: ' + signA);
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

    return { resetGame, checkWinner };

})();