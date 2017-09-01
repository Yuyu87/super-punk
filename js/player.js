function Player(x, y, width, height, speed, lifes, identifier, board){
  Actor.call(this, x, y, speed)
  this.width = width
  this.height = height
  this.lifes = lifes
  this.identifier = identifier
  this.points = 0
  this._renderPlayer()
  this._renderLifes(board)
  this._renderPoints(board)
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

Player.prototype._renderLifes = function(board){
  var $life
  for(var i = 0; i < this.lifes; i++){
    $life = $('<div>').attr('id', 'life' + (i + 1)).css({
      top: board.top,
      left: board.left,
      position: 'relative',
      display: 'inline-block',
      height: 50,
      width: 30,
      margin: '5px'
    }).addClass('life')
    $('body').append($life)
  }
}

Player.prototype._renderPoints = function(board){
  var $points = $('<div>').attr('id', 'points').css({
    top: board.top,
    left: board.left,
    position: 'relative',
    display: 'inline-block',
    height: 50,
    width: 200,
    margin: '5px'
  }).text(this.points + ' pts')
  $('body').append($points)
}

Player.prototype.updatePoints = function(){ $('#points').text(this.points + ' pts') }

Player.prototype._render = function(){
  $('#' + this.identifier).css({left: this.x})
}

Player.prototype.restart = function(board){
  this.x = board.width/2 - this.width/2
  this._render()
}

Player.prototype.move = function (direction) {
  switch (direction) {
    case 'left':  this.x -= this.speed; break;
    case 'right': this.x += this.speed; break;
  }
  this._render()
}

Player.prototype.ballHitPlayer = function(ball){
  if($('#' + ball.identifier).collision('#' + this.identifier).attr('id') == this.identifier){
    if(this._borderCollisionCircleRectangle(ball)){
      $('#life' + this.lifes).remove()
      this.lifes--
      return true
    }
  }
  return false
}

Player.prototype._borderCollisionCircleRectangle = function (ball){
  var dxLeft = (ball.x + ball.width/2) - this.x
  var dyLeft = (ball.y + ball.width/2) - this.y

  var dxRight = (ball.x + ball.width/2) - (this.x + this.width)
  var dyRight = (ball.y + ball.width/2) - this.y

  var distanceLeft = Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft)
  var distanceRight = Math.sqrt(dxRight * dxRight + dyRight * dyRight)

  if (distanceLeft <= ball.width/2 || distanceRight <= ball.width/2)
      return true
      
  return false
}

Player.prototype.speed2X = function (){ this.speed *= 2 }

Player.prototype.divideSpeedBy2 = function (){ this.speed /= 2 }
