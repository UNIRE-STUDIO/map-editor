
//Импорт
function import_data()
{
    var file = document.getElementById('import');
    if(file.files.length)
    {
        var reader = new FileReader();
        
		reader.onload = function(e)
        {
			generated_map = JSON.parse(e.target.result);
			//displayMap();
			//rerenderEditor();
			tableCreate();
		};
		
        reader.readAsBinaryString(file.files[0]);
    }
}


function import_tools()
{
    var file = document.getElementById('import_tools');
    if(file.files.length)
    {
        var reader = new FileReader();
        
		reader.onload = function(e)
        {
			ToolElements = JSON.parse(e.target.result);
			
			//displayMap();
			//rerenderEditor();

			
		if(typeof generated_map[map_element] !== 'undefined') {
			saveToLocalStorage(var_maps, generated_map);
		}

		if(typeof ToolElements[0] !== 'undefined') {
		saveToLocalStorage(var_tools, ToolElements);
		}
		//window.location.reload();
			loadtools();
			tableCreate();
		};
		
        reader.readAsBinaryString(file.files[0]);
    }
}

//<div title="Количество ячеек" class="tool size_x">
//<label for="size_x"></label>

//<input type="number"  onchange="tableCreate()"id="size_x" name="size_x" value="10">
//</input></div>

//<div title="Количество строк" class="tool size_y">
//<label for="size_y"></label>
//<input type="number"  onchange="tableCreate()" id="size_y" name="size_y" value="10">
//</input></div>

function import_from_local(item, deflt = false) {
		if (localStorage.getItem(item)) {
			let storaged_map = localStorage.getItem(item);
			return JSON.parse(storaged_map);
		} else {
			return deflt;
		}
}

