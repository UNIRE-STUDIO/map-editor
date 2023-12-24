let var_maps = "mapeditor";
let var_tools = "mapeditor_tools";
let size_y = 10;
let size_x = 10;
let selected_tool = undefined;
let generated_map = [[]];
let display_type = "json";//json
let matrix_map = [];
let custom_map_display = '';
let pencil_mode = false;
let overflow_block = false;
let map_element = 0;
const max_map_size = 300;
let cell_size_x = 15;
let cell_size_y = 15;
let MoskaParser = FormantMoska;
let play = null;
let timer_play = undefined;
let timer_pay_wait = 700;
let JsonParser = FormantJson;

let cellclass = "mapcell";
let tableid = "map";

let default_tools = [
    {
        'name': 'lastik',
        'description': 'Ластик',
        'icon': 'assets/img/lastik.png',
        'key': 'e',
        'symbol': '_',
        'color': undefined
    },
    {
        "callback": () => {
            selected_tool = undefined;
        },
        'name': 'cursor',
        'description': 'Курсор',
        'icon': 'assets/img/cursor.png',
        'key': 'c',
        'symbol': undefined,
        'color': undefined
    }
];

document.addEventListener("DOMContentLoaded", (event) => {


    let ToolElements_check = import_from_local(var_tools, ToolElements);

    if (typeof ToolElements_check !== "undefined") {
        ToolElements = ToolElements_check;
    }

    MoskaParser.setDefaultSymbol(default_tools['symbol']);
    ElementModel.setElements(ToolElements);
    ElementModel.setDefaultSymbol(default_tools['symbol']);

    //Обработка кнопки выбора типа сохранения
    let save_type = document.querySelector("#save_type");
    save_type.addEventListener("change", () => {
        display_type = save_type.value;


        displayMap();
    });


    //autosave 60 sec
    setInterval(() => {
        checkMapCorrect(false);
        if (typeof generated_map[map_element] !== 'undefined') {
            saveToLocalStorage(var_maps, generated_map);
        }

        if (typeof ToolElements[0] !== 'undefined') {
            saveToLocalStorage(var_tools, ToolElements);
        }

    }, 60000);


    generated_map = import_from_local(var_maps, generated_map);

    displayMap();
    tableCreate();
    levelsloader();

    play = getParam('play');
    if (play !== null) {
        alert('Добавлено перенаправление на: ' + play, 'Открытие ссылки', undefined, undefined, 10000);
        default_tools.push({
            'callback': (e) => {
                saveToLocal();
                timer_play = setTimeout(() => {
                        window.location.href = (play + '?map=[[]]');
                    },////Нужно бы закодировать и сжать +(JSON.stringify(generated_map)))
                    timer_pay_wait);
                alert('на: ' + play, 'Перенаправление...', {
                    'text': 'Отмена', 'onclick': () => {
                        clearTimeout(timer_play);
                    }
                }, timer_pay_wait);
                document.querySelector('#tool_playlink').checked = false;
            },
            'name': 'playlink',
            'description': 'Запуск по ссылке',
            'icon': 'assets/img/playlink.png',
            'key': 'p',
            'symbol': undefined,
            'color': undefined
        });
    }

    loadtools();
    console.log(generated_map);
    //Запуск режима карандаша
    startPencilMode();

});


function clearMap() {
    localStorage.removeItem(var_maps);
    localStorage.removeItem(var_tools);

    window.location.reload();
}


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
///////////////////////// Помойка /////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//Создание карты по размеру
function tableCreate(no_resize = false, savetools = false) {
    if (!no_resize)
        sizerecalc();
    if (savetools)
        if (typeof ToolElements[0] !== 'undefined') {
            saveToLocalStorage(var_tools, ToolElements);
        }

    if (size_y > max_map_size) {
        size_y = max_map_size;
        document.getElementById("size_y").value = max_map_size;
        alert("max size " + max_map_size + "x" + max_map_size, undefined, undefined, 10000);
    }

    if (size_x > max_map_size) {
        size_x = max_map_size;
        document.getElementById("size_x").value = max_map_size;
        alert("max size " + max_map_size + "x" + max_map_size, undefined, undefined, 10000);
    }

    const tbl = document.getElementById(tableid);

    tbl.innerHTML = '';

    tbl.style.width = (size_x * (cell_size_x + 5)) + 'px';
    tbl.style.height = (size_y * (cell_size_y + 5)) + 'px';

    for (let i = 0; i < size_y; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < size_x; j++) {

            const td = tr.insertCell();
            td.appendChild(document.createTextNode(` `));
            td.title = i + "x" + j;
            td.className = cellclass;
            td.id = 'm_' + i + 'x' + j;

            //при изменении
            td.onclick = function (event) {
                tableChange(event);
            }

        }
    }

    rerenderEditor();
    startPencilMode();
}

function mapSortMode(propOrders, map = generated_map) {

    map = requceMapArray(map);

    if(map.length >= 1 && map[map_element].length >= 1) {
        map[map_element].sort(function (a, b) {
            return SortByProps(a, b, propOrders);
        });
    }

}

function requceMapArray(map) {

    removeDuplicates(map[map_element], thingsEqual);
    return map;
}


function tool(name, callback = false, draw = false) {





    if (callback) {
//        alert("Идёт выполнение callback...", "Выполнение " + name, undefined, 10);

        if(!draw && (isDefTool(selected_tool) || typeof selected_tool === 'undefined' || selected_tool == null)) {
            console.log("Инструмент не выбран");
        } else
            callback();
        setTimeout(() => {
            checkMapCorrect();
            mapSortMode();
            tableCreate();
        }, 1000);

    }

    if (draw)
        selected_tool = name;
}


function changeMap(index) {
    if (typeof generated_map[index] !== 'undefined') {
        map_element = index;
        levelsloader();
        tableCreate();
        loadtools();
    }
}


function createMap() {
    generated_map.push([]);
    map_element++;

    console.log(generated_map);
    console.log(map_element);

    levelsloader();
    tableCreate(true);
    loadtools();
}

function changeXSize() {
    size_x = document.getElementById("size_x").value;
    displayMap();
    tableCreate(true);
    loadtools();
}


function changeYSize() {
    size_y = document.getElementById("size_y").value;
    displayMap();
    tableCreate(true);
    loadtools();
}


function changeXCellSize() {
    cell_size_x = document.getElementById("cell_size_x").value;
    displayMap();
    tableCreate(true);
    loadtools();
}

function changeYCellSize() {
    cell_size_y = document.getElementById("cell_size_y").value;
    displayMap();
    tableCreate(true);
    loadtools();
}