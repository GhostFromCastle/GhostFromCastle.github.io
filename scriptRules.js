let tiles = [];       // Список для хранения костяшек
let freeCell = {      // Координаты свободной ячейки
    y: 3,
    x: 3
};
let shuffled = true ; // Флаг, указывающий, завершено ли перемешивание

// Создадим пустую клетку
function createCellNull() {
    let cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--null");
    return cell;
}

function setCellOffset(cell) {
    cell.style.left = (15 + (15 + 81.25) * cell.x) + "px";
    cell.style.top = (15 + (15 + 81.25) * cell.y) + "px";
}

function appendCell(cell) {
    let field = document.getElementById("field");
    field.appendChild(cell);
}

function createField() {
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            let cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}

function createCellTile() {
    let cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--tile");
    return cell;
}

function shuffleTiles(){
    for (let i = 0; i < 1000; ++i){
        let index = Math.floor(Math.random() * tiles.length);   // Случайный индекс
        tiles[index].click();                                   // Симулируем клик
    }
    shuffled = true; // Устанавливаем флаг перемешивания
}

function createTiles() {
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            let n = y * 4 + x + 1;
            if (n < 16) {
                let cell = createCellTile();
                cell.y = y;
                cell.x = x;
                /* Значение на костяшке */
                cell.innerHTML = n;
                setCellOffset(cell);
                appendCell(cell);
                /* Добавим костяшку */
                tiles.push(cell);
            }
        }
    }
}

function animateTiles() {
    for (let i = 0; i < tiles.length; ++i) {
        tiles[i].addEventListener("click", tileClick);
    }
}

createField()
createTiles()
animateTiles()