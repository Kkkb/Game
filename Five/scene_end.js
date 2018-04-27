var SceneEnd = function(game, score) {
    var s = {
        game: game,
    }
    // 初始化
    s.draw = function() {
        // draw labels
        game.context.font = "50px yahei"
        game.context.fillText('游戏结束', 300, 200)
        game.context.font = "20px yahei"
        game.context.fillText('你的得分：' + score, 330, 260)
        game.context.fillStyle = "#223"
        // draw gameover
        o = game.imageByName('over')
        o.x = game.canvas.width - o.w
        o.y = game.canvas.height - o.h
        game.drawImage(o)
    }
    s.update = function() {
    }
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if (event) {
            log('再玩一次')
            var start = Scene(game)
            game.replaceScene(start)
            // 设置拖拽状态
            // enableDrag = true
            // log('点中')
        } else {
            // log('没点中')
        }
    })
    return s
}
