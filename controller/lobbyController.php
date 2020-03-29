<?php
namespace controller;
class LobbyController extends Controller {
    function lobby() {
        $title = "Lobby";
        echo \dawfony\Ti::render("view/MainView.phtml", compact('title'));
    }
}