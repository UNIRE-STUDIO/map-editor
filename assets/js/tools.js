document.addEventListener("DOMContentLoaded", (event) => {
	
	let ctools = document.querySelector("fieldset#tools");

	if(ToolElements)
	  for (index in ToolElements) {

		let oelement = ToolElements[index];

		let otool = document.createElement('div');
		let input = document.createElement('input');
		let label = document.createElement('label');
	
		let title = oelement['description'];
		let oname = oelement['name'];
		let icon = oelement['icon'];
	
		ctools.innerHTML += `
		<div title="` + title +`" class="tool `+ oname +`">
  <input onchange="tool('`+ oname +`')" type="radio" id="`+ oname +`" value=6 name="tool" />
  <label for="`+ oname +`" style="background-image: url('`+icon+`')"></label>
</div>
`;
}
});
