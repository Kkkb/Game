// var SceneEnd = function(game, score) {
//     var s = {
//         game: game,
//     }
//     game.registerAction('r', function() {
//         var s = SceneTitle.new(game)
//         game.replaceScene(s)
//         log('r')
//     })
//     // 初始化
//     s.draw = function() {
//         // draw labels
//         game.context.font = "50px yahei"
//         game.context.fillText('游戏结束', 300, 200)
//         game.context.font = "20px yahei"
//         game.context.fillText('按 r 重玩 你的得分：' + score, 330, 260)
//         game.context.fillStyle = "#223"
//         // draw gameover
//         o = game.imageByName('over')
//         o.x = game.canvas.width - o.w
//         o.y = game.canvas.height - o.h
//         game.drawImage(o)
//     }
//     s.update = function() {
//     }
//     // game.canvas.addEventListener('mousedown', function(event) {
//     //     var x = event.offsetX
//     //     var y = event.offsetY
//     //     if (event) {
//     //         log('再玩一次')
//     //         var start = Scene(game)
//     //         game.replaceScene(start)
//     //         // 设置拖拽状态
//     //         // enableDrag = true
//     //         // log('点中')
//     //     } else {
//     //         // log('没点中')
//     //     }
//     // })
//     return s
// }

class SceneEnd extends KScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        // draw labels
        this.game.context.font = "50px yahei"
        this.game.context.fillText('游戏结束', 300, 200)
        this.game.context.font = "20px yahei"
        this.game.context.fillText('按 r 重玩', 360, 260)
        this.game.context.fillStyle = "#223"
        // draw gameover
        var o = this.game.imageByName('over')
        o.x = this.game.canvas.width - o.w
        o.y = this.game.canvas.height - o.h
        this.game.drawImage(o)
    }
}
