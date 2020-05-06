//variables
const socket = io('http://localhost:3333');
var chat = document.getElementById("chat");
var usuarios = document.getElementById("usuariosonline");
var enviar = document.getElementById("enviarmensaje");
var mensaje = document.getElementById("mensaje");



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

function subirCartas() {
    if ($(this).hasClass('subirCarta')) {
        $(this).removeClass('subirCarta');
    } else {
        $(this).addClass('subirCarta');
    }
}

function activarSubidaCartas() {
    $('#carta1').attr('class', 'pointer');
    $('#carta1').click(subirCartas);
    $('#carta2').attr('class', 'pointer');
    $('#carta2').click(subirCartas);
    $('#carta3').attr('class', 'pointer');
    $('#carta3').click(subirCartas);
    $('#carta4').attr('class', 'pointer');
    $('#carta4').click(subirCartas);
}

function desactivarSubidaCartas() {
    $('#carta1').off('click');
    $('#carta1').attr('class', '');
    $('#carta2').off('click');
    $('#carta2').attr('class', '');
    $('#carta3').off('click');
    $('#carta3').attr('class', '');
    $('#carta4').off('click');
    $('#carta4').attr('class', '');
}

function actualizarDatosJugada(situacion) {
    $("#grande").text(situacion.grande);
    $("#chica").text(situacion.chica);
    $("#pares").text(situacion.pares);
    $("#juego").text(situacion.juego);
    $("#punto").text(situacion.punto);
}

function comprobarYMostrarMenu(mano, turno, jugada, estado) {
    if (usuario.posicion == (mano + turno) % 4) {
        if (jugada == "mus") {
            if (estado == "menu") {
                $("#haymus").removeClass("hidden");
            } else {
                $("#divDescartes").removeClass("hidden");
                activarSubidaCartas();
            }
        } else {
            if (estado == "limpio") {
                $("#nohayEnvite").removeClass("hidden");
            } else if (estado == "envidado") {
                $("#hayEnvite").removeClass("hidden");
            } else {
                $("#hayordago").removeClass("hidden");
            }
        }
    }
}

function comprobarDescartes() {
    let descartes = "";
    let contador = 0;
    if ($("#carta1").hasClass('subirCarta')) {
        descartes += cartas[0].imagen + "+";
        contador++;
    }
    if ($("#carta2").hasClass('subirCarta')) {
        descartes += cartas[1].imagen + "+";
        contador++;
    }
    if ($("#carta3").hasClass('subirCarta')) {
        descartes += cartas[2].imagen + "+";
        contador++;
    }
    if ($("#carta4").hasClass('subirCarta')) {
        descartes += cartas[3].imagen + "+";
        contador++;
    }
    descartes += contador;
    return descartes;
}

// Rango Envites
$('#mas').click(function () {
    var num = Number($('#textoEnvidar').text())
    if (num < mesa.puntos) {
        var suma = num + 1;
        $('#textoEnvidar').text(suma);
        $('#envidar').text("Envido " + suma);
    }
});
$('#menos').click(function () {
    var num = Number($('#textoEnvidar').text())
    if (num > 2) {
        var suma = num - 1;
        $('#textoEnvidar').text(suma);
        $('#envidar').text("Envido " + suma);
    }
});
$('#haymas').click(function () {
    var num = Number($('#haytextoEnvidar').text())
    if (num < mesa.puntos) {
        var suma = num + 1;
        $('#haytextoEnvidar').text(suma);
        $('#hayenvidar').text("Envido " + suma);
    }
});
$('#haymenos').click(function () {
    var num = Number($('#haytextoEnvidar').text())
    if (num > 2) {
        var suma = num - 1;
        $('#haytextoEnvidar').text(suma);
        $('#hayenvidar').text("Envido " + suma);
    }
});

//Mostrar Cuadro Envites
$('#mostrarCuadro').hover(function () {
    $('#cuadroEnvites').show();
}, function () {
    $('#cuadroEnvites').hide();
});

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
        chat.innerHTML += `<div class="textoMensaje"><span>${data.nombre}:</span> ${data.mensaje}</div>`;
        $('#chat').scrollTop($('#chat').prop('scrollHeight'));
    }
});

//estadisticas
renderStats(usuario.login);
$('#compannero').click(() => {
    renderStats(compannero.login);
});
$('#rivalder').click(() => {
    renderStats(rivalDer.login);
});
$('#rivalizq').click(() => {
    renderStats(rivalIzq.login);
});

//control desconexion
comprobarYMostrarMenu(situacionEntrada.mano, situacionEntrada.turno, situacionEntrada.jugada, situacionEntrada.estado);

//juego
$('#mus').click(() => {
    $('#haymus').addClass("hidden");
    fetch(`${path}/api/mus/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = "dame mus";
            res.login = usuario.login;
            console.log(res);
            socket.emit('interaccion', res);
        });
});

$('#descartar').click(() => {
    $('#divDescartes').addClass("hidden");
    let descartes = comprobarDescartes();
    desactivarSubidaCartas();
    fetch(`${path}/api/descartar/${mesa.id_mesa}/${usuario.login}/${descartes}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            res.texto = res.descartes > 0 ? `Dame ${res.descartes} cartas` : "Me quedo servido";
            res.login = usuario.login;
            cartas = res.cartas;
            delete res.cartas;
            $('#carta1').attr('src', `${path}/media/baraja/${cartas[0].imagen}`);
            $('#carta2').attr('src', `${path}/media/baraja/${cartas[1].imagen}`);
            $('#carta3').attr('src', `${path}/media/baraja/${cartas[2].imagen}`);
            $('#carta4').attr('src', `${path}/media/baraja/${cartas[3].imagen}`);
            socket.emit('interaccion', res);
        });
});

socket.on('interaccion', (data) => {
    if (data.mesa_id == mesa.id_mesa) {
        //imprimir bocadillo con data.texto y data.login
        if (data.turno == 0) {
            //imprimir mensaje en el centro
        }
        actualizarDatosJugada(data);
        comprobarYMostrarMenu(data.mano, data.turno, data.jugada, data.estado);
    }
});


