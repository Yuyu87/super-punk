function Player(x, y, speed, direction, weapon, lifes){
  Actor.call(this, x, y, speed, direction)
  this.weapon = weapon
  this.lifes = lifes
}

Player.prototype = Object.create(Player.prototype)
Player.constructor = Player
