<?php
require 'vendor/autoload.php';
require 'cargarconfig.php'; 

use NoahBuscher\Macaw\Macaw;

session_start();

Macaw::get($URL_PATH . '/', "controller\LobbyController@lobby");

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


Macaw::error(function() {
    echo '404 :: Not Found';
});
  
Macaw::dispatch();