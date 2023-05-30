
function tableChange(event) {
	let x = event.target.cellIndex;
	let y = event.target.parentNode.rowIndex;
	let skip = false;

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
	if(typeof selected_tool !== 'undefined' && selected_tool == 'lastik') {
	event.target.style.backgroundColor = "unset";
	for (var index in generated_map[map_element]) {
		if(generated_map[map_element][index].x === x && generated_map[map_element][index].y === y) {
			generated_map[map_element].splice(index, 1);
		}
	}

	}
	
	

	colSetStyle(event.target, selected_tool);	
		
	if(selected_tool.length >= 1 && selected_tool !== 'lastik')
		generated_map[map_element].push({'x': x,'y': y,'t':selected_tool});

	
	}	
	try {
		displayMap();
	} catch(e) {
		alert('Map Error. Fix map size; ' + e.message);
	}

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


async function displayMap() {
//	let result = document.getElementById('result');
//	result.innerHTML = await 
	//mapSortMode({ "x":"asc", "y":"asc"});
	mapSortMode({ "x":"asc", "y":"asc"});

}

async function rerenderEditor() {
	
	
	//Подготовка матричной карты

	matrix_map = GenerateMatrixArray();
	
	
	for(let i = 0; i < matrix_map.length; i++) {
		
		let generated_map_rows = matrix_map[i];

		await ElementModel.setDefaultSymbol(default_symbol);
		await ElementModel.setElements(ToolElements);
		
		//todo: не знаю на что влияет, волялось тут, я иубрал
		//custom_map_display += await ElementModel.elementTransform(generated_map_rows[i]);
		
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
		alert("Элементы выходят за границы карты: " + error_elem);
	}
	
	return matrix_map;
}

function sizerecalc() {

	let syx = size_x;
	let syy = size_y;
	if(typeof generated_map !== 'undefined')
		if(typeof generated_map[map_element] !== 'undefined') 
			if(typeof generated_map[map_element][(generated_map[map_element].length)-1] !== 'undefined') {
	
			syx = generated_map[map_element][(generated_map[map_element].length) -1]['x'] + 1;
			syy = generated_map[map_element][(generated_map[map_element].length) -1]['y'] + 1;  
	}

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