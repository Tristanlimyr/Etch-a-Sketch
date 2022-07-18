// variables
const defaultColor = 'grey';
const drawColor = 'black';
const container = document.querySelector(".container");

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
createGrid(64);

// hover effect
let mouseDown = false;

// drawing
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
}

