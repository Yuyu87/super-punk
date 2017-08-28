function Player(x, y, speed, weapon, lifes){
  Actor.call(this, x, y, speed)
  this.weapon = weapon
  this.lifes = lifes
}

Player.prototype = Object.create(Player.prototype)
Player.constructor = Player

Player.prototype.moveLeft = function () {
  this.y -= this.speed
}

Player.prototype.moveRight = function () {
  this.y += this.speed
}
