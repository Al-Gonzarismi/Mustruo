<?php
function sanitizar($str) {
    return htmlspecialchars(stripslashes(trim($str)));
}
function guardarAvatar($img) {
    global $URL_PATH;
    $target_dir = "media/avatares/";
    $target_file = $target_dir . basename($img["name"]);
    move_uploaded_file($img["tmp_name"], $target_file);
}