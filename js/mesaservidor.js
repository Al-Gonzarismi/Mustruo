const express = require('express');
const app = express();

//settings
app.set('port', 3333);

//start server
const server = app.listen(app.get('port'), () => {
    console.log("server on port", app.get('port'));
})

//websockets
const socketIo = require('socket.io');
const io = socketIo(server);
var jugadores = [];
io.on('connection', (socket) => {
    console.log(`usuario ${socket.id} conectado`);
    socket.on('partida', (data) => {
        jugadores.push(data);
        let datos = new Object();
        datos.users = jugadores.filter((us) => {
            return us.id_mesa == data.id_mesa;
        });
        datos.users = datos.users.sort((a, b) => {
            if (a.login.toLowerCase() < b.login.toLowerCase()) {
                return -1;
            }
            return 1;
        });
        datos.mesa = data.id_mesa;
        io.emit('refrescarusuarios', datos)
    })

    socket.on('disconnect', () => {
        userDesconectado = jugadores.filter((user) => {
            return user.socket_id == socket.id;
        })[0];
        jugadores = jugadores.filter((user) => {
            return user != userDesconectado;
        });
        let datos = new Object();
        datos.mesa = userDesconectado.id_mesa;
        datos.users = jugadores.filter((us) => {
            return us.id_mesa == datos.mesa;
        });
        io.emit('refrescarusuarios', datos);
    });

    socket.on('chatpartida:message', (data) => {
        io.emit('chatpartida:message', data);
    })

    socket.on('interaccion', (data) => {
        io.emit('interaccion', data);
    })

    socket.on('actualizarMarcadores', (data) => {
        io.emit('actualizarMarcadores', data);
    })

    socket.on('showdown', (data) => {
        io.emit('showdown', data);
    })

})