// Storing the game board as an array, as a module
const gameBoard = (() => {
    let cells = ['', '', '', '', '', '', '', '', ''];
    return {cells};
})();

// Rendering the game board
const renderGameBoard = (() => {
    // Cells will hold an array of all the divs with the class cell
    const cells = document.querySelectorAll('.cell');
    // For each cell, set the text content to the corresponding cell in the gameBoard.cells array
    cells.forEach((cell, index) => {
        // The content of each cell will correspond the content of the gameBoard.cells array on the same index
        cell.textContent = gameBoard.cells[index];
    });
});

// Rendering the board
renderGameBoard();

// Factory function Player that creates an object with the parameter 'symbol'
const Player = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol};
};


// Function that manages the flow of the game, from the player choosing their symbol to the board rendering and taking turns (player going first and computer always second)
const game = (() => {
    // Defining a structure that holds every possible way a player can win a tic-tac-toe game
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    // Defining a function that will end the game and make the cells unclickable after a player wins

    const endGame = () => {
        console.log("TESTING")
        let winningBoard = document.getElementsByClassName('game-board')[0];
        let chooseCharacter = document.getElementsByClassName('choose-character')[0];
        let fightTitle = document.getElementsByClassName('fight_title')[0];
        let game = document.getElementsByClassName('game')[0];
        winningBoard.classList.add('inactive');
        chooseCharacter.classList.add('inactive');
        fightTitle.classList.add('inactive');
        game.classList.add('inactive');
        winnerTitle(player, computer);
    }

    // Creating two empty variables that will hold the player and computer objects depending on what the player chooses
    let player;
    let computer;
    // Selecting the x_character and o_character divs
    const x_character = document.getElementById('x-character');
    const o_character = document.getElementById('o-character');
    // Selecting all the choose-character section
    const choose_character = document.getElementsByClassName('choose-character')[0];
    // Selecting the game-board section
    const gameboard = document.getElementsByClassName('game')[0];
    // Selecting the "Choose your fighter" text
    const choose_character_title = document.getElementsByClassName('choose_character_title')[0];
    // Selecting the "Fight" text
    const fight_title = document.getElementsByClassName('fight_title')[0];
    // Getting the sections that hold the name of the player
    const x_player_name = document.getElementById('x_player_name');
    const o_player_name = document.getElementById('o_player_name');

    // Function that takes as parameters, the symbol and name of each player and creates the player and computer objects
    // This function will be called when a player chooses their character and given those parameters

    const winnerTitle = (player, computer) => {
        let winnerTitle = document.getElementsByClassName('winner-title')[0];
        // Adding text on the winnerTitle element that will display the winners' name
        winnerTitle.textContent = `Player ${player.getSymbol()} won! \r\n`;
        winnerTitle.textContent += `Player ${computer.getSymbol()} lost!`;
        winnerTitle.classList.remove('inactive');
    }
    const chooseCharacter = (playerSymbol, playerName, computerSymbol, computerName) => {
        // Creating a player and a computer object with the symbols X and O respectively and storing them on the variables previously created
        player = Player(playerSymbol);
        computer = Player(computerSymbol);

        // Removing the inactive class from the gameboard and fight_title sections and adding the inactive class to the choose_character_title and choose_character sections
        // This will make the gameboard and fight_title sections visible and the choose_character_title and choose_character sections invisible
        gameboard.classList.remove('inactive');
        fight_title.classList.remove('inactive');
        choose_character_title.classList.add('inactive');
        choose_character.classList.add('inactive');

        // Setting the text content of the x_player_name and o_player_name sections to the name of the player and computer respectively
        x_player_name.textContent = playerName;
        o_player_name.textContent = computerName;
    };

    // Event listeners that will call the chooseCharacter function with the corresponding parameters when the user chooses x character
    x_character.addEventListener('click', () => {
        chooseCharacter('X', 'Xenon Guardian', 'O', 'Onyx Overlord');
    });

    // Event listeners that will call the chooseCharacter function with the corresponding parameters when the user chooses o character
    o_character.addEventListener('click', () => {
        chooseCharacter('O', 'Xenocide Dictator', 'X', 'Omega Sentinel');
    });

    // Selecting all the cells
    const cells = document.querySelectorAll('.cell');
    // Counter variable that will determine which player's turn it is
    let counter = 0;

    const checkWin = (symbol) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard.cells[a] === symbol && gameBoard.cells[b] === symbol && gameBoard.cells[c] === symbol) {
                endGame()
                return true; // Player with the symbol won
            }
        }
        return false; // No winning combination found
    };

    // For each cell, add an event listener that will add the corresponding symbol to the cell when clicked
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            // If the cell is empty, add the symbol to the cell
            if ((counter % 2) === 0 && gameBoard.cells[index] === '') {
                gameBoard.cells[index] = player.getSymbol();
                if (checkWin(player.getSymbol())) {
                    console.log('Player won');
                    console.log('Game over')
                    endGame();
                }
                counter++;
                // Calling the renderGameBoard function to render the board with the new symbol
                renderGameBoard();
            }

            else if ((counter % 2) !== 0 && gameBoard.cells[index] === '') {
                gameBoard.cells[index] = computer.getSymbol();
                if (checkWin(computer.getSymbol())) {
                    console.log('Computer won');
                    console.log('Game over')
                    endGame();
                }
                counter++;
                // Calling the renderGameBoard function to render the board with the new symbol
                renderGameBoard();
            }

            else {
                console.log('not empty');
            }
        });
    });
});

// Executing the game
game();