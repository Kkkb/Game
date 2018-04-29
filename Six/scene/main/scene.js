var Scene = function(game) {
    var s = {
        game: game,
        score: 0,
    }
    // 初始化
    var nico = Nico(game)
    var ball = Ball(game)
    // var score = 0

    blocks = loadLevel(game, 6)

    game.registerAction('a', function() {
        nico.moveLeft()
    })
    game.registerAction('d', function() {
        nico.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
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
    s.draw = function() {
        // draw 背景
        // game.context.fillStyle = "#223"
        // game.context.fillRect(0, 0, 800, 600)
        var o = game.imageByName('background')
        o.x = 0//game.canvas.width - o.w
        o.y = 0//game.canvas.height - o.h
        game.drawImage(o)
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
        game.context.font = "18px yahei"
        game.context.fillStyle = 'white'
        game.context.fillText('分数：' + s.score, 10, 590);
        game.context.fillText('F: 发射  A: 左  D: 右', 630, 590);


    }
    s.update = function() {
        if (window.paused) {
            return
        }

        ball.move()
        // 判断游戏结束
        if (ball.y + ball.h > game.canvas.height) {
            // 跳转到游戏结束 的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)

        }
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
                s.score += 10
                game.score = s.score
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
    return s
}
