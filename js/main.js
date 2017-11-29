var __main = function() {
    window.paused = false
    window.addEventListener('keydown', function(event) {
        if (event.key == 'p') {
            window.paused = !window.paused
        }
    })

    window.enableDebugMode = true
    
    var imagePaths = {
        paddle: 'images/paddle.png',
        ball: 'images/ball.png',
        block: 'images/block.png',
    }

    var game = new Game(imagePaths, function(g) {
        console.log('ok')
        var scene = new SceneStart(g)
        g.run(scene)
    })
}

__main()
