<?php

function prompt($text)
{
    echo $text, PHP_EOL;
    $handle = fopen("php://stdin", "r");
    $line = fgets($handle);
    $line = strtr($line, ["\r\n" => '', "\n" => '', "\r" => '']);
    return trim($line) && !empty($line) ? $line : null;
}