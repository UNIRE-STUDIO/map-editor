 let ToolElements = [
  {
	  'name':'element1',
	  'description':'Элемент 1',
	//  'icon':'assets/img/element_1.png',
	  'key':'b',
	  'symbol':'=',
	  'color': '#FC00B4'
  },
  {
	  'name':'element2',
	  'description':'Элемент 2',
	 // 'icon':'assets/img/element_2.png',
	  'key':'n',
	  'symbol':'#',
	  'color': '#FC7E00'
   },
   {
	  'name':'element3',
	  'description':'Элемент 3',
	 // 'icon':'assets/img/element_3.png',
	  'key':'m',
	  'symbol':'$',
	  'color': '#85F900'
	  },
  {
	  'name':'element4',
	  'description':'Элемент 4',
	//  'icon':'assets/img/element_4.png',
   	  'key':',',
	  'symbol':'@',
	  'color': '#00F5F9'
  },
  {
	'name':'element5',
	'description':'Элемент 5',
	//'icon':'assets/img/element_5.png',
	'key':'.',
	'symbol':'&',
	'color': '#1000F9'

},
{
  'name':'rectangle',
  'description':'Создать контрур',
  'key':'r',
  'symbol':'',
  'icon':'https://cdn-icons-png.flaticon.com/128/8211/8211536.png',
  'color': '#fff',
  'callback': "{var x = 0,y = 0, i = 0;for (let iz = 0; iz <= size_y; iz++) {i = iz;x = 0;y = i;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});x = size_x-1;y = size_y-1-i;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});}for (let iz = 0; iz <= size_x; iz++) {i = iz;x = i;y = 0;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});x = size_x-1-i;y = size_y-1;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});}tableCreate();}"
}
];