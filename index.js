// requiring Word module exported from word.js
var Word = require("./word.js");
var inquirer = require("inquirer");
const chalk = require('chalk');  // Change colors on console

var possibleComposers = ["mozart", "beethoven", "bach", "chopin", "brahms", "tchaikovsky", "wagner", 
"vivaldi", "handel", "debussy", "schubert", "haydn", "liszt", "mahler",
"stravinsky", "verdi", "mendelssohn", "ravel", "schumann", "strauss",
"dvorak", "elgar", "britten", "puccini", "bernstein", "berflioz", "rachmaninoff", "grieg", "shostakovich", "rossini",
"schoenberg", "bartok", "purcell", "prokofiev", "gershwin", "faure", "paganini", "rimsky-korsakov", "satie", "saint-saens",
"sibelius", "bruckner", "bizet", "janacek", "copland", "mussorgsky", "monteverdi", "scriabin"]

const maxGuesses = 10;
var numOfGuesses = maxGuesses;
var composerSelection;

console.log(chalk.blue("\nWelcome to Word Guess Game!"));
console.log("Find the composer's name by choosing ten letters or less.\n");

restart();

// Functions:
//
// Play the word game
function play() {
    if (!composerSelection.wordFound()) {
        if (numOfGuesses > 0) {
            getLetter();
        }
        else {
            console.log(chalk.red(`Ooops! you lose, as you ran out of option!\n`));
            // console.log("Next word:")
            restart();
        }
    }
    else {
        console.log(chalk.green(`Bravo! You won!\n`));
        // console.log("Next word:")
        restart();
    }
}

// Prompt user for a letter, check if letter is contained in the random word
function getLetter () {
    inquirer.prompt ([
        {
            type: "input",
            name: "letter",
            message: "Please, select a new letter!",
            // Valid characters {A-Z, a-z}
            validate: function(ch){
                if (/^[A-Z]$/i.test(ch)) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(response) {
        // Convert letter to lowercase, check if letter is found in the word, if found, let player know they guessed correctly
        if (composerSelection.chkLtr(response.letter.toLowerCase())){
            console.log(chalk.green(`\nYes, this letter is correct!!!\n`));
        }
        else {
            // else decrement the number of remaining guesses, alert player they guessed incorrectly
            numOfGuesses--
            console.log(chalk.yellow(`\nNope, this letter is incorrect!!! Try again!\n`));
            console.log(`Remaining Letters' Choice: ${numOfGuesses}\n`);
        }
        console.log(`${composerSelection.displayWord()}\n`);
        // Continue playing game
        play();
    });
}

// Resets the random word and starts the game

function restart() {

    inquirer.prompt ([
        {
            type: "confirm",
            name: "status",
            message: "Would you like to Play a Game?"
        }
    ]).then (function(response) {
        if (response.status === true){
            // Play the game!
            // Select a random word & add it to Word contructor
            composerSelection = new Word();
            composerSelection.addWord(possibleComposers[Math.floor(Math.random()*possibleComposers.length)])
            console.log(`\n${composerSelection.displayWord()}\n`);
            numOfGuesses = maxGuesses;
            play();
        }
        else {
            console.log(chalk.white("\nThanks for playing! Come back soon!\n"));
        }
    });
}
