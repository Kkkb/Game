var Ball = function(game) {
    var o = game.imageByName('ball')
    // var image = imageByName('ball.png')
    o.x = 60
    o.y =  400
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + 100 > 800) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + 100 > 600) {
                o.speedY *= -1
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }

    }
    o.反弹 = function() {
        o.speedY *= -1
    }
    return o
}
