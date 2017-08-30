function Player(x, y, width, height, speed, lifes, identifier){
  Actor.call(this, x, y, speed)
  this.width = width
  this.height = height
  this.lifes = lifes
  this.identifier = identifier
  this._renderPlayer()
  this._renderLifes()
}

Player.prototype = Object.create(Player.prototype)
Player.constructor = Player

Player.prototype._renderPlayer = function(){
  var $player = $('<div>').attr('id', this.identifier).css({
    position: "absolute",
    top: this.y,
    left: this.x,
    width: this.width,
    height: this.height
  }).addClass('player')
  $('#board').append($player)
}

Player.prototype._renderLifes = function(){
  var $life
  for(var i = 0; i < this.lifes; i++){
    $life = $('<div>').attr('id', 'life' + (i + 1)).css({
      top: board.top,
      position: 'relative',
      display: 'inline-block',
      height: 50,
      width: 30,
      margin: '5px'
    }).addClass('life')
    $('body').append($life)
  }
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

Player.prototype.ballHitPlayer = function(ballId){
  if($(ballId).collision('#' + this.identifier).attr('id') == this.identifier){
    $('#life' + this.lifes).remove()
    this.lifes--
    return true
  }
  return false
}
