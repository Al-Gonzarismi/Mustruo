//variables
const socket = io('http://localhost:3333');
var chat = document.getElementById("chat");
var usuarios = document.getElementById("usuariosonline");
var enviar = document.getElementById("enviarmensaje");
var mensaje = document.getElementById("mensaje");
var encabezadoEstadisiticas = document.getElementById("encabezadoestadisiticas");
var cuerpoEstadisticas = document.getElementById("cuerpoestadisticas");

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
                encabezadoEstadisiticas.innerHTML = `Estadísticas de <a href="${path}/perfil/${login}">${login}</a>`;
                //renderStats(login);
            });
            previo = login;
        }
    }
    usuarios.innerHTML = "";
    usuarios.append(container);
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
        hacerLista(data);
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


socket.on('chatlobby:message', (data) => {
    if (mesa.id_mesa == data.mesa) {
        chat.innerHTML += `<p>${data.nombre}: ${data.mensaje}</p>`;
    }
});