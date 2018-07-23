var Letter = function (ltr) {
    this.ltr = ltr;
    // This isn't necessary, could return "_", but left in place in case you want to change the character to display unguessed letter
    // this.blankLtr = "_"; 
    this.ltrGuessed = false;
    this.toString = () => {
        if (this.ltrGuessed){
            return this.ltr;
        }
        else {
            return "_";
            // return this.blankLtr;
        }
    };
    this.chkLtr = (ch) => {
        if (this.ltr === ch) {
            this.ltrGuessed = true;
            return true;
        }
        else {
            return false;
        }
    };

}

// exporting Letter constructor
module.exports = Letter;
