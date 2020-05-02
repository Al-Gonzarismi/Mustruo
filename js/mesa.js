//variables
const socket = io('http://localhost:3333');
var chat = document.getElementById("chat");
var usuarios = document.getElementById("usuariosonline");
var enviar = document.getElementById("enviarmensaje");
var mensaje = document.getElementById("mensaje");
var encabezadoEstadisiticas = document.getElementById("encabezadoestadisiticas");
var cuerpoEstadisticas = document.getElementById("cuerpoestadisticas");
var compannero = document.getElementById("compannero");
var rivalDer = document.getElementById("rivalder");
var rivalIzq = document.getElementById("rivalizq");

//functions
function hacerLista(data) {
    var container = document.createElement("div");
    var previo = "";
    for (let i = 0; i < data.length; i++) {
        let login = data[i].login;
        if (login != previo) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.setAttribute("class", "online");
            div.innerHTML = `<a>${login}</a>`;
            li.append(div);
            container.append(li);
            li.addEventListener("click", () => {
                renderStats(login);
            });
            previo = login;
        }
    }
    usuarios.innerHTML = "";
    usuarios.append(container);
}

function renderStats(login) {
    fetch(`${path}/api/estadisticas/${login}`)
        .then((res) => res.json())
        .then((res) => {
            $("#usuestadisticas").text(login);
            $("#juegosJugados").text(res.juegos_jugados);
            $("#juegosGanados").text(res.juegos_ganados);
            $("#vacasJugadas").text(res.vacas_jugadas);
            $("#vacasGanadas").text(res.vacas_ganadas);
            $("#abandonos").text(res.abandonos);            
        });
}

//conectar socket
socket.on('connect', () => {
    usuario.socket_id = socket.id;
    usuario.id_mesa = mesa.id_mesa;
    socket.emit('partida', usuario);
});

//mantener lista usuarios conectados
socket.on('refrescarusuarios', (data) => {
    if (data.mesa == mesa.id_mesa) {
        hacerLista(data.users);
    }
});

//chat
enviar.addEventListener("click", () => {
    if (mensaje.value != "") {
        socket.emit("chatpartida:message", {
            "mensaje": mensaje.value,
            "nombre": usuario.login,
            "mesa": mesa.id_mesa
        })
        mensaje.value = "";
    }
});


socket.on('chatpartida:message', (data) => {
    if (mesa.id_mesa == data.mesa) {
        chat.innerHTML += `<p>${data.nombre}: ${data.mensaje}</p>`;
    }
});

//estadisticas
renderStats(usuario.login);
compannero.addEventListener("click", () => {
    renderStats(compannero.innerText);
});
rivalDer.addEventListener("click", () => {
    renderStats(rivalDer.innerText);
});
rivalIzq.addEventListener("click", () => {
    renderStats(rivalIzq.innerText);
})
