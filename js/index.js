var board = new Board(400, 700, 40, 40)
var player1 = new Player(board.width/2 - 20, board.height - 60, 40, 60, 5, 3, 'player1')
var balls = []
balls.push(new Ball(200, 100, 5, 80, 'ball' + balls.length))
var shot

var intervalTime = 50
var game
$(document).ready(function() {
  game = setInterval(updateGame, intervalTime)
})

function updateGame(){
  if($('#shot').length != 0) shot.growUntilCollision()
  balls.forEach((ball)=>{ball.move()})
  balls.forEach((ball)=>{
    if(player1.ballHitPlayer('#' + ball.identifier)){
      clearInterval(game)
      if(player1.lifes>=0)restartGame()
      else gameOver()
    }
    if($('#shot').length != 0)
      if(shot.ballHitShot('#' + ball.identifier)){
        shot.player.points += ball.points
        ball.divideOnTwoOrDisappear()
      }
  })
  if($('#hideObject').length != 0) checkObject()
  player1.updatePoints()
}

$(document).on('keydown', function(e){
  if(e.keyCode == 37)
    if(player1.x > 0) player1.move('left')

  if(e.keyCode == 39)
    if(player1.x < board.width - player1.width) player1.move('right')

  if(e.keyCode == 38){
    if($('#shot').length == 0)
      shot = new Shot(board, player1, 15, 0, 'shot')
  }
})

function restartGame(){
  player1.restart()
  if($('#shot').length != 0) shot.restart()
  balls.forEach((ball)=>{ball.restart()})
  balls = []
  balls.push(new Ball(200, 100, 5, 80, 'ball' + balls.length))

  game = setInterval(updateGame, intervalTime)
}

function checkObject(){
  if($('#' + player1.identifier).collision('#hideObject').attr('id') == 'hideObject'){
    if($('#hideObject').hasClass('beer')){
      player1.speed2X()
      setTimeout(()=>{ player1.divideSpeedBy2() }, 3000);
    }

    if($('#hideObject').hasClass('clock')){
      var ballNormalSpeedX = balls[0].speedX
      var ballNormalSpeedY = balls[0].speedY

      balls.forEach((ball)=>{ball.stopMovement() })

      setTimeout(()=>{
        balls.forEach((ball)=>{ ball.initMovement(ballNormalSpeedX, ballNormalSpeedY)})
      }, 3000);
    }

    if($('#hideObject').hasClass('drug')){
      balls.forEach((ball)=>{
        $('#' + ball.identifier).addClass('animated flash').css({
        '-webkit-animation-iteration-count': 'infinite',
        '-moz-animation-iteration-count': 'infinite'})})

      setTimeout(()=>{
        balls.forEach((ball)=>{$('#' + ball.identifier).removeClass('animated').removeClass('lightSpeedOut') })
      }, 3000)
    }
    $('#hideObject').remove()
  }
}

function gameOver(){
  $('#' + player1.identifier).remove()
  if($('#shot').length != 0) shot.restart()
  balls.forEach((ball)=>{ball.restart()})
  $('#board').remove()

  $gameOver = $('<div>').attr('id', 'game-over').text('GAME OVER')
  $('body').append($gameOver)
}
