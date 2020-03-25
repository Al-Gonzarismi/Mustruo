<?php
namespace controller;
class LobbyController extends Controller {
    function lobby() {
        //TO DO
        global $config;
        var_dump($config);
        echo \dawfony\Ti::render("view/MainView.phtml");
    }
}