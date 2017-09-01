var game
$(document).ready(function() {
//   var windowWidth = window.innerWidth || document.documentElement.clientWidth
//                   || document.body.clientWidth;
//
// console.log('Ancho' + width)
//
// var windowHeight = window.innerHeight || document.documentElement.clientHeight
//                   || document.body.clientHeight;
//
// console.log('Alto' + height)
  game = new Game()
  game.start()

  $(document).on('keydown', function(e){
    if(e.keyCode == 37){
      if(game.player1.x > 0) game.player1.move('left')
      $('#' + game.player1.identifier).addClass('walk-left')
    }

    if(e.keyCode == 39){
      if(game.player1.x < game.board.width - game.player1.width) game.player1.move('right')
      $('#' + game.player1.identifier).addClass('walk-right')
    }

    if(e.keyCode == 32){
      if($('#shot').length == 0) game.createShot()

      $('#' + game.player1.identifier).removeClass('walk-left')
      $('#' + game.player1.identifier).removeClass('walk-right')
    }
  })

  $(document).on('keyup', function(e){
    if(e.keyCode == 37) $('#' + game.player1.identifier).removeClass('walk-left')
    if(e.keyCode == 39) $('#' + game.player1.identifier).removeClass('walk-right')
  })
})
