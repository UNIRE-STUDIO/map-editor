function loadtools() {
		
	let ctools = document.querySelector("fieldset#tools");
	ctools.innerHTML = '';

	loadtoolsFromElem(ctools,default_tools, 'notrans');
	loadtoolsFromElem(ctools,ToolElements);
	ElementModel.setElements(ToolElements);
	ElementModel.elementLoadColors();
// 	if(typeof ToolElements !== 'undefined')
// 	  for (index in ToolElements) {
// 		let otool = document.createElement('div');
// 		let input = document.createElement('input');
// 		let label = document.createElement('label');
			
// 		let tool = ToolElements[index];

// 		ctools.innerHTML += maketool(tool['name'], tool['description'], tool['color'], tool['icon']);	
// }

}

function maketool(callback,name, description, color, icon = false, aditional_class = false) {
return `
	<div title="` + description +`" class="tool `+(aditional_class?aditional_class:(`tool_`+ name ))+`">
<input onchange="`+callback+`" `+(selected_tool == name ? 'checked' : '')+` type="radio" id="tool_`+ name +`" value=6 name="tool" />
<label for="tool_`+ name +`" style="background`+(icon !== false ? `-image: url('`+icon+`')` : `-color: `+color+`;`)+`"></label>
</div>
`;


}


function loadtoolsFromElem(ctools, toolslist, aditional_class = false) {
	if(typeof toolslist !== 'undefined')
	  for (index in toolslist) {

		
		let tool = toolslist[index];
		let draw = true;

		let callback = (e) => {
			alert('Метод не опредеён #'+ e.targent.id,undefined, undefined, 10000);
		};

		draw = typeof tool['symbol'] === 'undefined' ? false : `'`+tool['symbol']+`'`;


		if((typeof tool['callback'] !== 'undefined')) {

			if(typeof tool['callback'] == 'string' && tool['callback'][0] !== '(') {
				tool['callback'] = '()=>'+tool['callback'];
				console.log('debreacated callback method, please replace {..code..} to ()=>{...code...}');
			}

			callback = `tool('`+ tool['name'] +`',`+tool['callback']+`, `+draw+`)`;
	  }else{
		callback = `tool('`+ tool['name'] +`', false, `+draw+`)`;
	 } 


		let otool = document.createElement('div');
		let input = document.createElement('input');
		let label = document.createElement('label');
		
		ctools.innerHTML += maketool(callback, tool['name'], tool['description'], tool['color'], tool['icon'],aditional_class);
	}
}