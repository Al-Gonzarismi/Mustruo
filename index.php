<?php
require 'vendor/autoload.php';
require 'cargarconfig.php'; 

use NoahBuscher\Macaw\Macaw;

session_start();

Macaw::get($URL_PATH . '/', "controller\LobbyController@lobby");

Macaw::get($URL_PATH . '/(:any)', "controller\LobbyController@lobby");

Macaw::get($URL_PATH . '/registrate', "controller\UserController@registro");

Macaw::post($URL_PATH . '/registrate', "controller\UserController@registrar");

Macaw::get($URL_PATH . '/api/comprobarLogin/(:any)', "controller\ApiController@comprobarLogin");

Macaw::get($URL_PATH . '/api/comprobarSesion/(:any)/(:any)', "controller\ApiController@comprobarSesion");

Macaw::get($URL_PATH . '/cerrarSesion', "controller\UserController@cerrarSesion");

Macaw::get($URL_PATH . '/perfil/(:any)', "controller\UserController@perfil");

Macaw::get($URL_PATH . '/mesa/(:any)', "controller\MesaController@partida");

Macaw::get($URL_PATH . '/api/estadisticas/(:any)', "controller\ApiController@obtenerEstadisticas");

Macaw::get($URL_PATH . '/api/ranking/(:any)', "controller\ApiController@obtenerRanking");

Macaw::post($URL_PATH . '/mesa/nuevamesa', "controller\mesaController@crearMesa");

Macaw::get($URL_PATH . '/api/mesas', "controller\apiController@obtenerMesas");

Macaw::get($URL_PATH . '/api/usuariosmesa/(:any)', "controller\apiController@obtenerUsuariosMesa");

Macaw::get($URL_PATH . '/api/sentarse/(:any)/(:any)/(:any)', "controller\apiController@sentarseEnMesa");

Macaw::get($URL_PATH . '/api/levantarse/(:any)/(:any)/(:any)', "controller\apiController@levantarseDeLaMesa");

Macaw::get($URL_PATH . '/api/estadousuario/(:any)', "controller\apiController@comprobarEstadoUsuario");




Macaw::error(function() {
    echo '404 :: Not Found';
});
  
Macaw::dispatch();