// requiring Letter module exported from letter.js
var Letter = require("./letter.js");

// constructor for creating Word objects
var Word = function() {
    // this.letters hold all letter objects that comprise the word
    this.letters = [];
    // method that displays all the letters as a word.
    this.displayWord = () => {
        let word = ""
        for (let i=0; i < this.letters.length; i++){
            word += this.letters[i] + " ";
        }
        return(word.toUpperCase());
    };
    // method to check if letter in contained in the word
    this.chkLtr = (ch) => {
        let ltrFound = false;
        for (let i=0; i < this.letters.length; i++){
            if (this.letters[i].chkLtr(ch)){
                ltrFound = true;
            }
        }
        return ltrFound;
    }
    // method to add a word as an array letter contructors
    this.addWord = (word) => {
        for (let i=0; i < word.length; i++) {
            this.letters.push(new Letter(word[i]));
            if ( word[i] === " ") {
                this.letters[i].ltrGuessed = true;
            }
        }
    }
    // method to check if all letters in the word have been guessed
    this.wordFound = () => {
        var found = true;
        
        for (let i=0; i < this.letters.length; i++){
            found = found && this.letters[i].ltrGuessed;
        }
        return found;
    }
};
  
// exporting constructor. We will require it in index.js
module.exports = Word;
  
