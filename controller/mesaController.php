<?php

namespace controller;

use orm\OrmMesa;
use objects\Mesa;
use objects\Usuario;

class MesaController extends Controller
{
    function partida($id_mesa)
    {
        global $URL_PATH;
        $title = "Mesa $id_mesa";
        $orm = new OrmMesa;
        if ($orm->existeMesa($id_mesa)) {
            $mesa = $orm->obtenerMesa($id_mesa);
            $usuariosMesa = $orm->obtenerUsuariosMesa($id_mesa);
            for ($i = 0; $i < 4; $i++) {
                if ($usuariosMesa[$i]["login"] == $_SESSION["login"]) {
                    $usuario = new Usuario;
                    $usuario->login = $usuariosMesa[$i]["login"];
                    $usuario->posicion = $usuariosMesa[$i]["posicion"];
                    $usuario->imagen = $usuariosMesa[$i]["imagen"];
                    break;
                }
            }
            if (!isset($usuario)) {
                header("Location: $URL_PATH");                
            }
            foreach ($usuariosMesa as $usu) {
                if ($usu["login"] != $usuario->login) {
                    if (($usu["posicion"] + $usuario->posicion) % 2 == 0) {
                        $compannero = new Usuario;
                        $compannero->login = $usu["login"];
                        $compannero->posicion = $usu["posicion"];
                        $compannero->imagen = $usu["imagen"];
                    } else if (($usuario->posicion + 1) % 4 == $usu["posicion"]) {
                        $rivalDer = new Usuario;
                        $rivalDer->login = $usu["login"];
                        $rivalDer->posicion = $usu["posicion"];
                        $rivalDer->imagen = $usu["imagen"];
                    } else {
                        $rivalIzq = new Usuario;
                        $rivalIzq->login = $usu["login"];
                        $rivalIzq->posicion = $usu["posicion"];
                        $rivalIzq->imagen = $usu["imagen"];
                    }
                }
            }
            echo \dawfony\Ti::render("view/MesaView.phtml", compact('title', 'usuario', 'compannero', 'rivalIzq', 'rivalDer', 'mesa'));
        
        } else {
            header("Location: $URL_PATH");
        }
    }

    function crearMesa()
    {
        global $URL_PATH;
        $orm = new OrmMesa;
        $mesa = new Mesa;
        $mesa->fecha = date('Y-m-d H:i:s');
        $mesa->privacidad_id = $_POST["privacidad"];
        $mesa->contrasenna = $mesa->privacidad_id == 1 ? "" : $_POST["contrasenna"];
        $mesa->juegos =  $_POST["juegos"];
        $mesa->vacas =  $_POST["vacas"];
        $mesa->puntos =  $_POST["puntos"];
        $mesa->login = $_POST["creador"];
        $orm->crearMesa($mesa);
        header("Location: $URL_PATH/mc");
    }
}
