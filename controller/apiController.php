<?php
namespace controller;
class ApiController extends Controller {
    function registrar() {
        /*
        // mandar la data como cuerpo de la respuesta
        // ¡¡ RECORDAR cambiar el Content-type, si no, se asumiría html
        header('Content-type: application/json');

        if (!isset($_SESSION["login"])) {
            http_response_code(403);
            die (json_encode(["msg"=>"No logueado"]));
        }

        $orm = new OrmPost;
        $data["estado"] = $orm->darOQuitarLike($postid, $_SESSION["login"]);
        $data["numLikes"] = $orm->contarLikes($postid);

        echo json_encode($data);
        */
    }
}