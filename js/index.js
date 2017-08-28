var board = new Board()

var player1Width = parseInt($('#player1').css('width'))
var player1Left = parseInt($('#player1').css('left'))
var boardWidth = parseInt($('#board').css('width'))
var boardHeight = parseInt($('#board').css('height'))

var leftBall = parseInt($('#ball').css('left'))

var intervalTime = 50
var game
$(document).ready(function() {
    game = setInterval(updateState, intervalTime)
    // setInterval(moveBalls, intervalTime)
})

function updateState(){
  renderPlayer()
  if($('#shot').length != 0) renderShot()

}

// function moveBalls(){
//   leftBall = parseInt($('#ball').css('left'))
//   leftBall+=5
//   $('#ball').css('top', leftBall*leftBall/10)
// }

$(document).on('keydown', function(e){
  if(e.keyCode == 37){ //Arrow left
    player1Left = parseInt($('#player1').css('left'))
    if(player1Left > 0) board.player1.moveLeft()
  }
  if(e.keyCode == 39){ //Arrow right
    player1Left = parseInt($('#player1').css('left'))
    if(player1Left < boardWidth - player1Width) board.player1.moveRight()
  }
  if(e.keyCode == 38){ //Arrow up
    board.player1.shoot()
    board.player1.shot.growUntilCollision()
  }
})

function renderPlayer (){
  $('#player1').css('left', board.player1.y)
}

function renderShot(){
  board.player1.shot.growUntilCollision()

  $('#shot').css('height', board.player1.shot.height);
  $('#shot').css('top', board.player1.shot.x);
}
