function Game(){
  this.board = new Board(400, 700, 40, 40)
  this.player1 = new Player(this.board.width/2 - 20, this.board.height - 60, 40, 60, 5, 3, 'player1', this.board)
  this._addFirstBall(this.board)
  this.shot
  this.intervalCounter = 0
  this.gameIntervalId
  this.intervalTime = 50
}

Game.prototype.start = function(){
  this.gameIntervalId = setInterval(this.updateState.bind(this), this.intervalTime);
}

Game.prototype._restart = function(){
  this.player1.restart(this.board)
  if(this._exitsShot()) this.shot.restart()
  this.balls.forEach((ball)=>{ball.restart()})
  this._addFirstBall(this.board)

  this.gameIntervalId = setInterval(this.updateState.bind(this), this.intervalTime);
}

Game.prototype.updateState = function(){
  this.intervalCounter++

  if(this._exitsShot()) this.shot.growUntilCollision(this.board)

  this.balls.forEach((ball)=>{
    if(this._exitsShot()) ball.move(this.board, this.balls, this.shot)
    else ball.move(this.board, this.balls)})

  this.balls.forEach((ball)=>{
    if(this.player1.ballHitPlayer('#' + ball.identifier)){
      clearInterval(this.gameIntervalId)
      this.intervalCounter = 0
      if(this.player1.lifes>=0) this._restart()
      else this._gameOver()
    }
    if($('#shot').length != 0)
      if(this.shot.ballHitShot('#' + ball.identifier)){
        this.shot.player.points += ball.points
        ball.divideOnTwoOrDisappear(this.board, this.balls, this.shot)
      }
  })

  if($('#hideObject').length != 0) this.checkObject()
  this.player1.updatePoints()

  if(this.intervalCounter % 200 === 0)
    setTimeout(()=>{
      this.balls.push(new Ball(200, 100, 5, 80, 'ball' + this.lastIdOnBalls()))
    }, 1000)
}

Game.prototype._gameOver = function(){
  $('#' + this.player1.identifier).remove()
  if(this._exitsShot()) this.shot.restart()
  this.balls.forEach((ball)=>{ball.restart()})
  $('#board').remove()

  $gameOver = $('<div>').attr('id', 'game-over').text('GAME OVER')
  $('body').append($gameOver)
}

Game.prototype._exitsShot = function () {
  return $('#shot').length != 0
}

Game.prototype.lastIdOnBalls = function(){
  return parseInt(this.balls[this.balls.length-1].identifier.slice(4)) + 1
}

Game.prototype._addFirstBall = function(){
  this.balls = []
  this.balls.push(new Ball(200, 100, 5, 80, 'ball' + this.balls.length, this.board))
}

Game.prototype.createShot = function(){
  this.shot = new Shot(this.board, this.player1, 15, 0, 'shot')
}

Game.prototype.checkObject = function(){
  if($('#' + this.player1.identifier).collision('#hideObject').attr('id') == 'hideObject'){
    if($('#hideObject').hasClass('beer')){
      this.player1.speed2X()
      setTimeout(()=>{ this.player1.divideSpeedBy2() }, 5000);
    }

    if($('#hideObject').hasClass('clock')){
      var ballNormalSpeedX = this.balls[0].speedX
      var ballNormalSpeedY = this.balls[0].speedY

      this.balls.forEach((ball)=>{ball.stopMovement() })

      setTimeout(()=>{
        this.balls.forEach((ball)=>{ ball.restartMovement(ballNormalSpeedX, ballNormalSpeedY)})
      }, 5000);
    }

    if($('#hideObject').hasClass('drug')){
      this.balls.forEach((ball)=>{
        $('#' + ball.identifier).addClass('animated wobble').css({
        '-webkit-animation-iteration-count': 'infinite',
        '-moz-animation-iteration-count': 'infinite'})})

      setTimeout(()=>{
        this.balls.forEach((ball)=>{$('#' + ball.identifier).removeClass('animated').removeClass('lightSpeedOut') })
      }, 5000)
    }
    $('#hideObject').remove()
  }
}
