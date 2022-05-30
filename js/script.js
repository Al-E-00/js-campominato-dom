/* 
Il computer deve generare 16 numeri casuali compresi nel range della griglia: 
le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - 
abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a 
cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge 
il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba
Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta.
*/

//selezionare livello di gioco per generare griglia

function gameDifficulty() {
    const buttonPlay = getElementById("button-play");
    const gameLevel = document.getElementById("game-difficulty").value;
    
    buttonPlay.addEventListener("click", function(){
        if (gameLevel === "easy") {
            generateGrid(10, 10);
        } else if (gameLevel === "medium") {
            generateGrid(9, 9);
        } else if (gameLevel === "hard") {
            generateGrid(7, 7);
        }
    })
}
gameDifficulty()

//creare una funzione che ci restituisce una griglia

function generateGrid(xCells, yCells) {
    const totalCells = xCells * yCells;

    const newCell = document.createElement("div");

    document.toggle("cell");
}