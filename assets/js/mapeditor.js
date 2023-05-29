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

let MoskaParser = FormantMoska;



let JsonParser = FormantJson;

let cellclass = "mapcell";
let tableid = "map";
let default_symbol = '_';


document.addEventListener("DOMContentLoaded", (event) => {

	MoskaParser.setDefaultSymbol(default_symbol); 
	ElementModel.setElements(ToolElements); 
	ElementModel.setDefaultSymbol(default_symbol);

	//Обработка кнопки выбора типа сохранения
	let save_type = document.querySelector("#save_type");
	save_type.addEventListener("change", () => {
		display_type = save_type.value;
		
		
		 displayMap();
	});


	//autosave 60 sec
	setInterval( () => {
		if(typeof generated_map[map_element] !== 'undefined') {
			saveToLocalStorage();
		}
	}, 60000);


	import_from_local();

	levelsloader();

	console.log(generated_map);

//Запуск режима карандаша	
startPencilMode();
});


function clearMap() {
	localStorage.removeItem("mapeditor");

	window.location.reload();
}




//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
///////////////////////// Помойка /////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//Создание карты по размеру
function tableCreate(no_resize = false) {

if(!no_resize)
	sizerecalc();

if(size_y > max_map_size ) {
	size_y = max_map_size;
	document.getElementById("size_y").value = max_map_size;
	alert("max size "+max_map_size+"x"+max_map_size);
} 

if(size_x > max_map_size ) {
	size_x = max_map_size;
	document.getElementById("size_x").value = max_map_size;
	alert("max size "+max_map_size+"x"+max_map_size);
} 

 const tbl = document.getElementById(tableid);
 
 tbl.innerHTML = '';
 

 tbl.style.width = (size_x * 20) + 'px';
 tbl.style.height = (size_y *20) + 'px';

 tbl.style.border = '1px solid #3F3F3F';
  for (let i = 0; i < size_y; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < size_x; j++) {
    
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(` `));
        td.style.border = '1px solid #3F3F3F';
		td.style.width = "15px";
		td.className = cellclass;
		td.id = 'm_'+i+'x'+j;
		td.style.height = "15px";
		td.style.maxWidth = "15px";
		td.style.maxHeight = "15px";
		//при изменении
		td.onclick = function (event) {
			tableChange(event);
		}
  
      }
  }
  
  rerenderEditor();
  startPencilMode();
}
 
function mapSortMode(propOrders) {
        generated_map[map_element].sort(function (a, b) {
            return SortByProps(a, b, propOrders);
        });
}



function colSetStyle(col, selected_tool) {
	let color = ElementModel.elementGetColorByName(selected_tool);
	if(color !== undefined)
	col.style.backgroundColor = color;
}



function tool(name){
	console.log(name);
	if(name == 'cursor')
	selected_tool = undefined;	
	else
	selected_tool = name;
}


function changeMap(index){
	if(typeof generated_map[index] !== 'undefined') {
	map_element = index;
	levelsloader();
	tableCreate();
	}
}


function createMap(){
	generated_map.push([]);
	map_element++;
	levelsloader();
	tableCreate(true);
}

function changeXSize(){
	size_x = document.getElementById("size_x").value;
	displayMap();
	tableCreate(true);
}


function changeYSize(){
	size_y = document.getElementById("size_y").value; 
	displayMap();
	tableCreate(true);
}