//setp 2 setup
let express = require ('express');
let app = express();
app.use('/', express.static ('public'));

//http server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT ||3000;

server.listen(port, () => {
    console.log('Server is listening at localhost: 3000');
})

//Step 3. socket connections
let io = require('socket.io');
io = new io.Server(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('A new client connected with the id:' + socket.id);

     //STEP 6. listen for data coming in
     socket.on('data', (data) =>{
        ///send data back to the client
        console.log(data);
        //step 7. send to all clients, including us
        io.emit ('data', data);
     })
       //on disconnect
    socket.on('disconnect', () => {
    console.log('A client disconnected: ' + socket.id);
  });
});

//PRIVATE NAMESPACE
let private = io.of('/private');

private.on('connection', (socket) => {
    console.log(socket.id);
    console.log('A new client connected with the id:' + socket.id);

     //STEP 6. listen for data coming in
     socket.on('data', (data) =>{
        ///send data back to the client
        console.log(data);
        //step 7. send to all clients, including us
        private.to(socket.room).emit('data', data);
     });
     
        socket.on('room-name', (data)=>{
        console.log(data);
    
        //add socket to room
        socket.join(data.room);
        //add room property to the socket
        socket.room = data.room;
    
        //send the message to user
        socket.emit('joined', {msg: `Welcome to ${data.room} room!`});
      })


    //on disconnect
    socket.on('disconnect', () => {
    console.log('A client disconnected: ' + socket.id);

    //leave room
    socket.leave(socket.room);
  });
});