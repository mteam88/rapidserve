<?php
echo("Test begin php running");
$action = "write";//intval($_GET['action']);

if ($action == "read") {
    $fh = fopen('public/php/storage.txt','r');
    while ($line = fgets($fh)) {
        echo($line);
    }
    fclose($fh);
} else if ($action == "write") {
    $fn = "public/php/storage.txt";
    $file = fopen($fn, "a+");
    $size = filesize($fn);

    //if($_GET['line']) fwrite($file, $_GET['line']);
    fwrite($file, 'line');

    $text = fread($file, $size);
    fclose($file);
}
?>