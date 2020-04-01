<?php
namespace controller;
use \orm\OrmUser;
class ApiController extends Controller {
    function comprobarLogin($login) {
        $orm = new OrmUser;
        $existe = $orm->existeLogin($login);
        echo $existe ? "si" : "no";
    }

    function comprobarSesion($login, $contrasenna) {
        $orm = new OrmUser;
        $error = false;
        if ($orm->existeLogin($login)) {
            $contrasennaValida = $orm->recibirContrasenna($login);
            if (password_verify($contrasenna, $contrasennaValida["contrasenna"])) {
                $_SESSION["login"] = $login;
                $_SESSION["rol"] = $login == "admin" ? 0 : 1;
            } else {
                $error = true;
            }
        } else {
            $error = true;
        }
        echo $error ? "si" :  "no";
    }

    function obtenerEstadisticas($login) {
        header('Content-type: application/json');
        $orm = new OrmUser;
        echo json_encode($orm->obtenerEstadisticas($login));
    }

    function obtenerRanking($tipo) {
        header('Content-type: application/json');
        $orm = new OrmUser;
        //echo var_dump(json_encode($orm->obtenerRanking($tipo)));
        echo json_encode($orm->obtenerRanking($tipo));        
    }
}