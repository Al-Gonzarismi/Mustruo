<?php
function sanitizar($str) {
    return htmlspecialchars(stripslashes(trim($str)));
}
function cambiarNombreAvatar($img, $login) {
    $nombre =  $login . "_avatar";
    $extension = substr($img, strrpos($img, "."));
    return $nombre . $extension;
}
function guardarAvatar($img) {
    global $URL_PATH;
    $target_dir = "media/avatares/";
    $target_file = $target_dir . basename($img["name"]);
    move_uploaded_file($img["tmp_name"], $target_file);
}
function eliminarAvatar($img) {
    $target_file = "media/avatares/$img";
    unlink($target_file);
}