let tiles = [];       // Список для хранения костяшек
let freeCell = {      // Координаты свободной ячейки
    y: 3,
    x: 3
};
let shuffled = false; // Флаг, указывающий, завершено ли перемешивание
let timeLeft = 300; // Начальное время таймера в секундах
let timerId;

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

function between(a, b, t) {
    return a <= t && t <= b || b <= t && t <= a;
}

function tileClick(event) {
    let bar = event.target;
    /* Сохраним старые координаты ячейки */
    let oldX = bar.x,
        oldY = bar.y;
    /* Проверяем, если ячейки находятся на одной строке */
    if (bar.y === freeCell.y) {
        for (let i = 0; i < tiles.length; ++i) {
            let tile = tiles[i];
            if (tile.y === bar.y && between(bar.x, freeCell.x, tile.x)) {
                if (bar.x < freeCell.x) tile.x += 1;
                else tile.x -= 1;
                setCellOffset(tile);
            }
        }
        freeCell = {
            y: oldY,
            x: oldX
        }
    }
        else if (bar.x === freeCell.x) {
            for (let i = 0; i < tiles.length; ++i) {
                let tile = tiles[i];
                if (tile.x === bar.x && between(bar.y, freeCell.y, tile.y)) {
                    if (bar.y < freeCell.y) tile.y += 1;
                    else tile.y -= 1;
                    setCellOffset(tile);
                }
            }
            freeCell = {
                y: oldY,
                x: oldX
            }
    }

    // Если мы не в стадии перемешивания - проверяем, собрана ли головоломка
    if (shuffled){
        checkVictory(); // Проверяем победу
    }

    function checkVictory() {
        for (let i = 0; i < tiles.length; ++i) {
            let n = tiles[i].y * 4 + tiles[i].x + 1; // Правильный номер позиции
            // Нестрогое сравнение, т.к. innerHTML = строка
            if (tiles[i].innerHTML !=n) return; // Если костяшка не на месте, выход
         }
         document.getElementById("modal").classList.add("modal--visible"); // Показываем модальное окно
         clearInterval(timerId); // Останавливаем таймер
    }
}



let startTime, updatedTime, difference, tInterval;

function startTimer() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const milliseconds = Math.floor((difference % 1000) / 1);
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    const display = document.getElementById("display");
    display.textContent = 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds + ":" + 
        (milliseconds < 10 ? "0" : milliseconds < 100 ? "0" : "") + milliseconds;
}

// Запуск таймера через 1 секунду после загрузки страницы
window.onload = function() {
    setTimeout(startTimer, 1000);
};

createField()
createTiles()
animateTiles()
shuffleTiles()
getShowTime()
startTimer ()