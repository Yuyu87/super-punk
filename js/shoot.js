function Shot(x, y, speed, height){
  Actor.call(this, x, y, speed)
  this.height = height
}

Shot.prototype = Object.create(Actor.prototype)
Shot.constructor = Shot

Shot.prototype.growUntilCollision = function (){
  var collision = false
  var boardHeight = parseInt($('#board').css('height'))

  var topShot = parseInt($('#shot').css('top'))
  var leftShot = parseInt($('#shot').css('left'))


  if(topShot == 0 || this._ballCollision(topShot, leftShot)){
    collision = true
    $('#shot').remove()
  }

  if(!collision){
    this.x -= this.speed
    this.height = boardHeight - this.x
  }
}

Shot.prototype._ballCollision = function (topShot, leftShot){
  var collision = false

  var balls = $('.ball')

  var topBall, leftBall, heightBall, widthBall
  for(var i=0; i<balls.length; i++){
    topBall = parseInt($(balls[i]).css('top'))
    leftBall = parseInt($(balls[i]).css('left'))
    heightBall = parseInt($(balls[i]).css('height'))
    widthBall = parseInt($(balls[i]).css('width'))

    if((leftShot>leftBall && leftShot<leftBall + widthBall) && topShot == topBall+heightBall){
      collision = true

      $(balls[i]).remove()

      if(widthBall>20){
        var $ball1 = $('<div>').attr('class','ball');
        $ball1.css({top:topBall, left: leftBall, height: heightBall/2, width: widthBall/2});
        $('#board').append($ball1);
        var $ball2 = $('<div>').attr('class','ball');
        $ball2.css({top:topBall, left: leftBall+widthBall/2, height: heightBall/2, width: widthBall/2});
        $('#board').append($ball2);
      }
    }

  }

  return collision
}
