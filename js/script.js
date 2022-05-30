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
L’utente indica un livello di difficoltà in base al quale viene 
generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba
Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta.
*/

//dichiarare elementi prendendoli dall'html
const gridContainer = document.querySelector(".grid-container");
let levelGame = document.getElementById("difficulty-option");
let btnPlay = document.getElementById("play-button");
let punteggio = 0;
let gameOver = false;

// funzione per reset griglia
function cleanGrid () {
    gridContainer.innerHTML = "";
    punteggio = 0;
    gameOver = false;
    totBombs = 0;
}
//funzione per selezionare la difficoltà 
function difficulty () {
        return levelGame.value;
}

//numero delle bombe 
let totBombs = 0;

btnPlay.addEventListener("click", function() {
    // la funzione cleanGrid resetta la griglia
    cleanGrid();

    if (difficulty() === "easy") {
        gameGrid(10, 10);
    } else if (difficulty() === "medium") {
        gameGrid(9, 9);
    } else if (difficulty() === "hard") {
        gameGrid(7, 7);
        }  
    
});

//funzione per generare array con le bombe

function generateBombsList(maxNumber, maxBombsNumber = 16) {
    const bombsList = [];

    if (difficulty() === "easy") {
        totBombs = 16;
    } else if (difficulty() === "medium") {
        totBombs = 14;
    } else if (difficulty() === "hard") {
        totBombs = 12;
    }  

    do {
        const randomNumber = Math.floor(Math.random() * maxNumber);

        if (!bombsList.includes(randomNumber)){
            bombsList.push(randomNumber);
        }
    } while (bombsList.length < totBombs);
    
    return bombsList;
}

//funzione per creare alert quando il gioco finisce
function gameOverAlert() {
    alert("Il gioco è finito. Punteggio totale: " + punteggio);
}


//funzione per creare griglia normale

function gameGrid (xCells, yCells, totBombs) {
    //numero totale di celle da inserire
    const totCells = xCells * yCells;
    
    console.log(totCells);

    //lista che contiene le bombe

    const bombsList = generateBombsList(totCells);

    console.log(bombsList);


    gridContainer.style.width = `calc(var(--cell-size) * ${xCells})`;
    
    //creo le  celle

    for (let i = 1; i <= totCells; i++ ) {
        //creare u n div per una sola cella
        const cell = document.createElement("div");
        //aggiungo la classe cell(stilizzata in CSS)
        cell.classList.add("cell");
        //inseristo il numero all'interno
        cell.textContent = i;
        //creo un attributo data-indice con il numero della cella
        cell.dataset.indice = i;

        

        //aggiungo un event listener sulle celle

        cell.addEventListener("click", function() {
            // se la cella contiene bomb element allora blocco dal premere ulteriori volte

            if(this.classList.contains("bomb") || this.classList.contains("bg-primary") || gameOver){
                return;
            }

            const cellIndex = +this.dataset.indice;

            console.log("Hai cliccato la cella " + +cellIndex);
            
            //controllare se numero della cella cliccata è una bomba
            if(bombsList.includes(cellIndex)){
                cell.classList.remove("flag");
                cell.classList.add("bomb");
                //il gioco è finito
                gameOver = true;

                //mostrare un alert che dice che hai perso

                gameOverAlert();
            } else {
                cell.classList.add("bg-primary");
                //incrementa il punteggio di 1
                punteggio++;
            }
        })

        cell.addEventListener("contextmenu", function(e) {
            e.preventDefault();

            this.classList.toggle("flag");

        })

        //aggiungo le varie caselle tante volte quante il ciclo si ripete
        gridContainer.append(cell);
    }

}