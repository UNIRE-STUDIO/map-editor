const ElementModel = {
	logic_elements: [],
	default_symbol: '_',

	setElements(elements_array) {
        this.logic_elements = elements_array;
	},
	
	setDefaultSymbol(symbol) {
        this.default_symbol = symbol;
	},

	elementTransform(name) {
		if(this.logic_elements.length > 1) {
			for(let i = 0; i < this.logic_elements.length; i++) {
			
				let object = this.logic_elements[i];
				if(name === object['name']) {
					return object['symbol'];
				}
			}
                  return this.default_symbol;
		} else {
			 throw new Error('Elemets not loaded');
		}
  },
	
	elementGetColorByName(name){
			for(let i = 0; i < this.logic_elements.length; i++) {
			
				let object = this.logic_elements[i];
				if(name === object['name']) {
					return object['color'];
				}
			}
			return undefined;
	},

	getElementByKey(key) {
		for(let i = 0; i < this.logic_elements.length; i++) {
		
			let object = this.logic_elements[i];
			if(key === object['key']) {
				return object['name'];
			}
		}
		return undefined;
	}

}