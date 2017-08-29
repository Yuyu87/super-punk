function Player(x, y, width, speed, lifes, identifier){
  Actor.call(this, x, y, speed)
  this.width = width
  this.lifes = lifes
  this.identifier = identifier
  this._renderPlayer()
}

Player.prototype = Object.create(Player.prototype)
Player.constructor = Player

Player.prototype._renderPlayer = function(){
  var $player = $('<div>').attr('id', this.identifier).css({
    position: "absolute",
    top: this.y,
    left: this.x
  }).addClass('player')
  $('#board').append($player)
}

Player.prototype._render = function(){
  $('#' + this.identifier).css({left: this.x})
}

Player.prototype.move = function (direction) {
  switch (direction) {
    case 'left':  this.x -= this.speed; break;
    case 'right': this.x += this.speed; break;
  }
  this._render()
}
