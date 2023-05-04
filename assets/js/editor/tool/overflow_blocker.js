function overflow_blocker(){
	overflow_block = !overflow_block;
	
	if(overflow_block) {
		document.querySelector("body").style.overflow = "hidden";	
	} else {
		document.querySelector("body").style.overflow = "auto";
	}
}
