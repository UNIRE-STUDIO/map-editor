const FormantJson = {
  version: 0.1,
 
  make(object_array) {
	  
	return JSON.stringify(object_array);

  },
  
  parse(stringify) {
	  return JSON.parse(stringify);
  }
  
};