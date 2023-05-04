document.querySelector("*").addEventListener('keydown', e => {
  
	let fake_event = new Event('change');
	 
	 if (e.ctrlKey && e.key === 's') {
	   // Prevent the Save dialog to open
	   e.preventDefault();
	   // Place your code here
	   saveMap(true);
   
	 
	 } else if(e.key === 'e') {
		 
		 //Ластик
		 document.getElementById("lastik").checked = true;
		 document.getElementById("lastik").dispatchEvent(fake_event);
		 
	 }
	 
	
	ElementModel.setElements(ToolElements);

	let element_name = ElementModel.getElementByKey(e.key);
	 if(element_name !== undefined) {
	document.getElementById(element_name).checked = true;
	document.getElementById(element_name).dispatchEvent(fake_event);
	 }

   });
