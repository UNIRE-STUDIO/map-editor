
function tableChange(event) {
	let x = event.target.cellIndex;
	let y = event.target.parentNode.rowIndex;
	let skip = false;

	console.log(event.target.id);

	if(!selected_tool) {
		skip = true;
	}
	
	//Игнор занятых элементов
	for (var index in generated_map[map_element]) {
		if(typeof selected_tool !== 'undefined' && selected_tool !== 'lastik' && generated_map[map_element][index].x === x && generated_map[map_element][index].y === y) {
			skip = true;
		}
	}
	
	
	
	if(!skip) {
	
	
		colSetStyle(event.target, selected_tool);	
		
		if(typeof selected_tool !== 'undefined' && selected_tool === 'lastik') {
	 event.target.className = 'mapcell';
	for (var index in generated_map[map_element]) {
		if(generated_map[map_element][index].x === x && generated_map[map_element][index].y === y) {
			generated_map[map_element].splice(index, 1);
		}
	}

	}
	
	if(selected_tool.length >= 1 && selected_tool !== 'lastik')
		generated_map[map_element].push({'x': x,'y': y,'t':selected_tool});

	
	}	
	try {
		displayMap();
	} catch(e) {
		alert('Map Error. Fix map size; ' + e.message,undefined, undefined, 10000);
	}

}


function colSetStyle(col, selected_tool) {
	//let color = ElementModel.elementGetColorByName(selected_tool);
//	if(color)
	col.className = 'mapcell'+(selected_tool === '_' ? '' : ' '+selected_tool) ;//.backgroundColor = color;
}

function displayMapData(display_mode) {

	switch(display_mode){
	
	case 'custom':
	
	matrix_map =  GenerateMatrixArray();

	MoskaParser.setElements(ToolElements);
	
	return MoskaParser.make(matrix_map);
	
	break;
	default:
	
	mapSortMode({ "x":"asc", "y":"asc"});
	
	return JsonParser.make(generated_map);
	
	break;
	
	}
}


 function displayMap() {
let result = document.getElementById('result');
	result.innerHTML = displayMapData(display_type);
//		mapSortMode({ "x":"asc", "y":"asc"});
	//mapSortMode({ "x":"asc", "y":"asc"});

}

 function rerenderEditor() {
	
	
	//Подготовка матричной карты

	matrix_map = GenerateMatrixArray();
	
	
	for(let i = 0; i < matrix_map.length; i++) {
		
		let generated_map_rows = matrix_map[i];

		 ElementModel.setDefaultSymbol(default_symbol);
		 ElementModel.setElements(ToolElements);
		
		//todo: не знаю на что влияет, волялось тут, я иубрал
		//custom_map_display +=  ElementModel.elementTransform(generated_map_rows[i]);
		
		let table = document.getElementById("map");
		for (let i = 0, row; row = table.rows[i]; i++) {
			for (let j = 0, col; col = row.cells[j]; j++) {
				if(typeof matrix_map[i] !== 'undefined')  
					if(typeof matrix_map[i][j] !== 'undefined')
						colSetStyle(col, matrix_map[i][j]);
			}	
		}
		
	}
}

function GenerateMatrixArray() {

	let matrix_map = []; 

	for (let i = 0; i <= size_y - 1; i++) {

		let temp = [];
		for (let i = 0; i <= size_x - 1; i++) {
			temp.push('_');
		}

		matrix_map.push(temp);

	}

	let error = false;
	let error_elem = '';
	for (index in generated_map[map_element]) {
		let zelement = generated_map[map_element][index];
		try {
		matrix_map[zelement['y']][zelement['x']] = zelement['t'];
		} catch(e) {
			error = true;
			error_elem += '[x'+zelement['x']+', y:' +zelement['y']+']';
			console.log(e);
		}
	}
	if(error) {
		alert("Элементы выходят за границы карты: " + error_elem,false, 1000);
	}
	
	return matrix_map;
}

function checkMapCorrect(info = true){
	if(info)
	alert("Идёт проверка карты...","Поиск ошибок...", undefined, 1000);
	let error = [false, ''];
	let map_size = generated_map[map_element].length;
	map_size = (map_size % 2 == 0) ? (map_size/2) : (map_size/2)-1;
	for (i = 0; i <= map_size;i++) {
		if(typeof generated_map[map_element][i] !== 'undefined') {
		let zelement = generated_map[map_element][i];
		error = checkMapCorrectAlg(zelement,error);
		if(typeof error[2] !== 'undefined' && error[2] === zelement)
			generated_map[map_element].splice(i, 1);
	}
	
	let iz = map_size-i;
	if(typeof generated_map[map_element][iz] !== 'undefined') {
		let zelement = generated_map[map_element][iz];
		error = checkMapCorrectAlg(zelement,error);
		if(typeof error[2] !== 'undefined' && error[2] === zelement)
			generated_map[map_element].splice(iz, 1);
	}
}

	if(error[0]) {
		if(info)
		alert("Некорректные элементы удалены: " + error[1],undefined,undefined, 1000);
	}
	
}

function checkMapCorrectAlg(zelement, error = [false, '']){
			error[2] = undefined;
			let check = false;
		

			if(typeof zelement['t'] === 'undefined') {
				
				check = true;
			} else if(zelement['t'] === undefined) {
				check = true;
			} else if(zelement['t'] === false) {
				check = true;
			} else if(isDefTool(zelement['t'])) {
				check = true;
			}
		
		if(check) {
			error[0] = true;
			error[1] += JSON.stringify(zelement);	
			error[2] =  zelement;
		}
		
		return error;
}

function isDefTool(toolname){

	let say = false;
	default_tools.map((tool) => {
			if(toolname === tool['name']) {	say = true;return; }		
	});
	return say;
}

function sizerecalc() {
	let temp_map = generated_map;
	let syx = size_x;
	let syy = size_y;
	if(typeof temp_map !== 'undefined')
		if(typeof temp_map[map_element] !== 'undefined') 
			if(typeof temp_map[map_element][(temp_map[map_element].length)-1] !== 'undefined') {
	
				mapSortMode({ "x":"asc"},temp_map);			
			syx = temp_map[map_element][(temp_map[map_element].length) -1]['x'] + 1;

				mapSortMode({ "y":"asc"},temp_map);	
			syy = temp_map[map_element][(temp_map[map_element].length) -1]['y'] + 1;  
	}

	temp_map = undefined;

	document.getElementById("size_x").value = size_x = syx;
	document.getElementById("size_y").value = size_y = syy;
}

function levelsloader() {

		let cmap = document.querySelector("fieldset#cmap");
		let cmap2 = '';
		cmap.innerHTML = '';
	

		if(ToolElements)
		generated_map.map((x, index) => {
	
		
			let title = 'Map '+index;
			let oname = index;
		//	let icon = 'assets/img/element_1.png';//oelement['icon'];
		
		cmap2 += `
			<div title="` + title +`" class="mapslist map_`+ oname +`">
	  <input onchange="changeMap('`+ oname +`')" `+(map_element == index ? 'checked' : '')+` type="radio" id="map_`+ oname +`" value=`+oname+` name="maplev" />
	  <label for="map_`+ oname +`" style="background-color: `+pickColor(('map'+new Array(oname + 1).join( oname )))+`;">`+oname+`</label>
	</div>
	`;

	});
	
	cmap.innerHTML = cmap2;

	
}