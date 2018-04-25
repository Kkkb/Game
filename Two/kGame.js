var kGame = function(fps) {
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
    window.addEventListener('keydown', function(event){
        k.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event){
        k.keydowns[event.key] = false
    })
    //
    k.registerAction = function(key, callback) {
        k.actions[key] = callback
    }
    //timer
    window.fps = 30
    var runloop = function() {
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
        // next run loop
        setTimeout(function() {
            runloop()
        }, 1000/window.fps)
    }

    setTimeout(function() {
        runloop()
    }, 1000/fps)

    return k
}
