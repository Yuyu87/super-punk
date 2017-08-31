function Ball(x, y, speed, width, identifier, board){
  Actor.call(this, x, y, speed)
  this.width = width
  this.height = width
  this.identifier = identifier
  this._renderBall(board)
  this.speedX = this._randomDirection()
  this.speedY = this._randomDirection()
  this._calculatePoints()
}

Ball.prototype = Object.create(Actor.prototype)
Ball.constructor = Ball

Ball.prototype._renderBall = function () {
  var $ball = $('<div>').attr('id', this.identifier).addClass('ball').css({
    position: 'absolute',
    top: this.y,
    left: this.x,
    height: this.height,
    width: this.width
  })
  $('#board').append($ball)
}

Ball.prototype._calculatePoints = function(){
  switch (this.width) {
    case 160: this.points = 100; break;
    case 80:  this.points = 200; break;
    case 40:  this.points = 300; break;
    case 20:  this.points = 400; break;
  }
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

Ball.prototype.restart = function(){ $('#' + this.identifier).remove() }

Ball.prototype.move = function(board, balls, shot){
  this.y += this.speedY
  this.x += this.speedX
  this._checkCollisionWithBoard(board, balls, shot)

  this._render()
}

Ball.prototype._checkCollisionWithBoard = function(board, balls, shot){
  if(this._hitBoardTop() || this._hitBoardBottom(board)) this.speedY*=-1
  if(this._hitBoardLeft() || this._hitBoardRight(board)) this.speedX*=-1
}

Ball.prototype._hitBoardTop = function(){ return this.y <= 0 }

Ball.prototype._hitBoardBottom = function(board){
  return this.y >= board.height - this.height
}

Ball.prototype._hitBoardLeft = function(){ return this.x <= 0 }

Ball.prototype._hitBoardRight = function(board){
  return this.x >= board.width - this.width
}

Ball.prototype.divideOnTwoOrDisappear = function(board, balls, shot){
  $('#' + this.identifier).remove()
  $('#' + shot.identifier).remove()

  if(this._hasHideObject()) this._showHideObject(board)

  if(this.width>20){
    balls.push(new Ball(this.x, this.y, this.speed,
      this.width/2, 'ball' + this.lastIdOn(balls)))
    balls.push(new Ball(this.x + this.width/2, this.y ,
      this.speed, this.width/2, 'ball' + this.lastIdOn(balls)))

    balls.splice(balls.indexOf(this), 1)
  }
}

Ball.prototype.lastIdOn = function (balls){
  return parseInt(balls[balls.length-1].identifier.slice(4)) + 1
}

Ball.prototype._hasHideObject = function (){
  return Math.round(Math.random()*10) + 1 > 7 && $('#hideObject').length == 0
}

Ball.prototype._showHideObject = function (board){
  var possibleObjects = ['beer', 'clock', 'drug']
  var indexRandom = Math.floor(Math.random()*possibleObjects.length)

  var $hideObject = $('<div>').attr('id', 'hideObject').addClass(possibleObjects[indexRandom] + ' animated fadeInDownBig').css({
    top: board.height - 30,
    left: this.x
  })
  $('#board').prepend($hideObject)
}

Ball.prototype.stopMovement = function (){
  this.speedX = 0
  this.speedY = 0
}

Ball.prototype.initMovement = function (speedX, speedY){
  this.speedX = speedX
  this.speedY = speedY
}
