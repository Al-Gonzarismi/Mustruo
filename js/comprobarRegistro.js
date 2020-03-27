function comprobarRegistro() {
    var login = document.getElementById("login").value;
    var contrasenna = document.getElementById("contrasenna").value;
    var repitecontrasenna = document.getElementById("repitecontrasenna").value;
    console.log(login);
    console.log(contrasenna);
    console.log(repitecontrasenna);
    /*
    fetch(URL_PATH+"/Api/Like/"+postid)
        .then(function (response) {
            return response.json()
        }).then (function (datos){
            var corazon = document.querySelector("#likecorazon"+postid);
            var numLikes = document.querySelector("#likecontador"+postid);
            if (datos.estado) {
                corazon.classList.add("text-danger"); // Color rojo
                corazon.classList.add("heartBeat"); // efecto de animate.css
            } else {
                corazon.classList.remove("text-danger");
                corazon.classList.remove("heartBeat");
            }
            numLikes.innerHTML = datos.numLikes;
        })
        */
}