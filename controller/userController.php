<?php
namespace controller;
use orm\OrmUser;
class UserController extends Controller {

    /*
    * Método para ir al formulario de registro
    */
    function registro() {
        $title = "Registro";
        $registro = true;
        echo \dawfony\Ti::render("view/RegistroView.phtml", compact('title', 'registro'));
    }

    /*
    * Método para registrar al usuario
    */
    function registrar() {
        global $URL_PATH;
        $orm = new OrmUser;
        $login = sanitizar($_POST["login"]); //Login de registro
        $contrasenna = password_hash($_POST["contrasenna"], PASSWORD_DEFAULT); //Contraseña de registro con HASH
        $email = $_POST["email"]; //Email de registro
        $img = $_FILES["avatar"]; 
        guardarAvatar($img); //Almacenar imagen en carpeta avatares
        $avatar = strlen($img["name"]) > 0 ? $img["name"] : "anonimus.jpg"; //anonimus.jpg por defecto
        if ($orm->registrarUsuario($login, $email, $avatar, $contrasenna)) {
            //OK
        } else {
            //Error Registro
        }
        header("Location: $URL_PATH/");
    }

    /*
    * Método para cerrar sesion
    */
    function cerrarSesion() {
        global $URL_PATH;
        session_destroy();
        header("Location: $URL_PATH/");
    }

    function perfil($login) {
        echo $login;
    }
}