function Game(){
  this.board = new Board(400, 700, 40, 40)
  this.player1 = new Player(this.board.width/2 - 20, this.board.height - 60, 40, 60, 5, 3, 'player1', this.board)
  this._addFirstBall(this.board)
  this.shot
  this.intervalCounter = 0
  this.gameIntervalId
  this.createBallIntervalId
  this.intervalGameTime = 50
  this.intervalCreateBallTime = 10000
  this.numBallsHit = 0
  this.level = 0
  this.levelsToWin = 5
  this.ballsSpeed = 5
}

Game.prototype.start = function(){
  this.gameIntervalId = setInterval(this.updateState.bind(this), this.intervalGameTime)
  this.createBallIntervalId = setInterval(this._addBall.bind(this), this.intervalCreateBallTime)
}

Game.prototype._restart = function(){
  this.intervalCounter = 0
  this.numBallsHit = 0
  this.player1.restart(this.board)
  if(this.exitsShot()) this.shot.restart()
  this.balls.forEach((ball)=>{ball.restart()})
  this._addFirstBall(this.board)

  this.gameIntervalId = setInterval(this.updateState.bind(this), this.intervalGameTime)
}

Game.prototype.updateState = function(){
  this.intervalCounter++

  if(this.exitsShot()) this.shot.growUntilCollision(this.board)

  this.balls.forEach((ball)=>{
    if(this.exitsShot()) ball.move(this.board, this.balls, this, this.shot)
    else ball.move(this.board, this.balls)})

  this.balls.forEach((ball)=>{
    if(this.player1.ballHitPlayer('#' + ball.identifier)){
      clearInterval(this.gameIntervalId)
      if(this.player1.lifes>=0) this._restart()
      else this._gameOver()
    }
    if(this.exitsShot())
      if(this.shot.hitBall(this.board, ball)){
        this.numBallsHit++
        this.shot.player.points += ball.points
        ball.divideOnTwoOrDisappear(this.board, this.balls, this.shot)
      }
  })

  if($('#hideObject').length != 0) this.checkObject()

  this.player1.updatePoints()

  if(this.numBallsHit!=0 && this.numBallsHit % 5 === 0){
    this.level++
    this.numBallsHit = 0
    console.log('NIVEL ' + this.level)
    this.balls.forEach((ball)=>{ ball.initMovement(
      parseInt((ball.speedX *= 1.1).toFixed(2)),
      parseInt((ball.speedY *= 1.1).toFixed(2)))})
  }

  if(this.level == this.levelsToWin){
    clearInterval(this.gameIntervalId)
    this._youWin()
  }
}

Game.prototype.exitsShot = function () {
  return $('#shot').length != 0
}

Game.prototype.lastIdOnBalls = function(){
  return parseInt(this.balls[this.balls.length-1].identifier.slice(4)) + 1
}

Game.prototype._addFirstBall = function(){
  this.balls = []
  this.balls.push(new Ball(200, 100, 5, 80, 'ball' + this.balls.length, this.board))
}

Game.prototype._addBall = function(){
  this.balls.push(new Ball(200, 100, 5, 80, 'ball' + this.lastIdOnBalls()))
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
        this.balls.forEach((ball)=>{ ball.initMovement(ballNormalSpeedX, ballNormalSpeedY)})
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

Game.prototype._gameOver = function(){
  this._cleanBoard()

  $gameOver = $('<div>').attr('id', 'game-over').text('GAME OVER')
  $('body').append($gameOver)
}

Game.prototype._youWin = function(){
  this._cleanBoard()

  $youWin = $('<div>').attr('id', 'you-win').text('YOU WIN')
  $('body').append($youWin)
}

Game.prototype._cleanBoard = function(){
  $('#' + this.player1.identifier).remove()
  if(this.exitsShot()) this.shot.restart()
  this.balls.forEach((ball)=>{ball.restart()})
  $('#board').remove()
}
