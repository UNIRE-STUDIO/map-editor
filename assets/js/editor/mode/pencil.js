 function startPencilMode(){ 


 function start_draw(e) {

		
	if(pencil_mode === false) {
	pencil_mode = true;
	}
	

	
	if(e.target.className == cellclass) {
	
		e.preventDefault();
		
	let x = e.target.cellIndex;
	let y = e.target.parentNode.rowIndex;
	
	if(e.target.parentNode.rowIndex) {
	


	
		 tableChange(e);
	}
}
}

 function move_draw(e) {

	//console.log({"pencil_mode":pencil_mode, "cellclass":cellclass, "e.target.className":e.target.className});

	if(e.target.className.indexOf(cellclass) != -1) {
	
		e.preventDefault();
		

	let x = e.target.cellIndex;
	let y = e.target.parentNode.rowIndex;
	
//	console.log({"pencil_mode":pencil_mode,"y":y,"x":x,"tool":selected_tool});

	
		
	if(e.target.parentNode.rowIndex >= 0) {
		
	if(pencil_mode === true) {
	
	
		 tableChange(e);
	}
	}

	}
}


 function move_end(e) {


	
	if(pencil_mode === true) {
	pencil_mode = false;
	}
	


	if(e.target.className == cellclass) {
	
	e.preventDefault();
	
	let x = e.target.cellIndex;
	let y = e.target.parentNode.rowIndex;
	
	if(e.target.parentNode.rowIndex >= 0) {
		 tableChange(e);
	}

	}
	
  }



	
//Косание мышка \ перо

document.querySelectorAll("."+ cellclass).forEach(el => el.addEventListener('touchstart',  e => {
		start_draw(e);
}));



document.querySelectorAll("."+ cellclass).forEach(el => el.addEventListener('mousedown', e => {
	start_draw(e);
}));


//Движение мышка \ перо

document.querySelectorAll("."+ cellclass).forEach(el => el.addEventListener('touchmove',  e => {
	move_draw(e);
}));

document.querySelectorAll("."+ cellclass).forEach(el => el.addEventListener('mouseenter', e => {	
	move_draw(e);
 }));


//Стоп мышка \ перо
document.querySelectorAll("."+ cellclass+", body").forEach(el => el.addEventListener('touchcancel',  e => {
	move_end(e);
}));

//Стоп мышка \ перо
//document.querySelectorAll(".mapcell, table").forEach(el => el.addEventListener('touchend',  e => {
//	move_end(e);
//}));

document.querySelectorAll("."+ cellclass+", body").forEach(el => el.addEventListener('mouseup', e => {
	move_end(e);
}));

}