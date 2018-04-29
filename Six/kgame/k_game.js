// 坤
class KGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.score = 0
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', event => {
            self.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        // log(window.fps)
        // events
        var k = this
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
        k.context.clearRect(0, 0, k.canvas.width, k.canvas.height)
        // draw
        k.draw()
        // next run loop
        setTimeout(function() {
            k.runloop()
        }, 1000/window.fps)
    }

    init() {
        var k = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(k.images)
        // log('names', names)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = k.images[name]
            // log('path', path)
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 k.images 中
                k.images[name] = img
                // 所有图片都载入成功之后，调用 run
                loads.push(1)
                // log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    // log('load images', k.images)
                    k.__start()
                }
            }
        }
    }

    imageByName(name) {
        // log('image by name', k.images)
        var k = this
        var img = k.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        var k = this
        k.scene = scene
        // 开始运行程序
        setTimeout(function() {
            k.runloop()
        }, 1000/window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __start(scene) {
        this.runCallback(this)
    }

}
// var kGame = function(fps, images, runCallback) {
//     // images 是一个对象，里面是图片的引用名字和图片路径
//     // 程序会在所有图片载入成功后才运行
//     var k = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: {},
//     }
//     var canvas = document.querySelector('#id-canvas')
//     var context = canvas.getContext('2d')
//     k.canvas = canvas
//     k.context = context
//     //draw
//     k.drawImage = function(kImage) {
//       k.context.drawImage(kImage.image, kImage.x, kImage.y)
//     }
//
//
//     //timer
//     window.fps = 66
//     var runloop = function() {
//         // log(window.fps)
//         // events
//         var actions = Object.keys(k.actions)
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i]
//             if(k.keydowns[key]) {
//                 // 如果按键被按下，调用注册的 action
//                 k.actions[key]()
//             }
//         }
//         // update
//         k.update()
//         /// clear
//         context.clearRect(0, 0, canvas.width, canvas.height)
//         // draw
//         k.draw()
//         // next run loop
//         setTimeout(function() {
//             runloop()
//         }, 1000/window.fps)
//     }
//
//     var loads = []
//     // 预先载入所有图片
//     var names = Object.keys(images)
//     // log('names', names)
//     for (var i = 0; i < names.length; i++) {
//         let name = names[i]
//         var path = images[name]
//         // log('path', path)
//         let img = new Image()
//         img.src = path
//         img.onload = function() {
//             // 存入 k.images 中
//             k.images[name] = img
//             // 所有图片都载入成功之后，调用 run
//             loads.push(1)
//             // log('load images', loads.length, names.length)
//             if (loads.length == names.length) {
//                 // log('load images', k.images)
//                 k.__start()
//             }
//         }
//     }
//     k.imageByName = function(name) {
//         // log('image by name', k.images)
//         var img = k.images[name]
//         var image = {
//             w: img.width,
//             h: img.height,
//             image: img,
//         }
//         return image
//     }
//     k.runWithScene = function(scene) {
//         k.scene = scene
//         // 开始运行程序
//         setTimeout(function() {
//             runloop()
//         }, 1000/fps)
//     }
//     k.replaceScene = function(scene) {
//         k.scene = scene
//     }
//     k.__start = function(scene) {
//         runCallback(k)
//     }
//     return k
// }
