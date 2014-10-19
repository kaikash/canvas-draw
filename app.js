(function() {
  var app, express, http, io, server;

  express = require('express');

  app = express();

  http = require('http');

  server = http.createServer(app);

  io = require('socket.io').listen(server);

  app.set('port', 1488);

  app.use(express["static"](__dirname + '/public_html'));

  io.sockets.on('connection', function(socket) {
    socket.on('draw', function(data) {
      return socket.broadcast.emit('draw', data);
    });
    return socket.on('disconnect', function() {
      return socket.broadcast.emit('clear');
    });
  });

  server.listen(app.get('port'), function() {
    return console.log('Server is running at ' + app.get('port') + ' port');
  });

}).call(this);
