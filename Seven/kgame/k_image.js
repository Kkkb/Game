class KImage {
    constructor(game, name) {
        // this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        alert("一定要继承本函数")
    }
    update() {

    }
}
// 逻辑上来看不应该继承 KImage， 暂时这样
// class Player extends KImage {
//     constructor(game, name) {
//         super(game, name)
//     }
// }
