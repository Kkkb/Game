class SceneTitle extends KScene {
    constructor(game) {
        super(game)
        game.registerAction('q', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        // draw labels
        this.game.context.font = "50px yahei"
        this.game.context.fillText('按 q 开始游戏', 220, 200)
    }
}
