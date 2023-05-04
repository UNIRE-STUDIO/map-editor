function saveMap() {
	let dataStr = '';
let dlAnchorElem = document.getElementById('downloadAnchorElem');

		switch(display_type) {
			case 'custom':
			dataStr = "data:text/moska;charset=utf-8," + encodeURIComponent(displayMapData(display_type));
			dlAnchorElem.setAttribute("download", "scene.moska");
			break;
			
			default:
			
			dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(displayMapData(display_type));
			
			dlAnchorElem.setAttribute("download", "scene.json");
			break;
		}

		dlAnchorElem.setAttribute("href", dataStr);

		dlAnchorElem.click();
};
