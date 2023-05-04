
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

