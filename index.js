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

        // //send to all client, excpet us
        // socket.broadcast.emit('data', data);

        // //send to us only
        // socket.emit ('data', data);
     })

});