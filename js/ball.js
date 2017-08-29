function Ball(x, y, speed, width, identifier, points, hideObject){
  Actor.call(this, x, y, speed)
  this.width = width
  this.height = width
  this.identifier = identifier
  this._renderBall()
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
  var directions = ['NW', 'NE', 'SE', 'SW']
  var indexRandom = Math.floor(Math.random()*directions.length)
  return directions[indexRandom]
}

Ball.prototype.move = function(){
  switch (this.direction) {
    case 'NW': this.y -= 5; this.x -= 5; this._checkCollision(); break;
    case 'NE': this.y -= 5; this.x += 5; this._checkCollision(); break;
    case 'SE': this.y += 5; this.x += 5; this._checkCollision(); break;
    case 'SW': this.y += 5; this.x -= 5; this._checkCollision(); break;
  }
  this._render()
}

Ball.prototype._checkCollision = function(){
  // Ball hit the top
  if(this.y == 0){
    switch (this.direction) {
      case 'NW': this.direction = 'SW'; break;
      case 'NE': this.direction = 'SE'; break;
    }
  }

  // Ball hit on left
  if(this.x == 0){
    switch (this.direction) {
      case 'NW': this.direction = 'NE'; break;
      case 'SW': this.direction = 'SE'; break;
    }
  }

  // Ball hit on right
  if(this.x == board.width - this.width){
    switch (this.direction) {
      case 'NE': this.direction = 'NW'; break;
      case 'SE': this.direction = 'SW'; break;
    }
  }

  // Ball hit the floor
  if(this.y == board.height - this.height){
    switch (this.direction) {
      case 'SE': this.direction = 'NE'; break;
      case 'SW': this.direction = 'NW'; break;
    }
  }

  if(this.y == board.height - this.height){
    switch (this.direction) {
      case 'SE': this.direction = 'NE'; break;
      case 'SW': this.direction = 'NW'; break;
    }
  }

  if(this._hitTheShotOnRight()) {
    this.divideOnTwo()
  }

  if(this._hitTheShotOnLeft()){
    this.divideOnTwo()
  }
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

Ball.prototype.divideOnTwo = function(){
  $('#' + this.identifier).remove()

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
