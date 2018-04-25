var Nico = function() {
    var image = imageFromPath('nico.png')
    var o = {
        image: image,
        x: 60,
        y: 560,
        speed: 25,
    }
    o.move = function(x) {
      if (o.x < 0) {
          x = 0
      }
      if (o.x > 800 - o.image.width) {
          x = 800 - o.image.width
      }
      o.x = x
    }
    o.moveLeft = function() {
        o.x -= o.speed
        o.move(o.x)
    }
    o.moveRight = function() {
        o.x += o.speed
        o.move(o.x)
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height + 1 > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                log('相撞')
                return true
            }
        }
        return false
    }
    return o
}
