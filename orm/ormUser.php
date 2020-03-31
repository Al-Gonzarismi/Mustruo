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
        $todoOk = false;
        $bd->startTransaction();
        $rol_id = 1;
        $params = [$login, $email, $avatar, $contrasenna, $rol_id];
        $sql = "INSERT INTO usuario VALUES (?, ?, ?, ?, ?)";        
        $params2 = [$login];
        $sql2 = "INSERT INTO estadisticas (`login`) VALUES (?)";
        $todoOk = $bd->execute($sql, $params) && $bd->execute($sql2, $params2);
        $bd->commit();
        return $todoOk;
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

    public function obtenerEstadisticas($login) {
        $bd = Klasto::getInstance();
        $params = [$login];
        $sql = "SELECT `juegos_jugados`, `juegos_ganados`, `vacas_jugadas`, `vacas_ganadas`, `abandonos`, `mustruo_semana`, `mustruo_mes`, `mustruo_anno` FROM `estadisticas` WHERE login = ?";
        return $bd->queryOne($sql, $params);
    }
}