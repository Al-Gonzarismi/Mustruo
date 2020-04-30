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
        let datos;
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
        console.log("desconexion");
        userDesconectado = jugadores.filter((user) => {
            return user.socketid == socket.id;
        })[0];
        jugadores = usuarios.filter((user) => {
            return user != userDesconectado;
        });
        let datos;
        datos.mesa = userDesconectado.id_mesa;
        datos.users = jugadores.filter((us) => {
            return us.id_mesa == datos.mesa;
        });
        io.emit('refrescarusuarios', datos);
    });

    socket.on('chatpartida:message', (data) => {
        io.emit('chatpartida:message', data);
    })

})