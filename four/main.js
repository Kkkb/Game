var loadLevel = function(game, n) {
    n -= 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    // 这是为了 debug
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {

    var images = {
        ball: 'ball.png',
        block: 'block.png',
        nico: 'nico.png',
    }
    var game = kGame(120, images, function(g) {
        var nico = Nico(game)
        var ball = Ball(game)
        var score = 0

        blocks = loadLevel(game, 1)

        var paused = false
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
            if (window.paused) {
                return
            }
            ball.move()
            // log('ball的位置', ball.x, ball.y)
            // 判断相撞
            if (nico.collide(ball)) {
                // 这里应该调用一个 ball.反弹() 来实现

                ball.反弹()
            }
            // 判断 ball 和 blocks 相撞
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.collide(ball)) {
                    block.kill()
                    ball.反弹()
                    // 更新分数
                    score += 100
                }
            }
        }
        // mouse event
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log('mousedown', event)
            log('x:', x, 'y:', y, 'down')
            // 检查是否点中了 ball
            // if (ball.hasPoint(x, y)) {
            // 有时候点不到？
            if (true) {
                // 设置拖拽状态
                enableDrag = true
                log('点中')
            } else {
                // log('没点中')
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log('mousedown', event.layerX, event.layerY)
            // log('x:', x, 'y:', y, 'move')
            if (enableDrag) {
                log(x, y, 'drag')
                ball.x = x
                ball.y = y
            }
            // enableDrag = false
        })
        game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            // log('mousedown', event.layerX, event.layerY)
            log('x:', x, 'y:', y, 'up')
            enableDrag = false
        })
        game.draw = function() {
            // draw 背景
            game.context.fillStyle = "#223"
            game.context.fillRect(0, 0, 800, 600)
            // draw
            game.drawImage(nico)
            game.drawImage(ball)
            // draw blocks
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawImage(block)
                }
            }
            // draw labels
            game.context.fillText('分数：' + score, 10, 590);
        }
    })
    enableDebugMode(game, true)
}

__main()
