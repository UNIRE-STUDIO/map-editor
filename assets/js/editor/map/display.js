
function tableChange(event) {
	let x = event.target.cellIndex;
	let y = event.target.parentNode.rowIndex;
	let skip = false;

	if(!selected_tool) {
		skip = true;
	}
	
	//Игнор занятых элементов
	for (var index in generated_map[map_element]) {
		if(selected_tool.length >= 1  && selected_tool !== 'lastik' && generated_map[map_element][index].x === x && generated_map[map_element][index].y === y) {
			skip = true;
		}
	}
	
	
	
	if(!skip) {
	if(selected_tool && selected_tool == 'lastik') {
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
	document.getElementById('result').innerHTML = 'Map Error. Fix map size';
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
	let result = document.getElementById('result');
	result.innerHTML = await displayMapData(display_type);
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


	for (index in generated_map[map_element]) {
		let zelement = generated_map[map_element][index];
		try {
		matrix_map[zelement['y']][zelement['x']] = zelement['t'];
		} catch(e) {
			console.log(e);
		}
	}

	return matrix_map;
}

function sizerecalc() {
	if(typeof generated_map[map_element][0] !== 'undefined') {
		let syx = generated_map[map_element][(generated_map[map_element].length) -1]['x']; 
		let syy = generated_map[map_element][(generated_map[map_element].length) -1]['y'];

		document.getElementById("size_x").value = size_x = syx + 1; 
		document.getElementById("size_y").value = size_y = syy + 1;   
		
	}
}

function levelsloader() {
	if(typeof generated_map[map_element] !== 'undefined') {
	



		let cmap = document.querySelector("fieldset#cmap");
		let style = '';
		let cmap2 = '';
		cmap.innerHTML = '';
	

		if(ToolElements)
		generated_map.map((x, index) => {
	
			let oelement = ToolElements[index];
	
			let otool = document.createElement('div');
			let input = document.createElement('input');
			let label = document.createElement('label');
		
			let title = 'Map '+index;
			let oname = index;
		//	let icon = 'assets/img/element_1.png';//oelement['icon'];
		
		cmap2 += `
			<div title="` + title +`" class="mapslist map`+ oname +`">
	  <input onchange="changeMap('`+ oname +`')" type="radio" id="map`+ oname +`" value=`+oname+` name="changeMap" />
	  <label for="map`+ oname +`" style="">`+oname+`</label>
	</div>
	`;

			style += `
			input#map`+ oname +` + label {
			background-color: `+pickColor(('map'+new Array(oname + 1).join( oname )))+`;
			}
			input#map`+ oname +`:checked + label {
				opacity: 0.6;
			}
			`;

	});
	cmap.innerHTML = `<style>`+style+`</style>` + cmap2;

	}


	
}