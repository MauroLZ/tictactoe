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

const Player = (symbol) => {
    const getSymbol = () => symbol;
    return {getSymbol};
};

// Selecting the x_character and o_character divs
const x_character = document.getElementById('x-character');
const o_character = document.getElementById('o-character');
// Selecting all the choose-character section
const choose_character = document.getElementsByClassName('choose-character')[0];
// Selecting the game-board section
const gameboard = document.getElementsByClassName('game-board')[0];
// Selecting the "Choose your fighter" text
const choose_character_title = document.getElementsByClassName('choose_character_title')[0];
// Selecting the "Fight" text
const fight_title = document.getElementsByClassName('fight_title')[0];

// Event listener that creates a player with the symbol X when x_character is clicked
x_character.addEventListener('click', () => {
    const player = Player('X');
    console.log(player.getSymbol());
    const computer = Player('O');
    console.log(computer.getSymbol());
    gameboard.classList.remove('inactive')
    fight_title.classList.remove('inactive')
    choose_character_title.classList.add('inactive')
    choose_character.classList.add('inactive')
});

// Event listener that creates a player with the symbol O when o_character is clicked
o_character.addEventListener('click', () => {
    const player = Player('O');
    console.log(player.getSymbol());
    const computer = Player('X');
    console.log(computer.getSymbol());
    gameboard.classList.remove('inactive')
    fight_title.classList.remove('inactive')
    choose_character_title.classList.add('inactive')
    choose_character.classList.add('inactive')
});
