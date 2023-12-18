{
    generated_map[map_element];
    var counter = 0, x = 0, y = 0;
    let sdvix = Math.round(prompt('сдвиг вправо', '5'));
    let sdviy = Math.round(prompt('сдвиг вниз', '5'));
    if (sdviy == 0 || sdvix == 0 || typeof selected_tool === 'undefined' || selected_tool == null || selected_tool == 'cursor' || selected_tool == 'lastik') {
        alert('Инструмент не выбран');
    } else {

        let template = [{'x': sdvix, 'y': sdviy + 2, 't': selected_tool}, {'x': sdvix, 'y': sdviy + 3, 't': selected_tool}, {
            'x': sdvix + 1, 'y': sdviy + 1, 't': selected_tool
        }, {'x': sdvix + 1, 'y': sdviy + 2, 't': selected_tool}, {'x': sdvix + 1, 'y': sdviy + 3, 't': selected_tool}, {
            'x': sdvix + 1, 'y': sdviy + 4, 't': selected_tool
        }, {'x': sdvix + 2, 'y': sdviy + 1, 't': selected_tool}, {'x': sdvix + 2, 'y': sdviy + 2, 't': selected_tool}, {
            'x': sdvix + 2, 'y': sdviy + 3, 't': selected_tool
        }, {'x': sdvix + 2, 'y': sdviy + 4, 't': selected_tool}, {'x': sdvix + 2, 'y': sdviy + 5, 't': selected_tool}, {
            'x': sdvix + 3, 'y': sdviy + 2, 't': selected_tool
        }, {'x': sdvix + 3, 'y': sdviy + 3, 't': selected_tool}, {'x': sdvix + 3, 'y': sdviy + 4, 't': selected_tool}, {
            'x': sdvix + 3, 'y': sdviy + 5, 't': selected_tool
        }, {'x': sdvix + 3, 'y': sdviy + 6, 't': selected_tool}, {'x': sdvix + 4, 'y': sdviy + 1, 't': selected_tool}, {
            'x': sdvix + 4, 'y': sdviy + 2, 't': selected_tool
        }, {'x': sdvix + 4, 'y': sdviy + 3, 't': selected_tool}, {'x': sdvix + 4, 'y': sdviy + 4, 't': selected_tool}, {
            'x': sdvix + 4, 'y': sdviy + 5, 't': selected_tool
        }, {'x': sdvix + 5, 'y': sdviy + 1, 't': selected_tool}, {'x': sdvix + 5, 'y': sdviy + 2, 't': selected_tool}, {
            'x': sdvix + 5, 'y': sdviy + 3, 't': selected_tool
        }, {'x': sdvix + 5, 'y': sdviy + 4, 't': selected_tool}, {
            'x': sdvix + 6, 'y': sdviy + 2, 't': selected_tool
        }, {'x': sdvix + 6, 'y': sdviy + 3, 't': selected_tool}];

        generated_map[map_element] = [...template, ...generated_map[map_element]];
        tableCreate();
    }
}