var Ball = function() {
    var image = imageFromPath('ball.png')
    var o = {
        image: image,
        x: 60,
        y: 400,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
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
