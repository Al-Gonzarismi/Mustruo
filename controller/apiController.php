<?php
namespace controller;
use \orm\OrmUser;
use \orm\OrmMesa;
use objects\Mesa;

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
        echo json_encode($orm->obtenerRanking($tipo));        
    }

    function obtenerUsuariosMesa($id) {
        header('Content-type: application/json');
        $orm = new OrmMesa;
        echo json_encode($orm->obtenerUsuariosMesa($id));
    }

    function obtenerMesas() {
        header('Content-type: application/json');
        $orm = new OrmMesa;
        echo json_encode($orm->obtenerMesas());
    }

    function sentarseEnMesa($id, $pos, $login) {
        $orm = new OrmMesa;
        if ($orm->sentarseEnMesa($id, $pos, $login)) {
            echo "ok";
        } else {
            echo "nook";
        }
    }

    function levantarseDeLaMesa($id, $pos, $login) {
        $orm = new OrmMesa;        
        if ($_SESSION["login"] == $login && $orm->levantarseDeLaMesa($id, $pos, $login)) {
            echo "ok";
        } else {
            echo "te reviento";
        }
    }

    function comprobarEstadoUsuario($login) {
        $orm = new OrmUser; 
        echo $orm->comprobarEstadoUsuario($login)? "sentado" : "no sentado";
    }
    function cambiarEmail($login, $emailCambio) {
        $orm = new OrmUser;
        if ($orm->modificarEmail($login, $emailCambio)) {
            echo 1;
        } else {
            echo 0;
        }
    }

    function cambiarContrasenna($login, $contrasenna) {
        $orm = new OrmUser;
        $contrasenna = password_hash($contrasenna, PASSWORD_DEFAULT);
        if ($orm->modificarContrasenna($login, $contrasenna)) {
            echo 1;
        } else {
            echo 2;
        }
    }
}