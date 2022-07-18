// variables
let defaultColor = "rgb(255,255,255)";
let drawColor = `${document.querySelector('input').value}`;
let shade = "rgb(255,217,119)";
let backgroundColor = "rgb(255, 244, 234)";
let gridSize = getGridSize();
let mouseDown = false;
const box = document.querySelector('.box');
let container = document.querySelector('.container');
const resetButton = document.querySelector('.reset');
const eraserButton = document.querySelector('.eraser');
const drawButton = document.querySelector('.draw');
const colorPicker = document.querySelector('#color-dropper');
const gridSizeForm = document.querySelector('#grid-size-form');

// creating divs for grid
function createGrid(gridSize) {
    box.removeChild(container);
    container = document.createElement('div');
    container.classList.add('container');
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
    box.appendChild(container);

}
createGrid(gridSize);
draw();

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
    drawButton.style.backgroundColor = shade;
    eraserButton.style.backgroundColor = backgroundColor;
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
    drawButton.style.backgroundColor = backgroundColor;
    eraserButton.style.backgroundColor = shade;
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

// color
colorPicker.addEventListener("change", watchColorPicker);

function watchColorPicker(e) {
    drawColor = `${e.target.value}`;
}

// grid size
gridSizeForm.addEventListener("change", changeGridSize);

function changeGridSize(e) {

    location.reload();
}

function getGridSize() {
    let n = document.querySelector("#grid-size-form").value;
    if (Number(n) != NaN) {
        if (Number(n) <= 128 && Number(n) >= 1) {
            return n;
        }
    }
}
