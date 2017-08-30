function Ball(x, y, speed, width, identifier, points, hideObject){
  Actor.call(this, x, y, speed)
  this.width = width
  this.height = width
  this.identifier = identifier
  this._renderBall()
  this.speedX = this._randomDirection()
  this.speedY = this._randomDirection()
  this.direction = this._randomDirection()
}

Ball.prototype = Object.create(Actor.prototype)
Ball.constructor = Ball

Ball.prototype._renderBall = function () {
  var $ball = $('<div>').attr('id', this.identifier).addClass('ball').css({
    position: "absolute",
    top: this.y,
    left: this.x,
    height: this.height,
    width: this.width
  })
  $('#board').append($ball)
}

Ball.prototype._render = function(){
  $('#' + this.identifier).css({
    left: this.x,
    top: this.y
  })
}

Ball.prototype._randomDirection = function() {
  var directions = [this.speed, this.speed*-1]
  var indexRandom = Math.floor(Math.random()*directions.length)

  return directions[indexRandom]
}

Ball.prototype.move = function(){
  this.y += this.speedY
  this.x += this.speedX
  this._checkCollision()

  this._render()
}

Ball.prototype._checkCollision = function(){
  if(this._hitBoardTop() || this._hitBoardBottom()) this.speedY*=-1
  if(this._hitBoardLeft() || this._hitBoardRight()) this.speedX*=-1

  if(this._hitTheShotOnRight()) this.divideOnTwoOrDisappear()
  if(this._hitTheShotOnLeft()) this.divideOnTwoOrDisappear()
}

Ball.prototype._hitTheShotOnRight = function(){
  if($('#shot').length != 0)
    if(this.x == shot.x + shot.width && this.y > board.height - shot.height)
      return true
  else return false
}

Ball.prototype._hitTheShotOnLeft = function(){
  if($('#shot').length != 0)
    if(this.x + this.width == shot.x && this.y > board.height - shot.height)
      return true
  else return false
}

Ball.prototype._hitBoardTop = function(){
  return this.y == 0
}

Ball.prototype._hitBoardBottom = function(){
  return this.y == board.height - this.height
}

Ball.prototype._hitBoardLeft = function(){
  return this.x == 0
}

Ball.prototype._hitBoardRight = function(){
  return this.x == board.width - this.width
}

Ball.prototype.divideOnTwoOrDisappear = function(){
  $('#' + this.identifier).remove()
  $('#' + shot.identifier).remove()

  if(this.width>20){
    balls.push(new Ball(this.x, this.y, this.speed,
      this.width/2, 'ball' + this._lastIdOn(balls)))
    balls.push(new Ball(this.x + this.width/2, this.y ,
      this.speed, this.width/2, 'ball' + this._lastIdOn(balls)))

    balls.splice(balls.indexOf(this), 1)
  }
}

Ball.prototype._lastIdOn = function (){
  return parseInt(balls[balls.length-1].identifier.slice(4)) + 1
}
