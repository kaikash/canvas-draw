(function() {
  var canv, config, ctx, draw, md, socket;

  socket = io.connect('http://127.0.0.1:1488');

  config = {
    radius: 10,
    color: '#00ff00'
  };

  canv = document.getElementById('canv');

  canv.width = window.innerWidth;

  canv.height = window.innerHeight;

  ctx = canv.getContext('2d');

  md = false;

  canv.addEventListener('mousedown', function() {
    console.log('down');
    return md = true;
  });

  canv.addEventListener('mouseup', function() {
    console.log('up');
    return md = false;
  });

  canv.addEventListener('mousemove', function(e) {
    var position;
    position = {
      X: e.pageX,
      Y: e.pageY
    };
    console.log(position);
    if (md) {
      draw(position);
      return socket.emit('draw', position);
    }
  });

  draw = function(position) {
    ctx.beginPath();
    ctx.arc(position.X, position.Y, config.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = config.color;
    return ctx.fill();
  };

  socket.on('draw', function(data) {
    return draw(data);
  });

  socket.on('clear', function() {
    return canv.width = canv.width;
  });

}).call(this);
