
let canvasWrapper = document.querySelector(".canvaswrapper")
let imgWrapper = document.querySelector(".imgwrapper")
let squares = document.querySelectorAll(".squares")
let canvasPieces = [];
let emptySquareList = [];
let image = new Image();
image.onload = cutImageUp;
image.src = "bild.png";
let rows = 3;
let columns = 3;
let canvasEl;
function cutImageUp() {
    for(var x = 0; x < columns; ++x) {
        for(var y = 0; y < rows; ++y) {
            canvasEl = document.createElement('canvas');
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

function addEmptySquares(){
    for (let i = 0; i<canvasPieces.length; i++) {
        let emptySquare = document.createElement("div");
        emptySquare.classList.add("squares");
        imgWrapper.appendChild(emptySquare);
        // console.log(canvasPieses[i]);
        emptySquareList.push(emptySquare);
    }
    addEventListnersToWrapper()
}

let elem;
function addEventListnersToPieces(canvasEl) {
    canvasEl.addEventListener("dragstart", (el)=>{
        elem = el.target;
        mouseDown(elem)
    })
}

function addEventListnersToWrapper(){
    
    emptySquareList.forEach(emptySquare => {
        
        emptySquare.addEventListener('dragenter', (e) =>{
            dragEnter(e)
            num1 = emptySquareList.indexOf(emptySquare)
        })
        emptySquare.addEventListener('dragover', (e)=> {
            dragOver(e)
        });
        emptySquare.addEventListener('dragleave', (e)=> {
            dragLeave(e)
        });
        emptySquare.addEventListener('drop', (e) => {
            drop(e)
            

            // console.log(emptySquareList.indexOf(emptySquare));
        });
    });
}

function dragEnter(e) {
    // console.log(e);
    e.preventDefault();
}

function dragOver(e) {
    // console.log(e);
    e.preventDefault();
}

function dragLeave(e) {
    e.preventDefault();
}

let num1;
let num2;

function drop(e) {
    if (num1 === 0 && num2 === 0 || num1 === 1 && num2 === 3 || num1 === 2 && num2 === 6 ||num1 === 3 && num2 === 1 || num1 === 4 && num2 === 4 || num1 === 5 && num2 === 7 || num1 === 6 && num2 === 2 || num1 === 7 && num2 === 5 || num1 === 8 && num2 === 8) {
        console.log("hej");
        let draggedPiece = localStorage.getItem("dragedPiece");
        let addedPiece = document.createElement("div")
        addedPiece.innerHTML = `<img src="${draggedPiece}" style= "width:70px; height:70px;" alt="">`
        localStorage.clear();
        targetEl = e.target;
        targetEl.appendChild(addedPiece);
    } else {
        elem.style.display = "block";
    }
    
    console.log(elem);
}
;
function mouseDown(el) {
    num2 = canvasPieces.indexOf(el);
    localStorage.setItem("dragedPiece", el.innerHTML);
    setTimeout(() => {
        el.style.display = "none";
    }, 0);
    
}

