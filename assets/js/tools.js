function loadtools() {
		
	let ctools = document.querySelector("fieldset#tools");
	ctools.innerHTML = '';

	loadtoolsFromElem(ctools,default_tools, 'notrans');
	loadtoolsFromElem(ctools,ToolElements);
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
		tool['callback'] = ((typeof tool['callback'] !== 'undefined') ? tool['callback'] : `tool('`+ tool['name'] +`')`); 
		let otool = document.createElement('div');
		let input = document.createElement('input');
		let label = document.createElement('label');
		
		ctools.innerHTML += maketool(tool['callback'], tool['name'], tool['description'], tool['color'], tool['icon'],aditional_class);
	}
}