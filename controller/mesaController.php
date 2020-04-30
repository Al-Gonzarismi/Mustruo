<?php

namespace controller;

use DateTime;
use orm\OrmMesa;
use objects\Mesa;

class MesaController extends Controller
{
    function partida($id_mesa)
    {
        //TO DO
        $title = "Partida";
        echo \dawfony\Ti::render("view/MesaView.phtml", compact('title'));
    }

    function crearMesa()
    {
        global $URL_PATH;
        $orm = new OrmMesa;
        $mesa = new Mesa;
        $mesa->fecha = date('Y-m-d H:i:s');
        $mesa->privacidad_id = $_POST["privacidad"];
        $mesa->contrasenna = $mesa->privacidad_id == 1? "": $_POST["contrasenna"];
        $mesa->juegos =  $_POST["juegos"];
        $mesa->vacas =  $_POST["vacas"];
        $mesa->puntos =  $_POST["puntos"];
        $mesa->login = $_POST["creador"];
        $orm->crearMesa($mesa);
        header("Location: $URL_PATH/mc");
    }
}
