function Board(height, width, top, left){
  this.height = height
  this.width = width
  this.top = top
  this.left = left
  this._render()
}

Board.prototype._render = function () {
  var $board = $('<div>').attr('id', 'board').css({
    width: this.width,
    height: this.height,
    top: this.top,
    left: this.left
  })
  $('body').append($board)
}
