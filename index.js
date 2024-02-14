//Sichere Ausführung nach vollständigen Laden der HTML Seite
document.addEventListener("DOMContentLoaded", function(){

    // Ausführung randomword
    randomWord();

    //Ausführung des Zurücksetzen-Buttons
    document.getElementById("Zurücksetzen").addEventListener("click", function(){
        
        //Ausführung resetgame
        resetGame();
    });

    Eingabe.addEventListener("keydown", initGame);
    // document.addEventListener("keydown", () => Eingabe.focus()); 

    console.log(playerScore);
})