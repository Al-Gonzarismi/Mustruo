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

Macaw::post($URL_PATH . '/cambiarAvatar/(:any)/(:any)', "controller\UserController@cambiarAvatar");

Macaw::get($URL_PATH . '/api/cambiarEmail/(:any)/(:any)', "controller\ApiController@cambiarEmail");

Macaw::get($URL_PATH . '/api/cambiarContrasenna/(:any)/(:any)', "controller\ApiController@cambiarContrasenna");

Macaw::get($URL_PATH . '/mesa/(:any)', "controller\MesaController@partida");

Macaw::get($URL_PATH . '/api/estadisticas/(:any)', "controller\ApiController@obtenerEstadisticas");

Macaw::get($URL_PATH . '/api/ranking/(:any)', "controller\ApiController@obtenerRanking");

Macaw::post($URL_PATH . '/mesa/nuevamesa', "controller\mesaController@crearMesa");

Macaw::get($URL_PATH . '/api/mesas', "controller\apiController@obtenerMesas");

Macaw::get($URL_PATH . '/api/usuariosmesa/(:any)', "controller\apiController@obtenerUsuariosMesa");

Macaw::get($URL_PATH . '/api/sentarse/(:any)/(:any)/(:any)', "controller\apiController@sentarseEnMesa");

Macaw::get($URL_PATH . '/api/levantarse/(:any)/(:any)/(:any)', "controller\apiController@levantarseDeLaMesa");

Macaw::get($URL_PATH . '/api/estadousuario/(:any)', "controller\apiController@comprobarEstadoUsuario");

Macaw::get($URL_PATH . '/api/empezarpartida/(:any)', "controller\apiController@cambiarEstadoPartida");

Macaw::get($URL_PATH . '/api/mus/(:any)/(:any)', "controller\apiController@pedirMus");

Macaw::get($URL_PATH . '/api/nomus/(:any)/(:any)', "controller\apiController@noHayMus");

Macaw::get($URL_PATH . '/api/descartar/(:any)/(:any)/(:any)', "controller\apiController@descartar");

Macaw::get($URL_PATH . '/api/envite/(:any)/(:any)/(:any)', "controller\apiController@envidar");

Macaw::get($URL_PATH . '/api/reenvite/(:any)/(:any)/(:any)', "controller\apiController@reenvidar");

Macaw::get($URL_PATH . '/api/paso/(:any)/(:any)', "controller\apiController@pasar");

Macaw::get($URL_PATH . '/api/ordago/(:any)/(:any)', "controller\apiController@echarOrdago");

Macaw::get($URL_PATH . '/api/noquiero/(:any)/(:any)', "controller\apiController@noQuerer");

Macaw::get($URL_PATH . '/api/quiero/(:any)/(:any)', "controller\apiController@Querer");


Macaw::error(function() {
    echo '404 :: Not Found';
});
  
Macaw::dispatch();