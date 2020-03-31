<?php
namespace orm;
use \dawfony\Klasto;
class OrmUser {
    function existeLogin($login) {
        $bd = Klasto::getInstance();
        $params = [$login];
        $sql = "SELECT login FROM usuario WHERE login = ?";
        return $bd->queryOne($sql, $params);
    }

    public function registrarUsuario($login, $email, $avatar, $contrasenna) {
        $bd = Klasto::getInstance();
        $rol_id = 1;
        $params = [$login, $email, $avatar, $contrasenna, $rol_id];
        $sql = "INSERT INTO usuario VALUES (?, ?, ?, ?, ?)";
        return $bd->execute($sql, $params);
    }

    public function recibirContrasenna($login) {
        $bd = Klasto::getInstance();
        $params = [$login];
        $sql = "SELECT contrasenna FROM usuario WHERE login = ?";
        return $bd->queryOne($sql, $params);
    }

    public function obtenerUsuario($login) {
        $bd = Klasto::getInstance();
        $params = [$login];
        $sql = "SELECT login, rol_id, imagen, email FROM usuario WHERE login = ?";
        return $bd->queryOne($sql, $params, "objects\Usuario");
    }
}