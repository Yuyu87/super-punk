function Shot(board, player, speed, height, identifier){
  Actor.call(this, player.x + player.width/2, board.height, speed)
  this.height = height
  this.width = 5
  this.player = player
  this.identifier = identifier
  this._renderShot()
}

Shot.prototype = Object.create(Actor.prototype)
Shot.constructor = Shot

Shot.prototype._renderShot = function() {
  var $shot = $('<div>').attr('id', this.identifier).css({
    top: this.y,
    left: this.x,
    height: this.height,
    width: this.width,
    position:'absolute',
    border: '2px solid black',
    background: 'green'})
  $('#board').prepend($shot)
}

Shot.prototype._render = function(){
  $('#' + this.identifier).css({
    top: this.y,
    left: this.x,
    height: this.height
  })
}

Shot.prototype.restart = function(){ $('#' + this.identifier).remove() }

Shot.prototype.growUntilCollision = function (board){
  this.y -= this.speed
  this.height = board.height - this.y

  this._render()

  if(this._hitBoardTop()) $('#' + this.identifier).remove()
}

Shot.prototype._hitBoardTop = function(){ return this.y <= 0 }

Shot.prototype.hitBall = function (board, ball){
  if($('#' + ball.identifier).collision('#' + this.identifier).attr('id') == this.identifier){
    $('#' + this.identifier).remove()
    return true
  }

  if(this._hitTheShotOnRight(board, ball) || this._hitTheShotOnLeft(board, ball)){
    $('#' + this.identifier).remove()
    return true
  }

  return false
}

Shot.prototype._hitTheShotOnRight = function(board, ball){
  return ball.x == this.x + this.width && ball.y > board.height - this.height
}

Shot.prototype._hitTheShotOnLeft = function(board, ball){
  return ball.x + ball.width == this.x && ball.y > board.height - this.height
}
