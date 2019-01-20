var  express = require('express'),
     app = express(),
     server = require('http').createServer(app),
     io = require('socket.io').listen(server);
   

var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get('/Acc', function (req, res) {/* si je saisie l adresse localhost:8081/Acc je charge la page indexAcc.html*/
  res.sendfile(__dirname + '/indexAcc.html');
});

app.get('/Can', function (req, res) {/* si je saisie l adresse localhost:8081/Acc je charge la page indexCan.html*/
  res.sendfile(__dirname + '/indexCan.html');
});

io.sockets.on('connection', function (socket) {//je demarre la connexion
    socket.on('message', function (message) {//je recois le message par la socket
        io.emit('position',message);//je difuse le message à l'ensemble des pages
    });
});

server.listen(port);//le serveur ecoute sur le port 8081
