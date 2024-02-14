// Variablen definieren
const inputs = document.querySelector(".inputs");
var Zurücksetzenbtn = document.querySelector(".Zurücksetzen");
var Hinweis = document.querySelector(".Hinweis span");
var ÜbrigeLeben = document.querySelector(".Übrige.Versuche span");
var FalscherBuchstabeContainer = document.querySelector(".Falsche.Buchstaben");
var FalscherBuchstabe = FalscherBuchstabeContainer.querySelector("span");
var Eingabe = document.querySelector(".Eingabe input");
var Punkterhöhung = document.getElementById("guessLetter");

// Initialisierung von Spielvariablen
let word, MaxLeben, incorrects = [], guessedLetters = [];
var playerScore = 0;
let highscore = 0;

// Funktion zur Anzeige einer Nachricht beim Laden der Seite
window.onload = function () {
    var playerName = prompt("Willkommen zum Wortratespiel!\n\nBitte gib deinen Spielername ein:");
    if (playerName !== null && playerName.trim() !== "") {
        document.getElementById('AktuellerSpieler').innerText = playerName;
        alert("Hallo, " + playerName + "!\n\nSpielanleitung: Dies ist ein unterhaltsames Spiel, bei dem du ein geheimes Wort erraten musst. Jedes Mal, wenn du einen Buchstaben eingibst, wird überprüft, ob er im Wort vorkommt. Du hast 10 Leben, also wähle deine Buchstaben klug aus! Dein Ziel ist es, das gesamte Wort zu erraten, bevor deine Leben aufgebraucht sind. Falsche Buchstaben werden angezeigt, und du kannst jederzeit den Spielstand zurücksetzen, um es erneut zu versuchen. Viel Spaß und viel Erfolg beim Raten!");
    } else {
        alert("Du hast keinen gültigen Spielername eingegeben. Die Seite wird neu geladen.");
        location.reload();
    }
};

// Funktion zum Starten des Spiels
function startGame() {
    var playerName = document.getElementById('playerNameInput').value;
    
    if (playerName.trim() !== "") {
        document.getElementById('AktuellerSpieler').innerText = playerName;
    } else {
        alert("Bitte einen Spielername eingeben.");
    }

    var guessLetter = document.getElementById('guessLetter').value.toUpperCase();
}

// Funktion zum Zufälligen Auswählen eines Wortes
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
        html += `<input type="text" id="inputs" disabled>`;
    }
    inputs.innerHTML = html;

    // Reset incorrect letters and guessed letters
    incorrects = [];
    guessedLetters = [];
    FalscherBuchstabe.innerText = "";
}

// Funktion zur Überprüfung, ob ein Buchstabe im Wort existiert
function checkifletterexists() {
    var Eingabe = document.getElementById('guessLetter').value;
    if (Eingabe.length == 1) {
        document.getElementById('guessLetter').innerText = "";
    }
}

// Funktion zum Zurücksetzen des Displays
function clearDisplay() {
    document.getElementById("guessLetter").value = '';
    let Lives = document.querySelector(".Übrige.Versuche span");
    Lives.innerText = "";
    let Worng = document.querySelector(".Falsche.Buchstaben span");
    Worng.innerText = "";
    let Inis = document.querySelector("#inputs");
    Inis.innerHTML = "";
    randomWord();
}

// Funktion zum Überprüfen, ob das Wort komplett geraten wurde
function checkWordGuessed() {
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.indexOf(word[i].toUpperCase()) === -1) {
            return false; // Word not completely guessed
        }
    }
    return true; // All letters guessed correctly
}

// Funktion zum Initialisieren des Spiels
function initGame(e) {
    let key = e.key.toUpperCase();
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
            MaxLeben--;
            ÜbrigeLeben.innerText = MaxLeben;

            if (MaxLeben === 0) {
                gameOver();
            }
        }

        Punkterhöhung.value = "";

        if (checkWordGuessed()) {
            playerScore++;
            console.log(playerScore);
            document.getElementById("playerScore").innerHTML = "Punktzahl: " + playerScore;
            randomWord();
        }
    }
}

// Funktion zum Beenden des Spiels
function gameOver() {
    alert("Game Over!");

    let audio = new Audio ('sounds/glaceon_cry-39075.mp3');
    audio.play();
    
    if (playerScore > highscore) {
        highscore = playerScore;
        document.getElementById("scorehigh").innerHTML = `High Score: ${highscore}`;
        alert("New Highscore! Your score: " + playerScore);
    }

    resetGame();
    pokemon();
    clearDisplay();
}

// Funktion für die Pokemon API
async function pokemon (){
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        const data = await response.json();

        const name = data.name;
        const height = data.height;
        const weight = data.weight;
        const imageUrl = data.sprites.front_default;

        document.getElementById('pokemonInfo').innerHTML = `Game Over! Try again.<br>Your score: ${playerScore}<br>Pokemon Information:<br>Name: ${name}<br>Height: ${height}<br>Weight: ${weight}`;

        document.getElementById('pokemonImage').src = imageUrl;
        openModal();
    } catch (error) {
        console.error("Error fetching Pokemon information:", error);
        alert(`Game Over! Try again.\nYour score: ${playerScore}`);
    }

}

// Funktion zum Öffnen des Modals
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

// Funktion zum Schließen des Modals
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Funktion um das Spiel zurückzusetzen
function resetGame () {
        MaxLeben = 10;
        playerScore = 0;
        document.getElementById("playerScore").innerHTML = "Punktzahl: " + playerScore;
        var playerName = prompt("Willkommen zum Wortratespiel!\n\nBitte gib deinen Spielername ein:");

        if (playerName !== null && playerName.trim() !== "") {
            document.getElementById('AktuellerSpieler').innerText = playerName;
            alert("Hallo, " + playerName + "!\n\nSpielanleitung: Dies ist ein unterhaltsames Spiel, bei dem du ein geheimes Wort erraten musst. Jedes Mal, wenn du einen Buchstaben eingibst, wird überprüft, ob er im Wort vorkommt. Du hast 10 Leben, also wähle deine Buchstaben klug aus! Dein Ziel ist es, das gesamte Wort zu erraten, bevor deine Leben aufgebraucht sind. Falsche Buchstaben werden angezeigt, und du kannst jederzeit den Spielstand zurücksetzen, um es erneut zu versuchen. Viel Spaß und viel Erfolg beim Raten!");
        } else {
            alert("Du hast keinen gültigen Spielername eingegeben. Die Seite wird neu geladen.");
            location.reload();
        }
        console.log("Button Pressed");
        clearDisplay();
}