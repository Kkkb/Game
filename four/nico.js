var Nico = function(game) {
    var o = game.imageByName('nico')
    // var o = {
    //     image: image,
    //     x: 60,
    //     y: 560,
    //     speed: 25,
    // }
    o.x = 60
    o.y = 520
    o.speed = 15
    o.move = function(x) {
        if (o.x < 0) {
          x = 0
        }
        if (o.x > 800 - o.w) {
          x = 800 - o.w
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

    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function(ball) {
        var a = o
        var b = ball
        if (aInb(b.y, a.y, a.y + a.h) || aInb(a.y, b.y, b.y + b.h)) {
            // log(ball.y)
            if (aInb(b.x, a.x, a.x + a.w) || aInb(a.x, b.x, b.x + b.w)) {
                // log('相撞')
                return true
            }
        }
        return false
    }
    return o
}
