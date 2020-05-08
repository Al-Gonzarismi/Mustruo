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

function repartoDerecha(cartas) {
    cartas[0].setAttribute('class', 'ocultar aparecer unSegundo')
    cartas['1'].setAttribute('class', 'ocultar aparecer cincoSegundos')
    cartas['2'].setAttribute('class', 'ocultar aparecer nueveSegundos')
    cartas['3'].setAttribute('class', 'ocultar aparecer treceSegundos')
}
function repartoCompi(cartas) {
    cartas['0'].setAttribute('class', 'ocultar aparecer dosSegundos')
    cartas['1'].setAttribute('class', 'ocultar aparecer seisSegundos')
    cartas['2'].setAttribute('class', 'ocultar aparecer diezSegundos')
    cartas['3'].setAttribute('class', 'ocultar aparecer catorceSegundos')
}
function repartoIzq(cartas) {
    cartas['0'].setAttribute('class', 'ocultar aparecer tresSegundos')
    cartas['1'].setAttribute('class', 'ocultar aparecer sieteSegundos')
    cartas['2'].setAttribute('class', 'ocultar aparecer onceSegundos')
    cartas['3'].setAttribute('class', 'ocultar aparecer quinceSegundos')
}
function repartoUsuario(cartas) {
    cartas['0'].setAttribute('class', 'ocultar aparecer cuatroSegundos')
    cartas['1'].setAttribute('class', 'ocultar aparecer ochoSegundos')
    cartas['2'].setAttribute('class', 'ocultar aparecer doceSegundos')
    cartas['3'].setAttribute('class', 'ocultar aparecer dieciseisSegundos')
}
function repartir() {
    const manoUsuario = $('.manoUsuario');
    const manoRivalDer = $('.manoRivalDer');
    const manoRivalIzq = $('.manoRivalIzq');
    const manoCompi = $('.manoCompi');
    var usuarioCartas = $('.misCartas').children();
    var compiCartas = $('.compiCartas').children();
    var rivalDerCartas = $('.rivalderCartas').children();
    var rivalIzqCartas = $('.rivalizqCartas').children();
    if (!manoRivalDer.hasClass('hidden')) {
        $('#deUsu').show();
        repartoDerecha(rivalDerCartas);
        repartoCompi(compiCartas);
        repartoIzq(rivalIzqCartas);
        repartoUsuario(usuarioCartas);
    } else if (!manoCompi.hasClass('hidden')) {
        $('#deRivalDer').show();
        repartoDerecha(compiCartas);
        repartoCompi(rivalIzqCartas);
        repartoIzq(usuarioCartas);
        repartoUsuario(rivalDerCartas);
    } else if (!manoUsuario.hasClass('hidden')) {
        $('#deRivalIzq').show();
        repartoDerecha(usuarioCartas);
        repartoCompi(rivalDerCartas);
        repartoIzq(compiCartas);
        repartoUsuario(rivalIzqCartas);
    } else if (!manoRivalIzq.hasClass('hidden')) {
        $('#deCompi').show();
        repartoDerecha(rivalIzqCartas);
        repartoCompi(usuarioCartas);
        repartoIzq(rivalDerCartas);
        repartoUsuario(compiCartas);
    }
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

function mostrarMenu(estado) {
    if (estado == "limpio") {
        $("#nohayEnvite").removeClass("hidden");
    } else if (estado == "envite") {
        $("#hayEnvite").removeClass("hidden");
    } else if (estado == "ordago") {
        $("#responderOrdago").removeClass("hidden");
    }
}

function ocultarCartas() {
    for (let i = 1; i <= 4; i++) {
        $(`#carta${i}`).addClass("hidden");
        $(`#compi${i}`).addClass("hidden");
        $(`#rivalizq${i}`).addClass("hidden");
        $(`#rivalder${i}`).addClass("hidden");
    }
}

function mostrarCartas() {
    for (let i = 1; i <= 4; i++) {
        $(`#carta${i}`).removeClass("hidden");
        $(`#compi${i}`).removeClass("hidden");
        $(`#rivalizq${i}`).removeClass("hidden");
        $(`#rivalder${i}`).removeClass("hidden");
    }
}

function colocarBaraja(mano) {
    switch (mano) {
        case usuario.posicion:
            $("#manousuario").removeClass("hidden");
            break;
        case compannero.posicion:
            $("#manocompi").removeClass("hidden");
            break;
        case rivalIzq.posicion:
            $("#manorivalizq").removeClass("hidden");
            break;
        case rivalDer.posicion:
            $("#manorivalder").removeClass("hidden");
            break;
    }
}

function ocultarBaraja(mano) {
    switch (mano) {
        case usuario.posicion:
            $("#manousuario").addClass("hidden");
            break;
        case compannero.posicion:
            $("#manocompannero").addClass("hidden");
            break;
        case rivalIzq.posicion:
            $("#manorivalizq").addClass("hidden");
            break;
        case rivalIzq.posicion:
            $("#manorivalder").addClass("hidden");
            break;
    }
}

function colocarReversos() {
    for (let i = 1; i <= 4; i++) {
        $(`#compi${i}`).attr('src', `${path}/media/baraja/reverso.jpg`);
        $(`#rivalizq${i}`).attr('src', `${path}/media/baraja/reverso.jpg`);
        $(`#rivalder${i}`).attr('src', `${path}/media/baraja/reverso.jpg`);
    }
}

function colocarMisCartas(cartas) {
    for (let i = 1; i <= 4; i++) {
        $(`#carta${i}`).attr('src', `${path}/media/baraja/${cartas[i - 1].imagen}`);
    }
}

function comprobarYMostrarMenu(mano, turno, jugada, estado) {
    if (estado != "repartir" && $("#carta1").hasClass("hidden")) {
        mostrarCartas();
    }
    if (estado == "repartir") {
        if (!$("#carta1").hasClass("hidden")) {
            ocultarCartas();
        }
        if ((mano + 3) % 4 == usuario.posicion) {
            $("#repartir").removeClass("hidden");
        }
    } else if (usuario.posicion == (mano + turno) % 4) {
        if (jugada == "mus") {
            if (estado == "menu") {
                $("#haymus").removeClass("hidden");
            } else if (estado == "descartando") {
                $("#divDescartes").removeClass("hidden");
                activarSubidaCartas();
            }
        } else if (jugada == "pares" || jugada == "juego") {
            fetch(`${path}/api/menuparjuego/${mesa.id_mesa}/${usuario.login}`)
                .then((res) => res.json())
                .then((res) => {
                    if (res.comprobacion) {
                        mostrarMenu(estado);
                    } else {
                        if (res.estado == "limpio") {
                            fetch(`${path}/api/paso/${mesa.id_mesa}/${usuario.login}`)
                                .then((res) => res.json())
                                .then((res) => {
                                    if (res.jugada == "mus") {
                                        socket.emit('showdown', res);
                                    } else {
                                        socket.emit('interaccion', res);
                                    }
                                });
                        } else {
                            fetch(`${path}/api/noquiero/${mesa.id_mesa}/${usuario.login}`)
                                .then((res) => res.json())
                                .then((res) => {
                                    if (typeof res.marcadores !== 'undefined') {
                                        socket.emit('actualizarMarcadores', res.marcadores);
                                    }
                                    if (res.jugada == "mus") {
                                        socket.emit('showdown', res);// programar al final
                                    } else {
                                        socket.emit('interaccion', res);
                                    }
                                });
                        }
                    }
                });
        } else {
            mostrarMenu(estado);
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

function mostrarBocadillo(login, texto) {
    var contenido;
    var bocadillo
    if (login == compannero.login) {
        bocadillo = $("#bocatacompi");
        contenido =  $("#textocompi");
    } else if(login == rivalDer.login) {
        bocadillo = $("#bocatarivalder");
        contenido =  $("#textorivalder");
    } else if (login == rivalIzq.login){
        bocadillo = $("#bocatarivalizq");
        contenido =  $("#textorivalizq");
    }
    if (typeof contenido !== 'undefined') {
        bocadillo.removeClass("hidden");
        contenido.text(texto);
        setTimeout(()=> {
            bocadillo.addClass("hidden");
        }, 2000);
    }
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
socket.emit('interaccion', situacionEntrada);
colocarBaraja(situacionEntrada.mano);

//repartir
$('#repartir').click(() => {
    $('#repartir').addClass("hidden");
    socket.emit('repartir', mesa.id_mesa);
});

socket.on('repartir', (data) => {
    ocultarCartas();
    colocarReversos();
    fetch(`${path}/api/cartas/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            colocarMisCartas(res);
            repartir();
            setTimeout(() => {
                comprobarYMostrarMenu(data.mano, data.turno, data.jugada, data.estado);
            }, 8000);
            //comprobar que los tiempos cuadran
        });
})

//juego
$('#mus').click(() => {
    $('#haymus').addClass("hidden");
    fetch(`${path}/api/mus/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = "dame mus";
            res.login = usuario.login;
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

$('#nomus').click(() => {
    $('#haymus').addClass("hidden");
    fetch(`${path}/api/nomus/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = "No hay mus";
            res.login = usuario.login;
            socket.emit('interaccion', res);
        });
});

$('#paso').click(() => {
    $('#nohayEnvite').addClass("hidden");
    fetch(`${path}/api/paso/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `Paso`;
            res.login = usuario.login;
            if (res.jugada == "mus") {
                socket.emit('showdown', res);
            } else {
                socket.emit('interaccion', res);
            }
        });
});

$('#envidar').click(() => {
    $('#nohayEnvite').addClass("hidden");
    let envite = $('#textoEnvidar').text();
    fetch(`${path}/api/envite/${mesa.id_mesa}/${usuario.login}/${envite}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `Envido ${envite}`;
            res.login = usuario.login;
            $('#textoEnvidar').text(2);
            $('#envidar').text("Envido 2");
            socket.emit('interaccion', res);
        });
});

$('#ordago').click(() => {
    $('#nohayEnvite').addClass("hidden");
    fetch(`${path}/api/ordago/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `¡¡ORDAGO!!`;
            res.login = usuario.login;
            socket.emit('interaccion', res);
        });
});

$('#haynoquiero').click(() => {
    $('#hayEnvite').addClass("hidden");
    fetch(`${path}/api/noquiero/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `No quiero`;
            res.login = usuario.login;
            if (typeof res.marcadores !== 'undefined') {
                socket.emit('actualizarMarcadores', res.marcadores);
            }
            if (res.jugada == "mus") {
                socket.emit('showdown', res);
            } else {
                socket.emit('interaccion', res);
            }
        });
});

$('#hayquiero').click(() => {
    $('#hayEnvite').addClass("hidden");
    fetch(`${path}/api/quiero/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `Quiero`;
            res.login = usuario.login;
            if (res.jugada == "mus") {
                socket.emit('showdown', res);
            } else {
                socket.emit('interaccion', res);
            }
        });
});

$('#hayenvidar').click(() => {
    $('#hayEnvite').addClass("hidden");
    let envite = $('#haytextoEnvidar').text();
    fetch(`${path}/api/reenvite/${mesa.id_mesa}/${usuario.login}/${envite}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `${envite} más!!`;
            res.login = usuario.login;
            $('#haytextoEnvidar').text(2);
            $('#hayEnvidar').text("Envido 2");
            socket.emit('interaccion', res);
        });
});

$('#hayordago').click(() => {
    $('#hayEnvite').addClass("hidden");
    fetch(`${path}/api/ordago/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `¡¡ORDAGO!!`;
            res.login = usuario.login;
            socket.emit('interaccion', res);
        });
});

$('#quiero').click(() => {
    $('#responderOrdago').addClass("hidden");
    let datos = new Object();
    datos.login = usuario.login;
    datos.texto = "Muestrame tu RNG";
    socket.emit('showdown', datos);// programar al final
});

$('#noquiero').click(() => {
    $('#responderOrdago').addClass("hidden");
    fetch(`${path}/api/noquiero/${mesa.id_mesa}/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            res.texto = `No quiero`;
            res.login = usuario.login;
            if (typeof res.marcadores !== 'undefined') {
                socket.emit('actualizarMarcadores', res.marcadores);
            }
            if (res.jugada == "mus") {
                socket.emit('showdown', res);
            } else {
                socket.emit('interaccion', res);
            }
        });
});
socket.on('actualizarMarcadores', (data) => {
    $("#puntosa").text(data[0].puntos);
    $("#juegosa").text(data[0].juegos);
    $("#vacasa").text(data[0].vacas);
    $("#puntosb").text(data[1].puntos);
    $("#juegosb").text(data[1].juegos);
    $("#vacasb").text(data[1].vacas);
})

socket.on('interaccion', (data) => {
    if (data.mesa_id == mesa.id_mesa) {
        if (data.turno == 0) {
            //imprimir mensaje en el centro
            $("#tapetej").text(data.jugada.toUpperCase());
            $("#tapetej").removeClass("hidden");

        }
        if (typeof data.texto !== 'undefined') {
            //imprimir bocadillo con data.texto y data.login
            if (data.login != usuario.login) {
                mostrarBocadillo(data.login, data.texto);
            }
        }
        setTimeout(() => {
            if (data.estado == "comprobando" && usuario.posicion == (data.mano + data.turno) % 4) {
                fetch(`${path}/api/paresojuego/${mesa.id_mesa}/${usuario.login}`)
                    .then((res) => res.json())
                    .then((res) => {
                        res.texto = res.comprobacion ? "Tengo" : "No tengo";
                        res.login = usuario.login;
                        if (res.jugada == "mus") {
                            socket.emit('showdown', res);
                        } else {
                            socket.emit('interaccion', res);
                        }
                    });
            } else {
                comprobarYMostrarMenu(data.mano, data.turno, data.jugada, data.estado);
            }
            actualizarDatosJugada(data);
        }, 1500);

    }
});

socket.on('showdown', (data) => {
    console.log("programa el showdown copon");
    comprobarYMostrarMenu(data.mano, data.turno, data.jugada, data.estado);
})


