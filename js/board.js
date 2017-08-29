function Board(height, width){
  this.height = height
  this.width = width
  this._render()
}

Board.prototype._render = function () {
  var board = $('<div>').attr('id', '#board').css({
    width: this.width,
    height: this.height
  })
  $('body').append(board)
};
