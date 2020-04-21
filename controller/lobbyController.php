<?php
namespace controller;
use orm\OrmUser;
class LobbyController extends Controller {
    function lobby($arg = "principal") {
        $title = "Lobby";        
        if (isset($_SESSION["login"])) {
            $orm = new OrmUser;
            $usuario = $orm->obtenerUsuario($_SESSION["login"]);
            $estado = $orm->comprobarEstadoUsuario($usuario->login);
            $usuario->estaSentado = $estado["posicion"] >= 0;
            $usuario->posicion = $estado["posicion"];
            $usuario->mesa_id = $usuario->estaSentado ? $estado["mesa_id"] : -1;
        } else {
            $usuario = "anonimo";
        }

        echo \dawfony\Ti::render("view/LobbyView.phtml", compact('title', 'usuario', 'arg'));
    }
}