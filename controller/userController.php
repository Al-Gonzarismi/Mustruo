<?php
namespace controller;
class UserController extends Controller {

    function registro() {
        $title = "Registro";
        $errorLogin = "";
        $errorContrasenha = "";
        $login = "";
        $nombre = "";
        $email = "";
        echo \dawfony\Ti::render("view/RegistroView.phtml", compact('title', 'login', 'nombre', 'email', 'errorLogin', 'errorContrasenha'));
    }

    function perfil($login) {
        echo $login;
    }
}