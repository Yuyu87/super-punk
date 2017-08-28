var board = new Board()

var player1Width = parseInt($('#player1').css('width'))
var player1Left = parseInt($('#player1').css('left'))
var boardWidth = parseInt($('#board').css('width'))

var intervalTime = 50
var game
$(document).ready(function() {
    game = setInterval(updateState, intervalTime)
})


function updateState(){
  renderPlayer()
}

$(document).on('keydown', function(e){
  if(e.keyCode == 37){ //Arrow left
    player1Left = parseInt($('#player1').css('left'))
    if(player1Left > 0) board.player1.moveLeft()
  }
  if(e.keyCode == 39){ //Arrow right
    player1Left = parseInt($('#player1').css('left'))
    if(player1Left < boardWidth - player1Width) board.player1.moveRight()
  }

})

function renderPlayer (){
  $('#player1').css('left', board.player1.y)
}
