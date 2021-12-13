<?php
$action = intval($_GET['action']);

if ($action == "read") {
    $fh = fopen('filename.txt','r');
    while ($line = fgets($fh)) {
        echo($line);
    }
    fclose($fh);
} else if ($action == "write") {
    $fn = "storage.txt";
    $file = fopen($fn, "a+");
    $size = filesize($fn);

    if($_POST['addition']) fwrite($file, $_POST['addition']);

    $text = fread($file, $size);
    fclose($file);
}
?>