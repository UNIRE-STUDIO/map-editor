
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

			sizerecalc();
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

function import_from_local() {
		if (localStorage.getItem("mapeditor")) {
			let storaged_map = localStorage.getItem("mapeditor");
			generated_map = JSON.parse(storaged_map);
	
			sizerecalc();
			tableCreate();
		}
}

