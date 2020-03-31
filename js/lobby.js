//variables
const socket = io('http://localhost:3300');
var chat = document.getElementById("chat");
var usuarios = document.getElementById("usuariosonline");
var enviar = document.getElementById("enviarmensaje");
var mensaje = document.getElementById("mensaje");
var encabezadoEstadisiticas = document.getElementById("encabezadoestadisiticas");
var cuerpoEstadisticas = document.getElementById("cuerpoestadisticas");

//functions
function renderStats(login) {
    fetch(`${path}/api/estadisticas/${login}`)
        .then((res) => res.json())
        .then((res) => {
            cuerpoEstadisticas.innerHTML = `<table><tr><td></td><td>Jugados</td><td>Ganados</td></tr>
        <tr><th>Juegos</th><td>${res.juegos_jugados}</td><td>${res.juegos_ganados}</td></tr>
        <tr><th>Vacas</th><td>${res.vacas_jugadas}</td><td>${res.vacas_ganadas}</td></tr>
        <tr><td></td><td>Semanales</td><td>Mensuales</td><td>Anuales</td></tr>
        <tr><th>Mustruos</th><td>${res.mustruo_semana}</td><td>${res.mustruo_mes}</td><td>${res.mustruo_anno}</td></tr>
        <tr><th>Abandonos</th><td>${res.abandonos}</td></tr></table>`;
        });
    
}

//sockets
socket.on('connect', () => {
    usuario.socketid = socket.id;
    socket.emit('lobby', usuario);
});

socket.on('refrescarusuarios', (data) => {
    usuarios.innerHTML = "";
    var previo = "";
    for (let user of data) {
        if (user.login != previo) {
            var li = document.createElement("li");
            let login = user.login;
            li.innerHTML = `<a>${login}</a>`;
            usuarios.append(li);
            li.addEventListener("click", () => {
                encabezadoEstadisiticas.innerHTML = `Estadisticas de ${login}`;
                renderStats(login);
            });
            previo = user.login;
        }
        
    }
});

if (usuario != "anonimo") {
    enviar.addEventListener("click", () => {
        if (mensaje.value != "") {
            socket.emit("chatlobby:message", {
                "mensaje": mensaje.value,
                "nombre": usuario.login
            })
            mensaje.value = "";
        }
    });
}

socket.on('chatlobby:message', (data) => {
    chat.innerHTML += `<p>${data.nombre}: ${data.mensaje}</p>`;
});
