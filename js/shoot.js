function Shot(board, player, speed, height, identifier){
  Actor.call(this, player.x + player.width/2, board.height, speed)
  this.height = height
  this.width = 5
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
    background: 'green'});
  $('#board').append($shot);
}

Shot.prototype._render = function(){
  $('#' + this.identifier).css({
    top: this.y,
    left: this.x,
    height: this.height
  })
}

Shot.prototype.growUntilCollision = function (){
  var collision = false

  if(!collision){
    this.y -= this.speed
    this.height = board.height - this.y

    this._render()

    if(this.y == 0 || this._ballCollision()){
      collision = true
      $('#' + this.identifier).remove()
    }
  }
}

Shot.prototype._ballCollision = function (){
  var collision = false

  for(var i=0; i<balls.length && !collision; i++){
    if(this.y == balls[i].y + balls[i].width && (this.x>balls[i].x && this.x < balls[i].x + balls[i].width)){
      collision = true
      balls[i].divideOnTwo()
    }
  }
  return collision
}
