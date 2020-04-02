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
}