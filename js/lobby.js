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
var mesas = document.getElementById("mesas");
//varibles solo para registrados;
if (usuario != "anonimo") {
    var nuevaMesa = document.getElementById("nuevamesa");
}

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
            li.innerHTML = `<a>${login}</a><span class="puntos">${zona == clasificacion ? user.puntos : ""}</span>`;
            zona.append(li);
            li.addEventListener("click", () => {
                encabezadoEstadisiticas.innerHTML = `Estadisticas de ${login}`;
                renderStats(login);
            });
            previo = user.login;
        }
    }
}

function levantarse(id, i, boton, span) {
    fetch(`${path}/api/levantarse/${id}/${i}/${span.innerText}`)
        .then((res) => res.text())
        .then((res) => {
            if (res == "ok") {
                boton.innerText = "Sentarse";
                span.innerText = "libre";
                //sockets:probablemente mejorable
                socket.emit('actualizarmesas');
            } else {
                window.alert("Intentelo otra vez");
            }
        })
}

function sentarse(id, i, boton, span) {
    fetch(`${path}/api/sentarse/${id}/${i}/${usuario.login}`)
        .then((res) => res.text())
        .then((res) => {
            console.log(res);
            if (res == "ok") {
                boton.innerText = "Levantarse";
                span.innerText = usuario.login;
                //sockets:probablemente mejorable
                socket.emit("actualizarmesas");
            } else {
                window.alert("Intentelo otra vez");
            }
        })
}

function crearAsientos(id, mesa, i) {
    let asiento = document.createElement("div");
    asiento.setAttribute("class", `posicion${i}`);
    let span = document.createElement("span");
    span.innerText = "Libre";
    let boton = document.createElement("button");
    boton.innerText = "Sentarse";
    boton.addEventListener("click", () => {
        if (usuario != "anonimo") {
            if (boton.innerText == "Sentarse") {
                if (!usuario.estaSentado) {
                    sentarse(id, i, boton, span);
                } else {
                    window.alert("Ya estas sentado en otro lugar");
                }
            } else {
                levantarse(id, i, boton, span);
            }
        } else {
            window.alert("Tienes que estar conectado");
        }
    });
    asiento.append(boton);
    asiento.append(span);
    mesa.append(asiento);
}

function renderUsuarios(id, mesa) {
    fetch(`${path}/api/usuariosmesa/${id}`)
        .then((res) => res.json())
        .then((res) => {
            for (let i = 0; i < 4; i++) {
                crearAsientos(id, mesa, i);
            }
            for (let usu of res) {
                let asiento = mesa.childNodes[usu.posicion];
                asiento.childNodes[0].innerText = "levantarse";
                asiento.childNodes[1].innerText = usu.login;
            }
            var listo = document.createElement("button");
            listo.setAttribute("class", "listo");
            listo.innerText = "Listo!";
            mesa.append(listo);
            //dar funcionalidad al boton de empezar
        })

}

function renderMesa(mesa) {
    var div = document.createElement("div");
    div.id = `mesa${mesa.id_mesa}`;
    renderUsuarios(mesa.id_mesa, div);
    mesas.append(div);
}

function actualizarMesas() {
    fetch(`${path}/api/estadousuario/${usuario.login}`)
        .then((res) => res.text())
        .then((res) => {
            console.log(res);
            usuario.estaSentado = res == "sentado";
            console.log(usuario.estaSentado);
            fetch(`${path}/api/mesas`)
                .then((res) => res.json())
                .then((res) => {
                    mesas.innerHTML = "";
                    //sobrecogedor
                    for (let mesa of res) {
                        renderMesa(mesa);
                    }
                })
        })


}

function renderRanking(tipo) {
    fetch(`${path}/api/ranking/${tipo}`)
        .then((res) => res.json())
        .then((res) => {
            hacerLista(clasificacion, res);
        })
}


//rankings
renderRanking(0);

semana.addEventListener("click", () => {
    renderRanking(0);
})

mes.addEventListener("click", () => {
    renderRanking(1);
})

anno.addEventListener("click", () => {
    renderRanking(2);
})

//conectar socket
socket.on('connect', () => {
    usuario.socketid = socket.id;
    socket.emit('lobby', usuario);
});
//mantener lista usuarios conectados
socket.on('refrescarusuarios', (data) => {
    hacerLista(usuarios, data);

});
//chat
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

//crear mesa
if (usuario != "anonimo") {
    nuevaMesa.addEventListener("click", () => {
        if (usuario.estaSentado) {
            window.alert("Ya estas sentado en una mesa");
        } else {
            $('#nuevamesamodal').modal('show');
            var botpr = document.getElementById("botpr");
            botpr.addEventListener("click", () => {
                let priv = document.getElementById("privacidad");
                let clave = document.getElementById("clave")
                if (botpr.innerText == "Privada") {
                    botpr.setAttribute("class", "btn btn-success");
                    botpr.innerText = "Publica";
                    clave.setAttribute("disabled", "disabled");
                    priv.value = "1";
                } else {
                    botpr.setAttribute("class", "btn btn-danger");
                    botpr.innerText = "Privada";
                    clave.removeAttribute("disabled");
                    priv.value = "0";
                }
            })
        }
    })
}

//actualizar mesas
if (arg == "mc") {
    socket.emit("actualizarmesas");
} else {

    actualizarMesas();
}
socket.on('actualizarmesas', () => {
    actualizarMesas();
})