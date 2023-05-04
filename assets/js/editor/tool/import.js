
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
			displayMap();
			rerenderEditor();
		};
		
        reader.readAsBinaryString(file.files[0]);
    }
}

function import_from_local() {
		if (localStorage.getItem("map")) {
			let storaged_map = localStorage.getItem("map");
			generated_map = JSON.parse(storaged_map);
			displayMap();
			rerenderEditor();
		}
}

