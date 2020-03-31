//sockets
const socket = io('http://localhost:3300');
var chat = document.getElementById("chat");
var usuarios = document.getElementById("usuariosonline");
var enviar = document.getElementById("enviarmensaje");
var mensaje = document.getElementById("mensaje");
socket.on('connect', () => {
    usuario.socketid = socket.id;    
    socket.emit('lobby', usuario);
});

socket.on('refrescarusuarios', (data) => {
    usuarios.innerHTML = "";
    for (let user of data) {
        usuarios.innerHTML += `<li>${user.login}</li>`;
    }
});

if (usuario != "anonimo") {
    enviar.addEventListener("click", () => {
        if (mensaje.value != "") {
            socket.emit("chatlobby:message", {
                "mensaje" : mensaje.value,
                "nombre" : usuario.login
            })
            mensaje.value = "";
        }
    });
}

socket.on('chatlobby:message', (data) => {
    chat.innerHTML += `<p>${data.nombre}: ${data.mensaje}</p>`;
});
