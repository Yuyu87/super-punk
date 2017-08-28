function Player(x, y, speed, lifes){
  Actor.call(this, x, y, speed)
  this.shot = new Shot()
  this.lifes = lifes
}

Player.prototype = Object.create(Player.prototype)
Player.constructor = Player

Player.prototype.moveLeft = function () {
  this.y -= this.speed
}

Player.prototype.moveRight = function () {
  this.y += this.speed
}

Player.prototype.shoot = function() {
  var boardHeight = parseInt($('#board').css('height'))
  var playerWidth = parseInt($('.player').css('width'))

  this.shot.x = boardHeight
  this.shot.y = this.x - player1Width/2
  this.shot.speed = this.speed

  var $shot = $('<div>').attr('id','shot');
  var boardHeight = parseInt($('#board').css('height'))
  $shot.css({top:boardHeight, left: this.y + playerWidth/2, height: '0px', width: '5px', position:'absolute', background: 'green'});
  $('#board').append($shot);
}
