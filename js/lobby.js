//variables
const socket = io('http://localhost:3300');
var chat = document.getElementById("chat");
var usuarios = document.getElementById("usuariosonline");
var enviar = document.getElementById("enviarmensaje");
var mensaje = document.getElementById("mensaje");
var encabezadoEstadisiticas = document.getElementById("encabezadoestadisiticas");
var cuerpoEstadisticas = document.getElementById("cuerpoestadisticas");
var semana = document.getElementById("semana");
var mes = document.getElementById("mes");
var anno = document.getElementById("anno");
var clasificacion = document.getElementById("clasificacion");

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

function hacerLista(zona, data) {
    zona.innerHTML = "";
    var previo = "";
    for (let user of data) {
        if (user.login != previo) {
            let li = document.createElement("li");
            let login = user.login;
            li.innerHTML = `<a>${login}</a><span class="puntos">${zona == clasificacion? user.puntos : ""}</span>`;
            zona.append(li);
            li.addEventListener("click", () => {
                encabezadoEstadisiticas.innerHTML = `Estadisticas de ${login}`;
                renderStats(login);
            });
            previo = user.login;
        }
    }
}

//rankings
fetch(`${path}/api/ranking/0`)
        .then((res) => res.json())
        .then((res) => {
            hacerLista(clasificacion, res);
        })
        
semana.addEventListener("click", () => {
    fetch(`${path}/api/ranking/0`)
        .then((res) => res.json())
        .then((res) => {
            hacerLista(clasificacion, res);
        })
})

mes.addEventListener("click", () => {
    fetch(`${path}/api/ranking/1`)
        .then((res) => res.json())
        .then((res) => {
            hacerLista(clasificacion, res);
        })
})

anno.addEventListener("click", () => {
    fetch(`${path}/api/ranking/2`)
        .then((res) => res.json())
        .then((res) => {
            hacerLista(clasificacion, res);
        })
})

//sockets
socket.on('connect', () => {
    usuario.socketid = socket.id;
    socket.emit('lobby', usuario);
});

socket.on('refrescarusuarios', (data) => {
    hacerLista(usuarios, data);

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
