let ToolElements = [
    {
        "name": "element1",
        "description": "Элемент 1",
        "key": "b",
        "symbol": "=",
        "color": "#10454F",
        "callback": "tool('element1')",
        "type":"element"
    },
    {
        "name": "element2",
        "description": "Элемент 2",
        "key": "n",
        "symbol": "#",
        "color": "#506266",
        "callback": "tool('element2')",
        "type":"element"
    },
    {
        "name": "element3",
        "description": "Элемент 3",
        "key": "m",
        "symbol": "$",
        "color": "#818274",
        "callback": "tool('element3')",
        "type":"element"
    },
    {
        "name": "element4",
        "description": "Элемент 4",
        "key": ",",
        "symbol": "@",
        "color": "#A3AB78",
        "callback": "tool('element4')",
        "type":"element"
    },
    {
        "name": "element5",
        "description": "Элемент 5",
        "key": ".",
        "symbol": "&",
        "color": "#BDE038",
        "callback": "tool('element5')",
        "type":"element"
    },
    {
        "name": "rectangle",
        "description": "Создать контрур",
        "key": "r",
        "symbol": "",
        "icon": "https://cdn-icons-png.flaticon.com/128/8211/8211536.png",
        "color": "#fff",
        "callback": "{var x = 0,y = 0, i = 0;for (let iz = 0; iz <= size_y; iz++) {i = iz;x = 0;y = i;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});x = size_x-1;y = size_y-1-i;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});}for (let iz = 0; iz <= size_x; iz++) {i = iz;x = i;y = 0;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});x = size_x-1-i;y = size_y-1;generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x)% size_x),'y':Math.abs(Math.round(y) % size_y)});}tableCreate();}",
        "type":"function"
    },
    {
        "name": "sin",
        "description": "Создать синусоиду",
        "key": "",
        "symbol": "",
        "icon": "https://cdn-icons-png.flaticon.com/128/8211/8211536.png",
        "color": "#fff",
        "callback": "{generated_map[map_element];var counter = 0,x = 0,y = 0; let sdvig = Math.round(prompt('сдвиг на', '5')); console.log(sdvig); let visota = Math.round(prompt('высота', '5')); console.log(visota); let hirina = Math.round(prompt('ширина', '5')); console.log(hirina);var increase = (((sdvig/2) / sdvig) * Math.PI) / hirina; console.log(increase); let hag = Math.round(prompt('шаг рендера', '1')); console.log(hag); let hagov = Math.round(prompt('шагов (по х)', '10')); console.log(hagov); let hirnost = Math.round(prompt('разборс (жирность)', '1')); console.log(hirnost); if(sdvig == 0 ||visota == 0 ||hirina == 0 ||hag == 0 ||hirnost == 0 ||hagov == 0 || typeof selected_tool === 'undefined' || selected_tool == null || selected_tool == 'cursor' || selected_tool == 'lastik') { alert('Инструмент не выбран'); } else { for (i = 0; i <= hagov; i = i + hag) { if(x > 100) break; if(y > 100) break;  x = i;  y = (visota) - Math.cos(counter) * visota;  counter += increase; console.log(x,y,counter);   for (g = 0; g < hirnost; g++) {   generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.floor(x + g) % 100),'y':Math.abs(Math.floor(y + g) % 100)});  generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.round(x + g) % 100),'y':Math.abs(Math.round(y + g) % 100)});  generated_map[map_element].push({'t':selected_tool, 'x':Math.abs(Math.ceil(x + g) % 100),'y':Math.abs(Math.ceil(y + g) % 100)});  } }  tableCreate(); }}",
        "type":"function"
    },
    {
        "name": "heart",
        "description": "Создать сердечко",
        "key": "",
        "symbol": "",
        "icon": "https://sun9-20.userapi.com/impf/c636931/v636931669/20bbc/G3zqkS9tfGc.jpg?size=232x217&quality=96&sign=fe2e2f54627b3ca89b421f385a3595f6&c_uniq_tag=QlEcpK65NWBkIhnaQb3N-L0h1Y8LHNouAxyrtf2kGfg&type=album",
        "color": "#fff",
        "callback": "{ generated_map[map_element]; var counter = 0, x = 0, y = 0; let move_x = Math.round(prompt('сдвиг вправо', '5')); let move_y = Math.round(prompt('сдвиг вниз', '5')); if (move_y== null || move_x == null || typeof selected_tool === 'undefined' || selected_tool == null || selected_tool == 'cursor' || selected_tool == 'lastik') { alert('Инструмент не выбран'); } else { let template = [{'x':move_x,'y':move_y + 1,'t':selected_tool},{'x':move_x,'y':move_y + 2,'t':selected_tool},{'x':move_x + 1,'y':move_y,'t':selected_tool},{'x':move_x + 1,'y':move_y + 1,'t':selected_tool},{'x':move_x + 1,'y':move_y + 2,'t':selected_tool},{'x':move_x + 1,'y':move_y + 3,'t':selected_tool},{'x':move_x + 2,'y':move_y,'t':selected_tool},{'x':move_x + 2,'y':move_y + 1,'t':selected_tool},{'x':move_x + 2,'y':move_y + 2,'t':selected_tool},{'x':move_x + 2,'y':move_y + 3,'t':selected_tool},{'x':move_x + 2,'y':move_y + 4,'t':selected_tool},{'x':move_x + 3,'y':move_y + 1,'t':selected_tool},{'x':move_x + 3,'y':move_y + 2,'t':selected_tool},{'x':move_x + 3,'y':move_y + 3,'t':selected_tool},{'x':move_x + 3,'y':move_y + 4,'t':selected_tool},{'x':move_x + 3,'y':move_y + 5,'t':selected_tool},{'x':move_x + 4,'y':move_y,'t':selected_tool},{'x':move_x + 4,'y':move_y + 1,'t':selected_tool},{'x':move_x + 4,'y':move_y + 2,'t':selected_tool},{'x':move_x + 4,'y':move_y + 3,'t':selected_tool},{'x':move_x + 4,'y':move_y + 4,'t':selected_tool},{'x':move_x + 5,'y':move_y,'t':selected_tool},{'x':move_x + 5,'y':move_y + 1,'t':selected_tool},{'x':move_x + 5,'y':move_y + 2,'t':selected_tool},{'x':move_x + 5,'y':move_y + 3,'t':selected_tool},{'x':move_x + 6,'y':move_y + 1,'t':selected_tool},{'x':move_x + 6,'y':move_y + 2,'t':selected_tool}]; generated_map[map_element] = [...template, ...generated_map[map_element]]; tableCreate(); }}",
        "type":"function"
    }
];