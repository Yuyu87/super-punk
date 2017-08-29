var board = new Board(300, 600)
var player1 = new Player(280, 240, 40, 5, 3, 'player1')
var balls = []
balls.push(new Ball(200, 100, 1, 80, 'ball' + balls.length, board))
var shot

var intervalTime = 50
var game
$(document).ready(function() {
    game = setInterval(updateGame, intervalTime)
})

function updateGame(){
  if($('#shot').length != 0) shot.growUntilCollision(board, balls)
  balls.forEach((ball)=>{ball.move()})
}

$(document).on('keydown', function(e){
  if(e.keyCode == 37)
    if(player1.x > 0) player1.move('left')

  if(e.keyCode == 39)
    if(player1.x < board.width - player1.width) player1.move('right')

  if(e.keyCode == 38){
    if($('#shot').length == 0)
      shot = new Shot(board, player1, 5, 0, 'shot')
  }
})
