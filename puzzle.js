
// vIUnsk19PCR83ZL0lszKpw0e2csjJ_vw6e0dmoMlbeQ acceskey
// Bfo-8nNYkkbnQsBr5kuNRWy60BgfREfEfg-Gjskp2eE secretkey

let canvasWrapper = document.querySelector(".canvaswrapper")
let imgWrapper = document.querySelector(".imgwrapper")
let squares = document.querySelectorAll(".squares")
let body = document.querySelector("body");
let canvasPieces = [];
let emptySquareList = [];
// image.onload = cutImageUp;
// let image = new Image();
// image.onload = cutImageUp;
// image.src = "/bild.png";
let rows = 3;
let columns = 3;
let canvasEl;
let elem;
let num1;
let num2;
let rightPiecesCounter = 0;
let attemptsCounter = 15;
let wonGamesCounter = 0;
let lostGamesCounter = 0;
let playedGamesCounter = 0;
// getImgFromApi()
startGame()
async function getImgFromApi() {
    let randomImg = await fetch( "https://api.unsplash.com/photos/random/?client_id=vIUnsk19PCR83ZL0lszKpw0e2csjJ_vw6e0dmoMlbeQ")
    randomImg = await randomImg.json();
    console.log(randomImg);
    randomImg = await randomImg.links.download;
}


// för att dela bilden
function startGame() {
    canvasPieces = [];
    emptySquareList = [];
    image = new Image();
    image.onload = cutImageUp;
    image.src = "/bild.png";
}

function cutImageUp() {
    for(var x = 0; x < columns; ++x) {
        for(var y = 0; y < rows; ++y) {
            canvasEl = document.createElement("canvas");
            canvasEl.classList.add("pieces");
            canvasEl.setAttribute("draggable", "true")
            canvasEl.style.width = "70px";
            canvasEl.style.height = "70px";
            let widthOfOnePiece = canvasEl.width;
            let heightOfOnePiece = canvasEl.height;
            var context = canvasEl.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvasEl.width, canvasEl.height);
            canvasEl.innerHTML = `${canvasEl.toDataURL()}`;
            canvasWrapper.appendChild(canvasEl);
            addEventListnersToPieces(canvasEl);
            canvasPieces.push(canvasEl)
        }    
    }
    
addEmptySquares()
}

// för att göra tomma rutor att dra bitarna till
function addEmptySquares(){
    imgWrapper.innerHTML = "";
    for (let i = 0; i<canvasPieces.length; i++) {
        let emptySquare = document.createElement("div");
        emptySquare.classList.add("squares");
        imgWrapper.appendChild(emptySquare);
        // console.log(canvasPieses[i]);
        emptySquareList.push(emptySquare);
    }
    addEventListnersToWrapper()
}

// sätta eventlyssnare på bitarna man vill dra
function addEventListnersToPieces(canvasEl) {
    canvasEl.addEventListener("dragstart", (el)=>{
        elem = el.target;
        num2 = canvasPieces.indexOf(elem);
        localStorage.setItem("dragedPiece", elem.innerHTML);
        setTimeout(() => {
            elem.style.opacity = "0.5";
        }, 0);
        
    })
}

// för att sätta eventlyssnare under tiden man drar
function addEventListnersToWrapper(){
    emptySquareList.forEach(emptySquare => {
        emptySquare.addEventListener('dragenter', (e) =>{
            console.log(elem);
            e.preventDefault();
            num1 = emptySquareList.indexOf(emptySquare);
        })
        emptySquare.addEventListener('dragover', (e)=> {
            e.preventDefault();
        });
        emptySquare.addEventListener('dragleave', (e)=> {
            e.preventDefault();
        });
        emptySquare.addEventListener('drop', (e) => {
            drop(e)
        });
    });
    body.addEventListener("ondrop", (e) =>{
        console.log(e);
    })
}

// vad som ska hända när rätt ruta släpps på rätt nummer
function drop(e) {
    if (num1 === 0 && num2 === 0 || num1 === 1 && num2 === 3 || num1 === 2 && num2 === 6 ||num1 === 3 && num2 === 1 || num1 === 4 && num2 === 4 || num1 === 5 && num2 === 7 || num1 === 6 && num2 === 2 || num1 === 7 && num2 === 5 || num1 === 8 && num2 === 8) {
        let draggedPiece = localStorage.getItem("dragedPiece");
        let addedPiece = document.createElement("div")
        addedPiece.innerHTML = `<img src="${draggedPiece}" style= "width:70px; height:70px;" alt="">`
        localStorage.clear();
        targetEl = e.target;
        targetEl.appendChild(addedPiece);
        rightPiecesCounter++;
        attemptsCounter--;
        console.log(rightPiecesCounter);
        gameIsFinished()
        elem.style.display = "none";
        console.log(elem);
    } else {
        attemptsCounter--;
        gameIsFinished()
        elem.style.opacity = "1";
    }
}


function gameIsFinished() {
    let playedGames = document.querySelector(".played-games");
    let wonGames = document.querySelector(".won-games");
    let lostGames = document.querySelector(".lost-games");
    let attempts = document.querySelector(".attempts");
    let endGamePopUp = document.querySelector(".endgame-popup");
    if (rightPiecesCounter >= 9) {
        endGamePopUp.innerHTML = `
        <p>Congratulations! You did it!</p>
        <button class="play-again">Play again!</button>`
        console.log("grattis");
        wonGamesCounter++;
        playedGamesCounter++;
        let newGameBtn = document.querySelector(".play-again");
        newGameBtn.addEventListener("click", () => {
            endGamePopUp.innerHTML = "";
            attemptsCounter = 15;
            rightPiecesCounter = 0;
            playedGames.innerHTML =`Played games: ${playedGamesCounter}`
            wonGames.innerHTML = `Won games: ${wonGamesCounter}`
            attempts.innerHTML = `Attempts left: ${attemptsCounter}`
            startGame()
        })
    }
    if (attemptsCounter === 0) {
        endGamePopUp.innerHTML = `
        <p>Sorry! You lost!</p>
        <button class="play-again">Play again!</button>`
        lostGamesCounter++
        playedGamesCounter++
        let newGameBtn = document.querySelector(".play-again");
        newGameBtn.addEventListener("click", () => {
            endGamePopUp.innerHTML = "";
            rightPiecesCounter = 0;
            attemptsCounter = 15;
            playedGames.innerHTML =`Played games: ${playedGamesCounter}`
            lostGames.innerHTML = `Lost games: ${lostGamesCounter}`
            canvasWrapper.innerHTML = "";
            startGame()
        })
    }
    attempts.innerHTML = `Attempts left: ${attemptsCounter}`
}
