var board = new Board(300, 600, 40, 40)
var player1 = new Player(280, 240, 40, 60, 5, 3, 'player1')
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
      if(player1.lifes>=0){
        restartGame()
        game = setInterval(updateGame, intervalTime)
      }else gameOver()
    }
    if($('#shot').length != 0)
      if(shot.ballHitShot('#' + ball.identifier)){
        shot.player.points += ball.points
        ball.divideOnTwoOrDisappear()
      }
  })
  player1.updatePoints()
}

$(document).on('keydown', function(e){
  if(e.keyCode == 37)
    if(player1.x > 0) player1.move('left')

  if(e.keyCode == 39)
    if(player1.x < board.width - player1.width) player1.move('right')

  if(e.keyCode == 38){
    if($('#shot').length == 0)
      shot = new Shot(board, player1, 10, 0, 'shot')
  }
})

function updatePoints(){

}

function restartGame(){
  player1.restart()
  if($('#shot').length != 0) shot.restart()
  balls.forEach((ball)=>{ball.restart()})
  balls = []
  balls.push(new Ball(200, 100, 5, 80, 'ball' + balls.length))
}

function gameOver(){
  console.log('GAME OVER')
  $('#' + player1.identifier).remove()
  if($('#shot').length != 0) shot.restart()
  balls.forEach((ball)=>{ball.restart()})
  $('#board').remove()

  $gameOver = $('<div>').attr('id', 'game-over').text('GAME OVER')
  $('body').append($gameOver)
}
