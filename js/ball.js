function Ball(x, y, speed, width, identifier, points, hideObject){
  Actor.call(this, x, y, speed)
  this.width = width
  this.height = width
  this.identifier = identifier
  this._renderBall()
}

Ball.prototype = Object.create(Actor.prototype)
Ball.constructor = Ball

Ball.prototype._renderBall = function () {
  var $ball = $('<div>').attr('id', this.identifier).addClass('ball').css({
    position: "absolute",
    top: this.y,
    left: this.x,
    height: this.height,
    width: this.width
  })
  $('#board').append($ball)
}

Ball.prototype.move = function (){

}
