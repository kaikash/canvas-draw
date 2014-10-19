express = require 'express'
app = express()
http = require 'http'
server = http.createServer app
io = require('socket.io').listen server

app.set 'port', 1488
app.use express.static __dirname + '/public_html'

io.sockets.on 'connection', (socket) ->
  socket.on 'draw', (data) ->
    socket.broadcast.emit 'draw', data

  socket.on 'disconnect', () ->
    socket.broadcast.emit 'clear'

server.listen app.get('port'), () -> 
  console.log 'Server is running at ' + app.get('port') + ' port'