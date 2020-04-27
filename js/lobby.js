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
var btnlevantarse = document.getElementById("levantarse");
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
    var container = document.createElement("div");
    var previo = "";
    for (let i = 0; i < data.length; i++) {
        let login = data[i].login;
        let puntos = data[i].puntos;
        if (login != previo) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            if (zona == clasificacion) {
                div.setAttribute("class", "rank");
                switch (i) {
                    case 0:
                        div.innerHTML = `<a>${login}</a><div class='puntos'><img src='${path}/media/oro.png'><span>${puntos}pts</span><div>`;
                        break;
                    case 1:
                        div.innerHTML = `<a>${login}</a><div class='puntos'><img src='${path}/media/plata.png'><span>${puntos}pts</span><div>`;
                        break;
                    case 2:
                        div.innerHTML = `<a>${login}</a><div class='puntos'><img src='${path}/media/bronce.png'><span>${puntos}pts</span><div>`;
                        break;
                    default:
                        div.innerHTML = `<a>${login}</a><div class='puntos'><span>${puntos}pts</span><div>`;
                        break;
                }
            } else {
                div.setAttribute("class", "online");
                div.innerHTML = `<a>${login}</a>`;
            }

            li.append(div);
            container.append(li);
            li.addEventListener("click", () => {
                encabezadoEstadisiticas.innerHTML = `Estadísticas de <a href="${path}/perfil/${login}">${login}</a>`;
                renderStats(login);
            });
            previo = login;
        }
    }
    zona.innerHTML = "";
    zona.append(container);
}

function levantarse() {
    if (usuario.estaSentado) {
        fetch(`${path}/api/levantarse/${usuario.mesa_id}/${usuario.posicion}/${usuario.login}`)
            .then((res) => res.text())
            .then((res) => {
                if (res == "ok") {
                    //sockets:probablemente mejorable
                    socket.emit('actualizarmesas');
                } else {
                    window.alert("falla levantarse");
                }
            })
    }
}

function sentarse(id, i) {
    fetch(`${path}/api/sentarse/${id}/${i}/${usuario.login}`)
        .then((res) => res.text())
        .then((res) => {
            console.log(res);
            if (res != "nook") {
                //sockets:probablemente mejorable
                socket.emit("actualizarmesas");
            } else {
                window.alert("falla sentarse");
            }
        })
}

function crearAsientos(id, mesa, i) {
    let asiento = document.createElement("div");
    asiento.setAttribute("class", `posicion${i} asiento`);
    let img = document.createElement("img");
    let span = document.createElement("span");
    span.innerText = "";
    img.setAttribute("src", `${path}/media/asientolibre.PNG`);//poner imagen y adaptar ruta    
    img.addEventListener("click", () => {
        if (usuario != "anonimo") {
            if (img.getAttribute("src") == `${path}/media/asientolibre.PNG`) {
                if (!usuario.estaSentado) {
                    sentarse(id, i);
                } else {
                    window.alert("Ya estas sentado en otro lugar");
                }
            } else {
                encabezadoEstadisiticas.innerHTML = `Estadísticas de <a href="${path}/perfil/${span.innerText}">${span.innerText}</a>`;
                renderStats(span.innerText);
            }
        } else {
            window.alert("Tienes que estar conectado");
        }
    });
    asiento.append(img);
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
                mesa.childNodes[usu.posicion].setAttribute("id", "bloqueUsu");
                let asiento = mesa.childNodes[usu.posicion];
                asiento.childNodes[0].setAttribute("src", `${path}/media/avatares/${usu.imagen}`);
                asiento.childNodes[1].innerText = usu.login;
            }
            if (usuario.mesa_id == id && usuario.listo) {
                var listo = document.createElement("button");
                listo.setAttribute("class", "listo btn boton-morado");
                listo.innerText = "Listo!";
                console.log(mesa.childNodes[1]);
                mesa.append(listo);
                listo.addEventListener("click", ()=>{
                    socket.emit("empezarpartida", usuario.mesa_id);
                })
            }
            
        })

}

function renderMesa(mesa, container) {
    var div = document.createElement("div");
    div.id = `mesa${mesa.id_mesa}`;
    div.setAttribute("class", "itemMesa");
    renderUsuarios(mesa.id_mesa, div);
    container.append(div);
}

function actualizarMesas() {
    fetch(`${path}/api/estadousuario/${usuario.login}`)
        .then((res) => res.json())
        .then((res) => {
            usuario.estaSentado = res.posicion >= 0;
            if (usuario.estaSentado) {
                usuario.posicion = res.posicion;
                usuario.mesa_id = res.mesa_id;
                usuario.listo = usuario.posicion == 0 && res.jugadores_mesa == 4;
            } else {
                usuario.posicion = -1;
                usuario.mesa_id = -1;
            }
            fetch(`${path}/api/mesas`)
                .then((res) => res.json())
                .then((res) => {
                    var container = document.createElement("div");
                    for (let mesa of res) {
                        renderMesa(mesa, container);
                    }
                    mesas.innerHTML = "";
                    mesas.append(container);
                    if (usuario.estaSentado) {
                        btnlevantarse.setAttribute("class", "btn boton-morado dejarMesa");
                    } else {
                        btnlevantarse.setAttribute("class", "btn boton-morado hidden");
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

//crear mesa y levantarse de mesa
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
    btnlevantarse.addEventListener("click", levantarse);
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

//empezar partida
socket.on("empezarpartida", (data)=>{
    if (usuario.mesa_id == data) {
        window.location=`${path}/mesa/${data}`;
    }
})
