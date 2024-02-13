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
        html += `<input type="text" id="inputs" disabled>`;
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

function clearDisplay() {
    let AktuellerSpieler = document.getElementById("AktuellerSpieler");
    let playerScoreElement = document.getElementById("playerScore");
    let ÜbrigeLeben = document.getElementById("LeftLives");
    let FalscherBuchstabe = document.getElementById("wrongLetters");
    let inputs  = document.getElementById("inputs");

    AktuellerSpieler.value = "";
    playerScore = 0;  // Setzen Sie den Wert der Variable playerScore zurück
    playerScoreElement.innerHTML = `Punktzahl: ${playerScore}`;
    ÜbrigeLeben = 10;
    FalscherBuchstabe = "";
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" id="inputs" disabled>`;
    }
    inputs.innerHTML = html;

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
    }


    async function gameOver() {
        console.log("Game Over!");
        alert("Game Over!")

        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
            const data = await response.json();
    
            // Extract Pokémon information
            const name = data.name;
            const height = data.height;
            const weight = data.weight;
            const imageUrl = data.sprites.front_default;
    
            // Display Pokémon information in the modal
            document.getElementById('pokemonInfo').innerHTML = `Game Over! Try again.<br>Your score: ${playerScore}<br>Pokemon Information:<br>Name: ${name}<br>Height: ${height}<br>Weight: ${weight}`;
    
            // Display the Pokémon image in the modal
            document.getElementById('pokemonImage').src = imageUrl;
    
            // Open the modal
            openModal();
        } catch (error) {
            console.error("Error fetching Pokemon information:", error);
            alert(`Game Over! Try again.\nYour score: ${playerScore}`);
        }
    
        if (playerScore > highscore) {
            highscore = playerScore;
            alert("New Highscore! Your score: " + playerScore);
        }
    
        // You can also reset the game if needed
        randomWord();
    
        // Call the reloadPage function at the end of gameOver
        clearDisplay();
    }
    
    // Function to open the modal
    function openModal() {
        document.getElementById('myModal').style.display = 'block';
    }
    
    // Function to close the modal
    function closeModal() {
        document.getElementById('myModal').style.display = 'none';
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
        let Punkterhöhung = document.getElementById("guessLetter")
        Punkterhöhung.value = "";


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

Zurücksetzenbtn.addEventListener("click", clearDisplay);

Eingabe.addEventListener("keydown", initGame);
// document.addEventListener("keydown", () => Eingabe.focus()); 


console.log(playerScore)