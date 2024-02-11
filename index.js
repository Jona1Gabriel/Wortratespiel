const inputs = document.querySelector(".inputs");
var Zurücksetzenbtn = document.querySelector(".Zurücksetzen");
var Hinweis = document.querySelector(".Hinweis span");
var ÜbrigeLeben = document.querySelector(".Übrige.Versuche span");
var FalscherBuchstabeContainer = document.querySelector(".Falsche.Buchstaben");
var FalscherBuchstabe = FalscherBuchstabeContainer.querySelector("span");
var Eingabe = document.querySelector(".Eingabe input");

let word, MaxLeben, incorrects = [], guessedLetters = [];


  // Funktion, um das Spiel zu starten (könnte weiter angepasst werden)
function startGame() {
    var playerName = document.getElementById('playerNameInput').value;
    if (playerName.trim() !== "") {
        // Spielername im linken Container aktualisieren
        document.getElementById('AktuellerSpieler').innerText = playerName;
        // closeModal(); // Modal schließen
    } else {
        alert("Bitte einen Spielername eingeben.");
    }
}

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    MaxLeben = 10;
    console.log(word);

    Hinweis.innerText = ranObj.Hinweis;
    ÜbrigeLeben.innerText = MaxLeben;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;

    // Reset incorrect letters and guessed letters
    incorrects = [];
    guessedLetters = [];
    FalscherBuchstabe.innerText = "";
}

function checkifletterexists() {
    // chech if guessLetter holds value != ""
      var Eingabe = document.getElementById('guessLetter').value;
    if (Eingabe.length == 1) {
        document.getElementById('guessLetter').innerText = "";
    }
}


function gameOver() {
    console.log("Game Over!");
    // Add your game over logic here, for example, displaying an alert
    alert("Game Over! Try again.");
    // You can also reset the game if needed
    randomWord();
}

randomWord();

function checkWordGuessed() {
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.indexOf(word[i].toUpperCase()) === -1) {
            return false; // Word not completely guessed
        }
    }
    return true; // All letters guessed correctly
}

function initGame(e) {
    let key = e.key.toUpperCase(); // Convert to uppercase for case-insensitivity
    if (key.match(/^[a-zA-Z]$/) && guessedLetters.indexOf(key) === -1) {
        console.log(key);
        guessedLetters.push(key);

        let found = false;
        for (let i = 0; i < word.length; i++) {
            if (word[i].toUpperCase() === key) {
                inputs.querySelectorAll("input")[i].value = key;
                found = true;
            }
        }
        if (!found) {
            incorrects.push(key);
            FalscherBuchstabe.innerText = incorrects.join(" ");
            // Decrement MaxLeben immediately for each incorrect guess
            MaxLeben--;
            ÜbrigeLeben.innerText = MaxLeben;

            if (MaxLeben === 0) {
                gameOver();
            }
        }
        // Clear the input field
        console.log("remove letter")
        console.log(document.getElementById('guessLetter'))

        // Check if the word is completely guessed
        if (checkWordGuessed()) {
            // Show the next word
            randomWord();
        }
    }
}

Zurücksetzenbtn.addEventListener("click", randomWord);
Eingabe.addEventListener("keydown", initGame);
// document.addEventListener("keydown", () => Eingabe.focus());