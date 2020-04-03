function comprobarSesion() {
    var login = document.getElementById("login").value;
    var contrasenna = document.getElementById("contrasenna").value;
    if (login.length > 3 && contrasenna.length > 3) {
        fetch(URL_PATH+"/api/comprobarSesion/"+login+"/"+contrasenna)
            .then(function (response) {
                return response.text()
            }).then (function (datos){
                if (datos == "si") {
                    alert('Compruebe de nuevo su login y/o contraseña')
                } else {
                    location.replace(URL_PATH+"/");
                }
        })
    } else {
        alert('Compruebe de nuevo su login y/o contraseña')
    }
}