function Shot(board, player, speed, height, identifier){
  Actor.call(this, player.x + player.width/2, board.height, speed)
  this.height = height
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
    width: '5px',
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

Shot.prototype.growUntilCollision = function (board, balls){
  var collision = false

  if(!collision){
    this.y -= this.speed
    this.height = board.height - this.y

    this._render()

    if(this.y == 0 || this._ballCollision(balls)){
      collision = true
      $('#' + this.identifier).remove()
    }
  }
}

Shot.prototype._ballCollision = function (balls){
  var collision = false

  for(var i=0; i<balls.length; i++){
    if(this.y == balls[i].y + balls[i].width && (this.x<balls[i].x + balls[i].width && this.x < balls[i].x + balls[i].width)){
      collision = true

      $('#' + balls[i].identifier).remove()

      if(balls[i].width>20){
        balls.push(new Ball(balls[i].x, balls[i].y, balls[i].speed,
          balls[i].width/2, 'ball' + this._lastIdOn(balls)))
        balls.push(new Ball(balls[i].x + balls[i].width/2, balls[i].y ,
          balls[i].speed, balls[i].width/2, 'ball' + this._lastIdOn(balls)))

        balls.splice(i, 1);
      }
    }
  }
  return collision
}

Shot.prototype._lastIdOn = function (balls){
  return parseInt(balls[balls.length-1].identifier.slice(4)) + 1
}
