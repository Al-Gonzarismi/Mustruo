<?php
namespace controller;
use orm\OrmUser;
class LobbyController extends Controller {
    function lobby() {
        $title = "Lobby";
        if (isset($_SESSION["login"])) {
            $orm = new OrmUser;
            $usuario = $orm->obtenerUsuario($_SESSION["login"]);
            $usuario->estaSentado = $orm->comprobarEstadoUsuario($usuario->login)? true : false;
        } else {
            $usuario = "anonimo";
        }

        echo \dawfony\Ti::render("view/LobbyView.phtml", compact('title', 'usuario'));
    }
}