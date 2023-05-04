const FormantMoska = {
  version: 0.1,
  default_symbol: '_',
  start_symbol: "|",
  end_symbol: "|\r\n",
  
   setElements(elements_array) {
        this.logic_elements = elements_array;
  },
  
   setDefaultSymbol(symbol) {
        this.default_symbol = symbol;
  },
  
   setDefaultSymbol(symbol) {
        this.default_symbol = symbol;
  },
  
   setStartSymbol(symbol) {
        this.start_symbol = symbol;
  },
  
   setEndSymbol(symbol) {
        this.end_symbol = symbol;
  },
  
  elementTransform(name) {
      ElementModel.setElements(this.logic_elements);
      ElementModel.setDefaultSymbol(this.default_symbol);
      return ElementModel.elementTransform(name);
  },
  
  make(matrix_map) {
	let custom_map_display = '';
	
	for(let i = 0; i < matrix_map.length; i++) {
		custom_map_display += this.start_symbol;

		let generated_map_rows = matrix_map[i];
		for(let j = 0; j < generated_map_rows.length; j++) {
			custom_map_display += this.elementTransform(generated_map_rows[j]);
		}
		custom_map_display += this.end_symbol;	
	}
	return custom_map_display;
  },
  

  parse(stringify) {
	  return stringify;
  }
  
};