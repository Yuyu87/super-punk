function Ball(x, y, speed, direction, radius, points, hideObject){
  Actor.call(this, x, y, speed, direction)
  this.radius = radius
  this.points = points
  this.hideObject = hideObject
}

Ball.prototype = Object.create(Actor.prototype)
Ball.constructor = Ball

Ball.prototype.divide = function (){

}

Ball.prototype.move = function (){

}
