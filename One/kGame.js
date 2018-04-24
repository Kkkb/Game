var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var Nico = function() {
    var image = imageFromPath('nico.png')
    var o = {
        image: image,
        x: 60,
        y: 560,
        speed: 25,
    }
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
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
    return o
}

var kGame = function() {
    var k = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    k.canvas = canvas
    k.context = context
    //draw
    k.drawImage = function(kImage) {
      k.context.drawImage(kImage.image, kImage.x, kImage.y)
    }
    // events
    window.addEventListener('keydown', function(enent){
        k.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(enent){
        k.keydowns[event.key] = false
    })
    //
    k.registerAction = function(key, callback) {
        k.actions[key] = callback
    }
    //timer
    setInterval(function() {
        // events
        var actions = Object.keys(k.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(k.keydowns[key]) {
                // 如果按键被按下，调用注册的 action
                k.actions[key]()
            }
        }
        // update
        k.update()
        /// clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        k.draw()
    }, 1000/30)

    return k
}

var __main = function() {
    var game = kGame()

    var nico = Nico()
    var ball = Ball()

    game.registerAction('a', function() {
        nico.moveLeft()
    })
    game.registerAction('d', function() {
        nico.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })
    game.update = function() {
        ball.move()
        // 判断相撞
        if (nico.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.speedY *= -1
        }
    }

    game.draw = function() {
        // draw
        game.drawImage(nico)
        game.drawImage(ball)
    }
}

__main()
