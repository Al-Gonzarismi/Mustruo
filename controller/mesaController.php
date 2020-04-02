<?php
namespace controller;

use DateTime;
use orm\OrmMesa;
use objects\Mesa;

class MesaController extends Controller {
    function partida($id_mesa) {
        //TO DO
        echo "$id_mesa";
    }

    function crearMesa() {
        global $URL_PATH;
        $orm = new OrmMesa;
        $mesa = new Mesa;
        $mesa->fecha = date('Y-m-d H:i:s');
        if ($_POST["privacidad"] == "publica") {
            $mesa->privacidad_id = 1;
            $mesa->contrasenna = "";
        } else {
            $mesa->privacidad_id = 0;
            $mesa->contrasenna = $_POST["contrasenna"];
        }
        $mesa->juegos =  $_POST["juegos"];
        $mesa->vacas =  $_POST["vacas"];
        $mesa->puntos =  $_POST["puntos"];
        $mesa->login = $_POST["creador"];
        $orm->crearMesa($mesa);
        header("Location: $URL_PATH");        

    }
}