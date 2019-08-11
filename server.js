const WebSocketServer = require('websocket').server;
const http = require('http');
const port = 1337;

var server = http.createServer(function(req, res){
    res.write('Server is up.');
    res.end();
});
server.listen(port, function(){
    console.log('Server is listening on port ' + port);
});

var socket = new WebSocketServer({
    httpServer: server
});

let clients = [];

socket.on('request', function(req){
    let connection = req.accept(null, req.origin);
    clients.push(connection);
    console.log('connection opened');

    connection.on('message', function(message){
        // if(message.type === 'utf8'){
        //     // ping the user with the message
        //     console.log(message.utf8Data);
        //     connection.sendUTF('Your message: ' + message.utf8Data);
        // }

        // broadcast message to everyone
        clients.forEach((client) => {
            client.send(message.utf8Data);
        });
    });

    connection.on('close', function(connection){
        console.log('connection closed');
        // close user connection
    });
});