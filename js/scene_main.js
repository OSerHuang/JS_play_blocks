class SceneMain extends Scene {
    constructor(game) {
        super(game)

        this.elements = []
        this.paddle = new Paddle(game.images['paddle'], 300, 450, 100, 20)
        this.ball = new Ball(game.images['ball'], 100, 200, 15, 15)
        this.blocks = this.constructBlocks(game.level)

        this.storeElement(this.paddle)
        this.storeElement(this.ball)
        this.storeElements(this.blocks)

        var self = this
        this.registerActionToGame('ArrowRight', function() {
            self.paddle.moveRight()
        })
        this.registerActionToGame('ArrowLeft', function() {
            self.paddle.moveLeft()
        })

    }

    constructBlocks(level) {
        var blocks = []
        for (var k in level) {
            var position = level[k] 
            var block = new Block(
                this.game.images['block'], 
                position[0],
                position[1],
                40,
                20
            )
            blocks.push(block)
        }
        return blocks
    }

    storeElement(element) {
        this.elements.push(element)
    }

    storeElements(elementsList) {
        for (var k in elementsList) {
            this.elements.push(elementsList[k])
        }
    }

    drawElements() {
        for (var i in this.elements) {
            var e = this.elements[i]
            e.draw()
        }
    }

    draw() {
        this.drawElements()
    }

    update() {
        if (window.paused) {
            return
        }

        this.ball.move()
        // check game over
        if (this.ball.y > this.canvas.height - this.ball.height) {
            var scene = new SceneGameOver(this.game)
            this.game.updateScene(scene)
            this.removeActions()
        }

        // check collisions
        for (var k in this.elements) {
            var e = this.elements[k]
            if (e == this.ball) {
                continue
            }
            if (e.lives != undefined && e.lives < 1) {
                continue
            }

            var collisionType = this.ball.getCollisionType(e)
            if (collisionType != 0 && e.kill != undefined) {
                console.log('kill', e.lives)
                e.kill()
            }

            switch (collisionType) {
                case 1: 
                    this.ball.headOnCollide()
                    break
                case 2: 
                    this.ball.sideCollide() 
                    break
            }
        }
    }


}