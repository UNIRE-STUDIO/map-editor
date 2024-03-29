function saveMap(ctrl = false) {

    checkMapCorrect(false);
    if (typeof generated_map !== 'undefined') {
        saveToLocalStorage(var_maps, generated_map);
    }


    let dataStr = '';
    let dlAnchorElem = document.getElementById('downloadAnchorElem');
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/[-:T.]/g, '').slice(0, -5);

    switch (display_type) {
        case 'custom':
            dataStr = "data:text/moska;charset=utf-8," + encodeURIComponent(displayMapData(display_type));
            dlAnchorElem.setAttribute("download", "scene_"+formattedDate+".moska");
            break;

        default:

            dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(displayMapData(display_type));

            dlAnchorElem.setAttribute("download", "scene_"+formattedDate+".json");
            break;
    }

    dlAnchorElem.setAttribute("href", dataStr);
    if (ctrl)
        dlAnchorElem.click();
};

function saveTools(ctrl = false) {


    if (typeof ToolElements[0] !== 'undefined') {
        saveToLocalStorage(var_tools, ToolElements);
    }

    let dataStr = '';
    let dlAnchorElem = document.getElementById('downloadTools');

    dataStr = "data:text/moska;charset=utf-8," + encodeURIComponent(JsonParser.make(ToolElements));
    dlAnchorElem.setAttribute("download", "tools.json");

    dlAnchorElem.setAttribute("href", dataStr);
    if (ctrl)
        dlAnchorElem.click();
};

function saveToLocal(ctrl = false) {
    if (typeof generated_map !== 'undefined') {
        saveToLocalStorage(var_maps, generated_map);
        alert(var_maps + ' saved', undefined, undefined, 10000);
    }

    if (typeof ToolElements[0] !== 'undefined') {
        saveToLocalStorage(var_tools, ToolElements);
    }
};

function saveToLocalStorage(item, value) {
    localStorage.setItem(item, JSON.stringify(value));
}

