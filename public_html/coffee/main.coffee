socket = io.connect 'http://127.0.0.1:1488'

config =
  radius: 10
  color: '#00ff00'

canv = document.getElementById 'canv'
canv.width = window.innerWidth
canv.height = window.innerHeight
ctx = canv.getContext('2d');

md = false
canv.addEventListener 'mousedown', () ->
  console.log 'down'
  md = true
canv.addEventListener 'mouseup', () ->
  console.log 'up'
  md = false

canv.addEventListener 'mousemove', (e) ->
  position =
    X: e.pageX
    Y: e.pageY
  console.log position
  if md
    draw position
    socket.emit 'draw', position

draw = (position) ->
  ctx.beginPath()
  ctx.arc position.X, position.Y, config.radius, 0, 2*Math.PI, false
  ctx.fillStyle = config.color
  ctx.fill()

socket.on 'draw', (data) ->
  draw data

socket.on 'clear', () ->
  canv.width = canv.width
