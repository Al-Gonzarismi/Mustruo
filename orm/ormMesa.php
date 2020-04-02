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
        $sql = "SELECT `id` FROM `mesa` WHERE `login` = ? AND `fecha` = ?";
        $mesa->id = $bd->queryOne($sql, $params)["id"];
        $params = [$mesa->login, $mesa->id];
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
        $sql = "SELECT `id`, `fecha`, `contrasenna`, `privacidad_id`, `vacas`, `juegos`, `puntos`, `login` FROM `mesa`";
        return $bd->query($sql, $params, "objects\Mesa");
    }

    public function sentarseEnMesa($id, $pos, $login) {
        $bd = Klasto::getInstance();
        $params = [$login, $id, $pos % 2, $pos];
        $sql = "INSERT INTO `usuarios_por_mesa` (`login`, `mesa_id`, `pareja_id`, `posicion`) VALUES (?, ?, ?, ?)";
        return $bd->execute($sql, $params);
    }

    public function levantarseDeLaMesa($id, $pos) {
        $bd = Klasto::getInstance();
        $params = [$id, $pos];
        $sql = "DELETE FROM `usuarios_por_mesa` WHERE `mesa_id` = ? AND `posicion` = ?";
        return $bd->execute($sql, $params);
    }
}