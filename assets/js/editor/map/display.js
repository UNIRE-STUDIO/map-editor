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


	for (index in generated_map) {
		let zelement = generated_map[index];
		try {
		matrix_map[zelement['y']][zelement['x']] = zelement['t'];
		} catch(e) {
			console.log(e);
		}
	}

	return matrix_map;
}
