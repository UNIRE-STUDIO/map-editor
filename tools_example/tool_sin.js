{
    generated_map[map_element];
    var counter = 0, x = 0, y = 0;
    let sdvig = Math.round(prompt('сдвиг на', '5'));
    console.log(sdvig);
    let visota = Math.round(prompt('высота', '5'));
    console.log(visota);
    let hirina = Math.round(prompt('ширина', '5'));
    console.log(hirina);
    var increase = (((sdvig / 2) / sdvig) * Math.PI) / hirina;
    console.log(increase);
    let hag = Math.round(prompt('шаг рендера', '1'));
    console.log(hag);
    let hagov = Math.round(prompt('шагов (по х)', '10'));
    console.log(hagov);
    let hirnost = Math.round(prompt('разборс (жирность)', '1'));
    console.log(hirnost);
    if (sdvig == 0 || visota == 0 || hirina == 0 || hag == 0 || hirnost == 0 || hagov == 0 || typeof selected_tool === 'undefined' || selected_tool == null || selected_tool == 'cursor' || selected_tool == 'lastik') {
        alert('Инструмент не выбран');
    } else {
        for (i = 0; i <= hagov; i = i + hag) {
            if (x > 100) break;
            if (y > 100) break;
            x = i;
            y = (visota) - Math.cos(counter) * visota;
            counter += increase;
            console.log(x, y, counter);
            for (g = 0; g < hirnost; g++) {
                generated_map[map_element].push({
                    't': selected_tool, 'x': Math.abs(Math.floor(x + g) % 100), 'y': Math.abs(Math.floor(y + g) % 100)
                });
                generated_map[map_element].push({
                    't': selected_tool, 'x': Math.abs(Math.round(x + g) % 100), 'y': Math.abs(Math.round(y + g) % 100)
                });
                generated_map[map_element].push({
                    't': selected_tool, 'x': Math.abs(Math.ceil(x + g) % 100), 'y': Math.abs(Math.ceil(y + g) % 100)
                });
            }
        }
        tableCreate();
    }
}