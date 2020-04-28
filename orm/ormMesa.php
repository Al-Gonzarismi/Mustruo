<?php

namespace orm;

use \dawfony\Klasto;
use objects\Mesa;

class OrmMesa
{
    private function generarBaraja($id) {
        $bd = Klasto::getInstance();
        $palos = ["Oro", "Copa", "Espada", "Basto"];
        $numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
        $valores = [1, 1, 12, 4, 5, 6, 7, 10, 11, 12];
        foreach ($palos as $palo) {
            for ($i = 0; $i < count($numeros); $i++) {
                $params = [$id, $numeros[$i], $palo, "$numeros[$i]_$palo.jpg", $valores[$i]];
                $sql = "INSERT INTO `cartas` (`mesa_id`, `numero`, `palo`, `imagen`, `valor`, `estado`) VALUES (?, ?, ?, ?, ?, 4)";
                $bd->execute($sql, $params);
            }
        }
    }

    public function crearMesa($mesa)
    {
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
        $this->generarBaraja($mesa->id_mesa);
        $bd->commit();
    }

    public function obtenerUsuariosMesa($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT usuarios_por_mesa.login, usuarios_por_mesa.posicion, usuario.imagen FROM `usuarios_por_mesa`" .
            "INNER JOIN usuario ON usuarios_por_mesa.login = usuario.login WHERE `mesa_id` = ?";
        return $bd->query($sql, $params);
    }

    public function obtenerMesas()
    {
        $bd = Klasto::getInstance();
        $params = [];
        $sql = "SELECT `id_mesa`, `fecha`, `contrasenna`, `privacidad_id`, `vacas`, `juegos`, `puntos`, `login` FROM `mesa`";
        return $bd->query($sql, $params, "objects\Mesa");
    }

    public function sentarseEnMesa($id, $pos, $login)
    {
        $bd = Klasto::getInstance();
        $params = [$login, $id, $pos % 2, $pos];
        $sql = "INSERT INTO `usuarios_por_mesa` (`login`, `mesa_id`, `pareja_id`, `posicion`) VALUES (?, ?, ?, ?)";
        if ($bd->execute($sql, $params)) {
            return $bd->queryOne("SELECT imagen FROM usuario WHERE login = ?", [$login])[0];
        }
        return "nook";
    }

    public function eliminarMesa($id)
    {
        $bd = Klasto::getInstance();
        $bd->startTransaction();
        $params = [$id];
        $sql = "DELETE FROM `usuarios_por_mesa` WHERE `mesa_id` = ?";
        $sql2= "DELETE FROM `cartas` WHERE `mesa_id` = ?";
        $sql3 = "DELETE FROM `mesa` WHERE `id_mesa` = ?";
        $todoOk = $bd->execute($sql, $params) && $bd->execute($sql2, $params) && $bd->execute($sql3, $params);
        $bd->commit();
        return $todoOk;
    }

    public function levantarseDeLaMesa($id, $pos, $login)
    {
        $bd = Klasto::getInstance();
        if ($pos == 0) {
            return $this->eliminarMesa($id);
        }
        $params = [$login];
        $sql = "DELETE FROM `usuarios_por_mesa` WHERE `login` = ?";
        return $bd->execute($sql, $params);
    }

    public function comprobarEstadoMesa($id) {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT `estado` FROM `mesa` WHERE id_mesa = ?";
        return $bd->queryOne($sql, $params)["estado"];
    }
}
