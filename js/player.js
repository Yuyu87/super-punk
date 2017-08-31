function Player(x, y, width, height, speed, lifes, identifier){
  Actor.call(this, x, y, speed)
  this.width = width
  this.height = height
  this.lifes = lifes
  this.identifier = identifier
  this.points = 0
  this._renderPlayer()
  this._renderLifes()
  this._renderPoints()
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

Player.prototype._renderPoints = function(){
  var $points = $('<div>').attr('id', 'points').css({
      top: board.top,
      position: 'relative',
      display: 'inline-block',
      height: 50,
      width: 30,
      margin: '5px'
    }).text(this.points)
    $('body').append($points)
}

Player.prototype.updatePoints = function(){
  $('#points').text(this.points)
}

Player.prototype._render = function(direction){
  $('#' + this.identifier).css({left: this.x})
  // $('#' + this.identifier).css({left: this.x}).removeClass().addClass('player').addClass('walk-' + direction)
}

Player.prototype.restart = function(){
  this.x = board.width/2 - this.width/2
}

Player.prototype.move = function (direction) {
  switch (direction) {
    case 'left':  this.x -= this.speed; this._render('left'); break;
    case 'right': this.x += this.speed; this._render('right'); break;
  }

}

Player.prototype.ballHitPlayer = function(ballId){
  if($(ballId).collision('#' + this.identifier).attr('id') == this.identifier){
    $('#life' + this.lifes).remove()
    this.lifes--
    return true
  }
  return false
}

Player.prototype.speed2X = function (){
  this.speed *= 2
}

Player.prototype.divideSpeedBy2 = function (){
  this.speed /= 2
}
