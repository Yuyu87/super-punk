function Game(){
  this.board = new Board(400, 700, 100, 90)
  this.player1 = new Player(this.board.width/2 - 20, this.board.height - 60, 40, 60, 10, 3, 'player1', this.board)
  this.ballsSpeed = 5
  this._addFirstBall(this.board)
  this.shot
  this.intervalCounter = 0
  this.gameIntervalId
  this.createBallIntervalId
  this.intervalGameTime = 50
  this.intervalCreateBallTime = 10000
  this.numBallsHit = 0
  this.level = 1
  this._renderLevel()
  this.levelsToWin = 5
  this.gameTheme = new Audio('./audio/super_punk.ogg')
  this.audioExplosion = new Audio('./audio/explosion.wav')
  this.audioDie = new Audio('./audio/die.ogg')
}

Game.prototype.start = function(){
  this.gameTheme.play()
  this.gameIntervalId = setInterval(this.updateState.bind(this), this.intervalGameTime)
  this.createBallIntervalId = setInterval(this._addBall.bind(this), this.intervalCreateBallTime)
}

Game.prototype._restart = function(){
  this.gameTheme.play()
  this.intervalCounter = 0
  this.numBallsHit = 0
  this.player1.restart(this.board)
  if(this.exitsShot()) this.shot.restart()
  this.balls.forEach((ball)=>{ball.restart()})
  this._addFirstBall(this.board)
  clearInterval(this.intervalCreateBallTime)

  this.gameIntervalId = setInterval(this.updateState.bind(this), this.intervalGameTime)
}

Game.prototype.updateState = function(){
  this.intervalCounter++

  if(this.exitsShot()) this.shot.growUntilCollision(this.board)

  this.balls.forEach((ball)=>{
    if(this.exitsShot()) ball.move(this.board, this.balls, this, this.shot)
    else ball.move(this.board, this.balls)})

  this.balls.forEach((ball)=>{
    if(this.player1.ballHitPlayer(ball)){
      this.gameTheme.pause()
      this.audioDie.play()
      clearInterval(this.gameIntervalId)
      setTimeout(()=>{ this._restartOrFinish() }, 1500)
    }
    if(this.exitsShot())
      if(this.shot.hitBall(this.board, ball)){
        this.numBallsHit++
        this.shot.player.points += ball.points
        ball.divideOnTwoOrDisappear(this.board, this.balls, this.shot)
        this.audioExplosion.play()
      }
  })

  if($('#hideObject').length != 0) this.checkObject()

  this.player1.updatePoints()

  if(this.numBallsHit!=0 && this.numBallsHit % 5 === 0){
    this.level++
    this.ballsSpeed *= 1.5
    this._updateLevel()
    this.numBallsHit = 0
    this.balls.forEach((ball)=>{ ball.initMovement(
      parseInt((ball.speedX *= 1.5).toFixed(2)),
      parseInt((ball.speedY *= 1.5).toFixed(2)))})
  }

  if(this.level == this.levelsToWin){
    clearInterval(this.gameIntervalId)
    this._youWin()
  }
}

Game.prototype._renderLevel = function(){
  var $level = $('<div>').attr('id', 'level').css({
    top: this.board.top,
    left: this.board.left,
    position: 'relative',
    display: 'inline-block',
    height: 50,
    width: 200,
    margin: '5px'
  }).text('Level :' + this.level)
  $('body').append($level)
}

Game.prototype._updateLevel = function(){ $('#level').text('Level: ' + this.level) }

Game.prototype.exitsShot = function () {
  return $('#shot').length != 0
}

Game.prototype.lastIdOnBalls = function(){
  if(this.balls.length === 0) return 0
  else return parseInt(this.balls[this.balls.length-1].identifier.slice(4)) + 1
}

Game.prototype._addFirstBall = function(){
  this.balls = []
  this._addBall()
}

Game.prototype._addBall = function(){
  var ballWidth = this._randomBallWidth()
  var ballX = this._randomBallX(ballWidth)
  this.balls.push(new Ball(ballX, 100, this.ballsSpeed, ballWidth, 'ball' + this.lastIdOnBalls(), this.board))
}

Game.prototype._randomBallWidth = function(){
  var balldWidth = [80, 40]
  var indexRandom = Math.floor(Math.random()*balldWidth.length)

  return balldWidth[indexRandom]
}

Game.prototype._randomBallX = function(ballWidth){
  return Math.round(Math.random()* (this.board.width - ballWidth)) + 1
}

Game.prototype.createShot = function(){
  this.shot = new Shot(this.board, this.player1, 15, 0, 'shot')
}

Game.prototype.checkObject = function(){
  if($('#' + this.player1.identifier).collision('#hideObject').attr('id') == 'hideObject'){
    if($('#hideObject').hasClass('beer')){
      this.player1.speed2X()
      setTimeout(()=>{ this.player1.divideSpeedBy2() }, 5000)
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
  this._removeLevelAndPoints()

  var $finalInfo = this._createFinalMsgLevelPoints()

  $gameOver = $('<div>').attr('id', 'game-over').text('GAME OVER').addClass('final-msg')
  $gameOver.append($finalInfo)
  $('body').append($gameOver)

  this._addFollowIcons('#game-over')
}

Game.prototype._youWin = function(){
  this._cleanBoard()
  this._removeLevelAndPoints()

  var $finalInfo = this._createFinalMsgLevelPoints()

  $youWin = $('<div>').attr('id', 'you-win').text('YOU WIN').addClass('final-msg')
  $youWin.append($finalInfo)
  $('body').append($youWin)

  this._addFollowIcons('#you-win')
}

Game.prototype._addFollowIcons = function(idName){
  $(idName).append(
    '<a href="https://twitter.com/y4izus" target="_blank">' +
      '<img src="img/twitter.png" class="btn-twitter"></a>' +
    '<a href="https://linkedin.com/in/yaizagarciamm" target="_blank">' +
      '<img src="img/linkedin.png" class="btn-linkedin"></a>')
}

Game.prototype._createFinalMsgLevelPoints = function(){
  var $level = $('<p>').text('Level: ' + this.level)
  var $points = $('<p>').text('Total points: ' + this.player1.points)
  return $('<div>').append($level).append($points)
}

Game.prototype._removeLevelAndPoints = function () {
  $('#points').remove()
  $('#level').remove()
}

Game.prototype._cleanBoard = function(){
  this.gameTheme.pause()

  $('#' + this.player1.identifier).remove()
  if(this.exitsShot()) this.shot.restart()
  this.balls.forEach((ball)=>{ball.restart()})
  $('#board').remove()
}

Game.prototype._restartOrFinish = function () {
  if(this.player1.lifes>=0) this._restart()
  else this._gameOver()
}
