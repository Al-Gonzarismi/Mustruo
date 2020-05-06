<?php

namespace orm;

use \dawfony\Klasto;
use objects\Mesa;

class OrmMesa
{
    private function generarBaraja($id)
    {
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

    public function repartirCartasIniciales($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT `mesa_id`, `numero`, `palo`, `imagen`, `valor`, `estado` FROM `cartas` WHERE `mesa_id` = ?";
        $baraja = $bd->query($sql, $params, "objects\Carta");
        if (shuffle($baraja)) {
            for ($i = 0; $i < 16; $i++) {
                $params = [$i % 4, $id, $baraja[$i]->numero, $baraja[$i]->palo];
                $sql = "UPDATE `cartas` SET `estado` = ? WHERE `mesa_id` = ? AND `numero` = ? AND `palo` = ?";
                $bd->execute($sql, $params);
            }
        }
    }

    public function empezarMano($id, $mano = 0)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "DELETE FROM `jugadas` WHERE mesa_id = ?";
        $bd->execute($sql, $params);
        $params = [$id, $mano, 0];
        $sql = "INSERT INTO `jugadas` (`mesa_id`, `mano`, `turno`) VALUES(?, ?, ?)";
        $bd->execute($sql, $params);
        $this->repartirCartasIniciales($id);
    }

    public function generarMarcadores($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id, 0];
        $sql = "INSERT INTO `marcador` (`mesa_id`, `pareja_id`) VALUES (?, ?)";
        $bd->execute($sql, $params);
        $params = [$id, 1];
        $bd->execute($sql, $params);
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
        $this->generarMarcadores($mesa->id_mesa);
        $this->empezarMano($mesa->id_mesa);
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

    public function obtenerMesa($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT `id_mesa`, `fecha`, `contrasenna`, `privacidad_id`, `vacas`, `juegos`, `puntos`, `login` FROM `mesa` WHERE `id_mesa` = ?";
        return $bd->queryOne($sql, $params, "objects\Mesa");
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
        $sql2 = "DELETE FROM `cartas` WHERE `mesa_id` = ?";
        $sql3 = "DELETE FROM `marcador` WHERE `mesa_id` = ?";
        $sql4 = "DELETE FROM `jugadas` WHERE `mesa_id` = ?";
        $sql5 = "DELETE FROM `mesa` WHERE `id_mesa` = ?";
        $todoOk = $bd->execute($sql, $params) && $bd->execute($sql2, $params) && $bd->execute($sql3, $params) && $bd->execute($sql4, $params) && $bd->execute($sql5, $params);
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

    public function comprobarEstadoMesa($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT `estado` FROM `mesa` WHERE id_mesa = ?";
        return $bd->queryOne($sql, $params)["estado"];
    }

    public function cambiarEstadoPartida($id, $estado)
    {
        $bd = Klasto::getInstance();
        $params = [$estado, $id];
        $sql = "UPDATE `mesa` SET estado = ? WHERE id_mesa = ?";
        return $bd->execute($sql, $params);
    }

    public function existeMesa($id)
    {
        return $this->comprobarEstadoMesa($id) == 1;
    }

    public function obtenerCartas($id, $estado)
    {
        $bd = Klasto::getInstance();
        $params = [$id, $estado];
        $sql = "SELECT `mesa_id`, `numero`, `palo`, `imagen`, `valor`, `estado` FROM `cartas` WHERE `mesa_id` = ? AND `estado` = ? ORDER BY `valor` DESC";
        return $bd->query($sql, $params, "objects\Carta");
    }

    public function obtenerMarcador($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT `pareja_id`, `puntos`, `juegos`, `vacas` FROM `marcador` WHERE `mesa_id` = ?";
        return $bd->query($sql, $params, "objects\Marcador");
    }

    public function obtenerSituacionActual($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "SELECT `mesa_id`, `mano`, `estado`, `turno`, `jugada`, `grande`, `chica`, `pares`, `juego`, `punto` FROM `jugadas` WHERE `mesa_id` = ?";
        return $bd->queryOne($sql, $params);
    }

    public function iniciarDescartes($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "UPDATE `jugadas` SET `estado` = 'descartando', `turno` = 0 WHERE `mesa_id` = ?";
        return $bd->execute($sql, $params);
    }

    public function actualizarSituacion($id, $turno)
    {
        $bd = Klasto::getInstance();
        $params = [$turno, $id];
        $sql = "UPDATE `jugadas` SET `turno` = ? WHERE `mesa_id` = ?";
        return $bd->execute($sql, $params);
    }

    public function volverAMenuMus($id)
    {
        $bd = Klasto::getInstance();
        $params = [$id];
        $sql = "UPDATE `jugadas` SET `estado` = 'menu', `turno` = 0 WHERE `mesa_id` = ?";
        return $bd->execute($sql, $params);
    }

    public function obtenerPosicion($login)
    {
        $bd = Klasto::getInstance();
        $params = [$login];
        $sql = "SELECT `posicion` FROM `usuarios_por_mesa` WHERE `login` = ?";
        return $bd->queryOne($sql, $params)["posicion"];
    }

    private function repartirCartasMus($id, $posicion, $nDescartes)
    {
        $bd = Klasto::getInstance();
        $params = [$id, 4];
        $sql = "SELECT `mesa_id`, `numero`, `palo`, `imagen`, `valor`, `estado` FROM `cartas` WHERE `mesa_id` = ? AND `estado` = ?";
        $baraja = $bd->query($sql, $params, "objects\Carta");
        if (shuffle($baraja)) {
            if (count($baraja) >= $nDescartes) {
                for ($i = 0; $i < $nDescartes; $i++) {
                    $params = [$posicion, $id, $baraja[$i]->numero, $baraja[$i]->palo];
                    $sql = "UPDATE `cartas` SET `estado` = ? WHERE `mesa_id` = ? AND `numero` = ? AND `palo` = ?";
                    $bd->execute($sql, $params);
                }
            } else {
                for ($i = 0; $i < count($baraja); $i++) {
                    $params = [$posicion, $id, $baraja[$i]->numero, $baraja[$i]->palo];
                    $sql = "UPDATE `cartas` SET `estado` = ? WHERE `mesa_id` = ? AND `numero` = ? AND `palo` = ?";
                    $bd->execute($sql, $params);
                }
                $nDescartes -= count($baraja);
                $params = [$id];
                $sql = "UPDATE `cartas` SET `estado` = 4 WHERE mesa_id = ? AND `estado` = 5";
                $bd->execute($sql, $params);
                $this->repartirCartasMus($id, $posicion, $nDescartes);
            }
        }
    }

    public function darMus($id, $login, $descartes)
    {
        $nDescartes = $descartes[count($descartes) - 1];
        $posicion = $this->obtenerPosicion($login);
        $bd = Klasto::getInstance();
        if ($nDescartes > 0) {
            for ($i = 0; $i < $nDescartes; $i++) {
                $params = [$id, $descartes[$i]];
                $sql = "UPDATE `cartas` SET `estado` = 5 WHERE mesa_id = ? AND `imagen` = ?";
                $bd->execute($sql, $params);
            }
            $this->repartirCartasMus($id, $posicion, $nDescartes);
        }
        return $this->obtenerCartas($id, $posicion);
    }
}
