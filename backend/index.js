const http = require('http');
const app = require('./app');

// création du serveur express.js
app.set('port', process.env.PORT || 4000);
const server = http.createServer(app);
const socketio = require('socket.io');

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket) => {
    console.log("new client connected");

    socket.on('joinRoom', (room, url) => {
        console.log("the room in join : ", room);

        const test = userLeave(socket.id);
        const index = users.findIndex(user => user.room === room);
        const user = []
        if (index == -1) {
            socket.emit('authorORnot', true)
            const user = userJoin(socket.id, room, url, true);
            socket.join(user.room);
        } else {
            socket.emit('authorORnot', false)
            const user = userJoin(socket.id, room, url, false);
            socket.join(user.room);
            console.log("you re got an invitation")
        }

        console.log(users)

        socket.broadcast.to(user.room).emit('info', "has joined the chat " + room);

    });
    socket.on('time', data => {
        console.log(data)
        const index = users.findIndex(user => user.id === socket.id);
        const USER = users[index]
        socket.broadcast.to(USER.room).emit('videoT', { time: data.time, event: data.event }); // only send to other viewver
    })
    socket.on('tempsReel', data => {
        //console.log(data)
        const index = users.findIndex(user => user.id === socket.id);
        const USER = users[index]
        socket.broadcast.to(USER.room).emit('temps', data);
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            // Send users and room info
            io.to(user.room).emit('info', "il a été deconnecté");
            console.log(users)
            if (users[0]) {
                users[0].author = true
                socket.broadcast.to(users[0].id).emit('authorORnot', true)
            }
        }
    });
})

const users = [];

function userJoin(id, room, url, author) {
    const user = { id, room, url, author };
    users.push(user);
    return user;
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

server.listen(process.env.PORT || 4000);