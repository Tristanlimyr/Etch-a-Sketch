// variables
let defaultColor = "rgb(255,255,255)";
let drawColor = "rgb(0,0,0)";
let gridSize = 16;
let mouseDown = false;
const container = document.querySelector(".container");
const resetButton = document.querySelector('.reset');
const eraserButton = document.querySelector('.eraser');
const drawButton = document.querySelector('.draw');
let tool = draw; // default is draw

// creating divs for grid
function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < gridSize; j++) {
            let grid = document.createElement('div');
            grid.classList.add('grid');
            grid.addEventListener('mouseenter', draw);
            row.appendChild(grid);
        }
        container.appendChild(row);
    }
}
createGrid(gridSize);

// draw
function penDown(e) {
    mouseDown = true;
    e.target.style.backgroundColor = drawColor;
    e.target.classList.add('clicked');
}

function penUp(e) {
    mouseDown = false;
}

function draw(e) {
    e.target.style.backgroundColor = drawColor;
    e.target.addEventListener('mousedown', penDown);
    e.target.addEventListener('mouseup', penUp);
    e.target.addEventListener('mouseleave', () => {
        if ((!mouseDown) && (!e.target.classList.contains('clicked'))) {
            e.target.style.backgroundColor = defaultColor;
        }
    });
    if (mouseDown) {
        e.target.classList.add('clicked');
    }
}

// reset
resetButton.addEventListener('click', reset);

function reset() {
    let grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.style.backgroundColor = defaultColor;
    });
}


// grid size
