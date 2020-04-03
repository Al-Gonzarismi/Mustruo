<?php
namespace orm;
use \dawfony\Klasto;
use objects\Mesa;

class OrmMesa {

    public function crearMesa($mesa) {
        $bd = Klasto::getInstance();
        $bd->startTransaction();
        $params = [$mesa->fecha, $mesa->contrasenna, $mesa->privacidad_id, $mesa->vacas, $mesa->juegos, $mesa->puntos, $mesa->login];
        $sql = "INSERT INTO `mesa` (`fecha`, `contrasenna`, `privacidad_id`, `vacas`, `juegos`, `puntos`, `login`) VALUES (?, ?, ?, ?, ?, ?, ?)";  
        $bd->execute($sql, $params);
        $params = [$mesa->login, $mesa->fecha];
        $sql = "SELECT `id_mesa` FROM `mesa` WHERE `login` = ? AND `fecha` = ?";
        $mesa->id_mesa = $bd->queryOne($sql, $params)["id_mesa"];
        $params = [$mesa->login, $mesa->id_mesa];
        $sql = "INSERT INTO `usuarios_por_mesa` (`login`, `mesa_id`, `pareja_id`, `posicion`) VALUES (?, ?, 0, 0)";  
        $bd->execute($sql, $params);
        $bd->commit();
    }

    public function obtenerUsuariosMesa($id) {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT `login`, `posicion` FROM `usuarios_por_mesa` WHERE `mesa_id` = ?";
        return $bd->query($sql, $params);
    }

    public function obtenerMesas() {
        $bd = Klasto::getInstance();
        $params = [];
        $sql = "SELECT `id_mesa`, `fecha`, `contrasenna`, `privacidad_id`, `vacas`, `juegos`, `puntos`, `login` FROM `mesa`";
        return $bd->query($sql, $params, "objects\Mesa");
    }

    public function sentarseEnMesa($id, $pos, $login) {
        $bd = Klasto::getInstance();
        $params = [$login, $id, $pos % 2, $pos];
        $sql = "INSERT INTO `usuarios_por_mesa` (`login`, `mesa_id`, `pareja_id`, `posicion`) VALUES (?, ?, ?, ?)";
        return $bd->execute($sql, $params);
    }

    public function levantarseDeLaMesa($id, $pos, $login) {
        $bd = Klasto::getInstance();
        if ($pos == 0) {
            $bd->startTransaction();
            $params = [$id];
            $sql = "DELETE FROM `usuarios_por_mesa` WHERE `mesa_id` = ?";
            $sql2 = "DELETE FROM `mesa` WHERE `id_mesa` = ?";
            $todoOk = $bd->execute($sql, $params) && $bd->execute($sql2, $params);
            $bd->commit();
            return $todoOk;
        }
        $params = [$login];
        $sql = "DELETE FROM `usuarios_por_mesa` WHERE `login` = ?";
        return $bd->execute($sql, $params);
    }
}