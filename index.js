const inputs = document.querySelector(".inputs");
var Zurücksetzenbtn = document.querySelector(".Zurücksetzen");
var Hinweis = document.querySelector (".Hinweis span");

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    let word = ranObj.word;
    console.log(ranObj)

    Hinweis.innerText = ranObj.Hinweis;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += ` <input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}

randomWord();

Zurücksetzenbtn.addEventListener("click", randomWord);

