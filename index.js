
// importing the Cursor class to control the keyboard and guesses
import {Cursor} from "./Cursor.js"

const keyboard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", " ",
                 "a", "s", "d", "f", "g", "h", "j", "k", "l", " ",
                 "Enter", "z", "x", "c", "v", "b", "n", "m", "Remove", " "];
const containers = ["top_row_kb", "mid_row_kb", "btm_row_kb"];

const cursor = new Cursor();

// building the keyboard ---------------------------
let i = 0;

keyboard.forEach(element => {
    if (element === " ") {
        i++;
    }
    else {
        
        let newButton = document.createElement("button");
        newButton.setAttribute("id", element);
        newButton.onclick = () => reply_click(element);
        let nodeButton = document.createTextNode(element.toUpperCase());
        newButton.appendChild(nodeButton);

        let container = document.getElementById(containers[i]);
        container.appendChild(newButton);
    }
});
// ------------------------------

function checkWin(colorArray) {
    if (!colorArray.includes("gray") && !colorArray.includes("yellow") && colorArray.includes("green")) {
        return true;
    }
    else {
        return false;
    }
}

// get the value of the button that's getting clicked
function reply_click(e) {
    
    if (e != "Remove" && e != "Enter" && cursor.getWord().length < 5) {
        cursor.addLetter(e);
        document.getElementById("r" + cursor.getRow() + "c" + cursor.getColumn()).innerText = e.toUpperCase();
        cursor.increaseColumn();
    }
    else if(e == "Remove" && cursor.getWord().length > 0) {
        cursor.removeLetter();
        cursor.decreaseColumn();
        document.getElementById("r" + cursor.getRow() + "c" + cursor.getColumn()).innerText = "";
    }
    else if (e == "Enter" && cursor.getWord().length == 5) {
        // dictionary api github.com/meetDeveloper/freeDictionaryAPI
        //got to check first if word exists,
        // I can do so by adding the words api and asking it to retrieve the word
        // if code is 404 then the word doesn't exist
        
        //then:
        let colorArray = checkWordSent(cursor.getWord(), getMysteryWord()); 
        let curRow = cursor.getRow();

        for (let j = 0; j < 5; j++) {
            if (colorArray[j] == "green") {
                document.getElementById("r" + curRow + "c" + j).style.animationName = 'turn_to_green'; //green
                document.getElementById("r" + curRow + "c" + j).style.animationDuration = '1s'; //animation
                document.getElementById("r" + curRow + "c" + j).style.animationFillMode = 'forwards'; //animation
            }
            else if (colorArray[j] == "yellow") {
                document.getElementById("r" + curRow + "c" + j).style.animationName = 'turn_to_yellow'; //yellow
                document.getElementById("r" + curRow + "c" + j).style.animationDuration = '1s'; //animation
                document.getElementById("r" + curRow + "c" + j).style.animationFillMode = 'forwards'; //animation
            } else {
                document.getElementById("r" + curRow + "c" + j).style.animationName = 'turn_to_gray'; //gray
                document.getElementById("r" + curRow + "c" + j).style.animationDuration = '1s'; //animation
                document.getElementById("r" + curRow + "c" + j).style.animationFillMode = 'forwards'; //animation
                document.getElementById(cursor.getWord()[j]).className = 'deactivated'; //!!! STILL WORKING ON IT !!!
            }
        }

        cursor.setColumn(0);
        cursor.deleteWord();
        cursor.increaseRow();

        if(checkWin(colorArray)) {
            document.getElementById("coverScreen").style.display = "inline-flex";
            document.getElementById("coverScreen").style.animationName = "cover_screen";
            document.getElementById("coverScreen").style.animationDuration = "1s";
            document.getElementById("coverScreen").style.animationFillMode = "forwards";

            document.getElementById("scoreModal").style.display = "inline-flex";
            document.getElementById("scoreModal").style.animationName = "animate_top";
            document.getElementById("scoreModal").style.animationDuration = "1s";
            document.getElementById("scoreModal").style.animationFillMode = "forwards";

            document.getElementById("mysteryWord").innerText = getMysteryWord().toUpperCase();
            document.getElementById("winLoseText").style.color = "green";
            document.getElementById("winLoseText").innerText = "You win!";
        } else if(cursor.getRow() > 6) {
            document.getElementById("coverScreen").style.display = "inline-flex";
            document.getElementById("coverScreen").style.animationName = "cover_screen";
            document.getElementById("coverScreen").style.animationDuration = "1s";
            document.getElementById("coverScreen").style.animationFillMode = "forwards";

            document.getElementById("scoreModal").style.display = "inline-flex";
            document.getElementById("scoreModal").style.animationName = "animate_top";
            document.getElementById("scoreModal").style.animationDuration = "1s";
            document.getElementById("scoreModal").style.animationFillMode = "forwards";

            document.getElementById("mysteryWord").innerText = getMysteryWord().toUpperCase();
            document.getElementById("winLoseText").style.color = "red";
            document.getElementById("winLoseText").innerText = "You lose!";
        }

    }
    
    console.log(cursor.getColumn());
    console.log(cursor.getWord());
}

// CREATE THE GUESS BOXES

const guess_containers = ["row1", "row2", "row3", "row4", "row5", "row6"];

guess_containers.forEach(element => {
    for (let k = 0; k < 5; k++) {
        let newBox = document.createElement("div");
        newBox.setAttribute("id", "r" + element[3] + "c" + k);
        newBox.setAttribute("class", "guess_box");
        let nodeBox = document.createTextNode("");
        newBox.appendChild(nodeBox);

        let container = document.getElementById(element);
        container.appendChild(newBox);
    }
})

// change light/dark mode
let light_mode = false;

function changeMode() {
    if (light_mode) {
        document.body.style.animationName = "set_to_dark_mode";
        document.body.style.animationDuration = "1s";
        document.body.style.animationDirection = "linear";
        document.body.style.animationFillMode = "forwards";
    }
    else {
        document.body.style.animationName = "set_to_light_mode";
        document.body.style.animationDuration = "1s";
        document.body.style.animationDirection = "linear";
        document.body.style.animationFillMode = "forwards";
    }
    
    light_mode = !light_mode;
}

let newOptionButton = document.createElement("text");
newOptionButton.setAttribute("id", "dark_light_mode");
newOptionButton.onclick = () => changeMode();
let nodeOptionButton = document.createTextNode("🌕");
newOptionButton.appendChild(nodeOptionButton);

let options_div = document.getElementById("options_buttons");
options_div.appendChild(newOptionButton);



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////// main functions for the wordle(n't) ///////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// fetch to an api

const data = null;
let mysteryWord = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		mysteryWord = this.responseText;
	}
});

xhr.open('GET', 'https://random-words5.p.rapidapi.com/getRandom?wordLength=5');
xhr.setRequestHeader('X-RapidAPI-Key', 'e8c30f1820mshc210abe883c5745p10fa00jsn57b3fbae7da2');
xhr.setRequestHeader('X-RapidAPI-Host', 'random-words5.p.rapidapi.com');

xhr.send(data);

function getMysteryWord() {
    return mysteryWord;
}

// get if word exists

//

function splitMysteryWordArray(mysteryWord) {
    let mysteryWordArray = new Array();

    for (let i = 0; i < 5; i++) {
        mysteryWordArray[i] = mysteryWord[i];
    }

    return mysteryWordArray;
}


function checkYellowLetters(wordSent, mysteryWord, colorArray) {
    const wordCount = {};
    for (let i = 0; i < 5; i++) { //first I want to find the amount of occurences that I have from each letter
        if (wordCount[(mysteryWord[i])] == undefined) {
            wordCount[(mysteryWord[i])] = 1;
        }
        else {
            wordCount[(mysteryWord[i])]++;
        }
    }

    for (let i = 0; i < 5; i++) { //getting rid of the green letters so they take their occurences
        if (colorArray[i] == "green" && wordCount[(wordSent[i])] != undefined) {
            if (wordCount[(wordSent[i])] > 0) {
                wordCount[(wordSent[i])]--;
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        if (colorArray[i] != "green" && wordCount[(wordSent[i])] != undefined) { // if the letter exists (and it isn't green)
            if (wordCount[(wordSent[i])] > 0) {
                colorArray[i] = "yellow";
                wordCount[(wordSent[i])]--;
            } //
            else {
                colorArray[i] = "gray";
            }
        }
    }
}

function checkWordSent(wordSent, mysteryWord) {
    let mysteryWordArray = splitMysteryWordArray(mysteryWord);
    let colorArray = new Array();

    if (mysteryWordArray != wordSent) {
        for (let i = 0; i < 5; i++) {
            if (mysteryWordArray.includes(wordSent[i])) {
                if (wordSent[i] == mysteryWordArray[i]) {
                    colorArray[i] = "green";
                }
            }
            else {
                colorArray[i] = "gray";
            }
        }

        checkYellowLetters(wordSent, mysteryWordArray, colorArray);
    }
    else {
        for (let i = 0; i < 5; i++) {
            colorArray[i] = "green";
        }
    }

    return colorArray;
}
