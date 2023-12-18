<?php

include_once 'libs/cmd_processor.php';

$json_default = <<<JSON
[[{"x":0,"y":1,"t":"element1"},{"x":0,"y":2,"t":"element1"},{"x":1,"y":0,"t":"element1"},{"x":1,"y":1,"t":"element1"},{"x":1,"y":2,"t":"element1"},{"x":1,"y":3,"t":"element1"},{"x":2,"y":0,"t":"element1"},{"x":2,"y":1,"t":"element1"},{"x":2,"y":2,"t":"element1"},{"x":2,"y":3,"t":"element1"},{"x":2,"y":4,"t":"element1"},{"x":3,"y":1,"t":"element1"},{"x":3,"y":2,"t":"element1"},{"x":3,"y":3,"t":"element1"},{"x":3,"y":4,"t":"element1"},{"x":3,"y":5,"t":"element1"},{"x":4,"y":0,"t":"element1"},{"x":4,"y":1,"t":"element1"},{"x":4,"y":2,"t":"element1"},{"x":4,"y":3,"t":"element1"},{"x":4,"y":4,"t":"element1"},{"x":5,"y":0,"t":"element1"},{"x":5,"y":1,"t":"element1"},{"x":5,"y":2,"t":"element1"},{"x":5,"y":3,"t":"element1"},{"x":6,"y":1,"t":"element1"},{"x":6,"y":2,"t":"element1"}]]
JSON;

/**
 * @return string
 */
function GenerateTool($template)
{
    return strtr(
        <<<JS
{
    generated_map[map_element];
    var counter = 0, x = 0, y = 0;
    let move_x = Math.round(prompt('сдвиг вправо', '5'));
    let move_y = Math.round(prompt('сдвиг вниз', '5'));
    if (move_y== null || move_x == null || typeof selected_tool === 'undefined' || selected_tool == null || selected_tool == 'cursor' || selected_tool == 'lastik') {
        alert('Инструмент не выбран');
    } else {
        let template = {$template};
        generated_map[map_element] = [...template, ...generated_map[map_element]];
        tableCreate();
    }
}
JS
        , ["\r\n" => '']);
}

//GenerateTool();

$tool_scheme = [
    "name" => "heart",
    "description" => "Создать сердечко",
    "key" => "",
    "symbol" => "",
    "icon" => "https://sun9-20.userapi.com/impf/c636931/v636931669/20bbc/G3zqkS9tfGc.jpg?size=232x217&quality=96&sign=fe2e2f54627b3ca89b421f385a3595f6&c_uniq_tag=QlEcpK65NWBkIhnaQb3N-L0h1Y8LHNouAxyrtf2kGfg&type=album",
    "color" => "#fff",
    "callback" => ""
];

echo "Генератор шаблонов для map-editor" . PHP_EOL;

$tool_scheme['name'] = prompt('Введите название инструмента на английском одни словом') ?? $tool_scheme['name'];
$tool_scheme['description'] = prompt('Введите описание инструмента') ?? $tool_scheme['description'];
$tool_scheme['key'] = prompt('Введите клавишу, по которой инструмент будет запускаться') ?? $tool_scheme['key'];
$tool_scheme['symbol'] = prompt('Введите символ инструмента для отображения в формате moska') ?? $tool_scheme['symbol'];
$tool_scheme['icon'] = prompt('Введите url изображения для инструмента') ?? $tool_scheme['icon'];
$tool_scheme['color'] = prompt('Введите цвет инструмента, пример: #fff') ?? $tool_scheme['color'];

$clear_color = prompt('Сделать монотонным? (Y/N)') == 'Y' ? true : false;

$json_template = prompt('Вставьте json карты шаблона') ?? $json_default;

$file_name = 'tool_' . $tool_scheme['name'] . '.json';

echo "Начинаю создавать файл tool_" . $file_name . PHP_EOL;


$json_template = json_decode($json_template, true);

$elements = [];
foreach ($json_template[0] as $element) {
    //{"x":0,"y":1,"t":"element1"}
    $elements[] = [
        'x' => isset($element['x']) && !empty($element['x']) ? '|move_x + ' . $element['x'] . '|' : '|move_x|',
        'y' => isset($element['y']) && !empty($element['y']) ? '|move_y + ' . $element['y'] . '|' : '|move_y|',
        't' => !$clear_color ? (isset($element['t']) && !empty($element['t']) ? $element['t'] : '|selected_tool|') : '|selected_tool|',
    ];
}

$elements = strtr(json_encode($elements, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), ['"' => "'"]);

$tool_scheme['callback'] = GenerateTool($elements);

file_put_contents($file_name, preg_replace('/(\'\|)|(\|\')/', '', preg_replace('/\s\s+/', ' ', json_encode($tool_scheme, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))));

echo " Успешно " . PHP_EOL;

