// variables
let defaultColor = "rgb(255,255,255)";
let drawColor = "rgb(0,0,0)";
let gridSize = 64;
let mouseDown = false;
const container = document.querySelector(".container");
const resetButton = document.querySelector('.reset');
const eraserButton = document.querySelector('.eraser');
const drawButton = document.querySelector('.draw');

// creating divs for grid
function createGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < gridSize; j++) {
            let grid = document.createElement('div');
            grid.classList.add('grid');
            row.appendChild(grid);
        }
        container.appendChild(row);
    }
}
createGrid(gridSize);

// draw
drawButton.addEventListener('click', draw);

function penDown(e) {
    mouseDown = true;
    e.target.style.backgroundColor = drawColor;
    e.target.classList.add('clicked');
}

function penUp(e) {
    mouseDown = false;
}

function hover(e) {
    if ((!mouseDown) && (!e.target.classList.contains('clicked'))) {
        e.target.style.backgroundColor = defaultColor;
    }
}

function pen(e) {
    e.target.style.backgroundColor = drawColor;
    e.target.addEventListener('mousedown', penDown);
    e.target.addEventListener('mouseup', penUp);
    e.target.addEventListener('mouseleave', hover);
    if (mouseDown) {
        e.target.classList.add('clicked');
    }
}

function draw(e) {
    mouseDown = false;
    let grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.removeEventListener('mouseenter', eraser);
        grid.removeEventListener('mousedown', eraserDown);
        grid.removeEventListener('mouseup', eraserUp);
        grid.addEventListener('mouseenter', pen);
    });
}

// erase
eraserButton.addEventListener('click', erase);

function eraserDown(e) {
    mouseDown = true;
    e.target.style.backgroundColor = defaultColor;
    e.target.classList.remove('clicked');
}

function eraserUp(e) {
    mouseDown = false;
}

function eraser(e) {
    e.target.addEventListener('mousedown', eraserDown);
    e.target.addEventListener('mouseup', eraserUp);
    if (mouseDown) {
        e.target.style.backgroundColor = defaultColor;
        e.target.classList.remove('clicked');
    }
}

function erase(e) {
    mouseDown = false;
    let grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.removeEventListener('mouseenter', pen);
        grid.removeEventListener('mousedown', penDown);
        grid.removeEventListener('mouseup', penUp);
        grid.removeEventListener('mouseleave', hover);
        grid.addEventListener('mouseenter', eraser);
    });

}

// reset
resetButton.addEventListener('click', reset);

function reset() {
    let grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.style.backgroundColor = defaultColor;
        grid.classList.remove('clicked');
    });
}

// grid size
