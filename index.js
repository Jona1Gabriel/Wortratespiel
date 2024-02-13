//Variablen definieren
const inputs = document.querySelector(".inputs");
var Zurücksetzenbtn = document.querySelector(".Zurücksetzen");
var Hinweis = document.querySelector(".Hinweis span");
var ÜbrigeLeben = document.querySelector(".Übrige.Versuche span");
var FalscherBuchstabeContainer = document.querySelector(".Falsche.Buchstaben");
var FalscherBuchstabe = FalscherBuchstabeContainer.querySelector("span");
var Eingabe = document.querySelector(".Eingabe input");

//Initialisierung von Spielvariablen
let word, MaxLeben, incorrects = [], guessedLetters = [];
let playerScore = 0;
let highscore = 0;

window.onload = function () {

    //Nachricht beim Laden der Seite
    var playerName = prompt("Willkommen zum Wortratespiel!\n\nBitte gib deinen Spielername ein:");

    // Überprüfen, ob der Spieler einen Namen eingegeben hat
    if (playerName !== null && playerName.trim() !== "") {

        // Spielername im linken Container aktualisieren
        document.getElementById('AktuellerSpieler').innerText = playerName;

        // Starte das Spiel oder zeige weitere Anweisungen an
        alert("Hallo, " + playerName + "!\n\nSpielanleitung: Dies ist ein unterhaltsames Spiel, bei dem du ein geheimes Wort erraten musst. Jedes Mal, wenn du einen Buchstaben eingibst, wird überprüft, ob er im Wort vorkommt. Du hast 10 Leben, also wähle deine Buchstaben klug aus! Dein Ziel ist es, das gesamte Wort zu erraten, bevor deine Leben aufgebraucht sind. Falsche Buchstaben werden angezeigt, und du kannst jederzeit den Spielstand zurücksetzen, um es erneut zu versuchen. Viel Spaß und viel Erfolg beim Raten!");

    } else {

        // Spieler hat keinen Namen eingegeben
        alert("Du hast keinen gültigen Spielername eingegeben. Die Seite wird neu geladen.");
        location.reload();
    }
};

function startGame() {

    //Liest aus Feld `playerNameInput` den Namen des Spielers und speichert ihn in `playerName`.
    var playerName = document.getElementById('playerNameInput').value;
    
    //prüft ob `playername`nicht einem leeren string entspicht
    if (playerName.trim() !== "") {

        // Spielername im linken Container aktualisieren
        document.getElementById('AktuellerSpieler').innerText = playerName;
    
    } else {

        //Anzeige wird ausgegeben
        alert("Bitte einen Spielername eingeben.");
    }

    // Überprüfe, ob der eingegebene Buchstabe im Wort enthalten ist
    var guessLetter = document.getElementById('guessLetter').value.toUpperCase();
    
    // Punktzahl bei richtig geratenen Wort um 100 erhöhen
    if (checkWordGuessed(guessLetter)) {
        playerScore += 100;
        console.log(playerScore)
        updateScoreDisplay();
    }
}

function updateScoreDisplay() {

    //Liest aus Feld `playerScore` den Namen des Spielers und speichert ihn in `scoreElement`.
    //const scoreElement = document.getElementById('playerScore');
    document.getElementById("playerScore").innerHTML = `Punktzahl: ${playerScore}`;
    //
    //scoreElement.textContent = `Punktzahl: ${playerScore}`;
}



function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;

    if (typeof MaxLeben === 'undefined') {
        MaxLeben = 10;
        ÜbrigeLeben.innerText = MaxLeben;
    }

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

    // Call the reloadPage function at the end of gameOver
    reloadPage();
}

// Define the reloadPage function outside of gameOver
function reloadPage() {
    location.reload();
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
        let Sui = document.getElementById("guessLetter")
        Sui.value = "";


        // Check if the word is completely guessed
        if (checkWordGuessed()) {
            playerScore++
            console.log(playerScore)
            document.getElementById("playerScore").innerHTML = "Punktzahl: " +playerScore
            // Show the next word
            randomWord();
        }
    }
}

Zurücksetzenbtn.addEventListener("click", reloadPage);

Eingabe.addEventListener("keydown", initGame);
// document.addEventListener("keydown", () => Eingabe.focus()); 

function reloadPage() {
    location.reload();
}

console.log(playerScore)