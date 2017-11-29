class SceneStart extends Scene {
    constructor(game) {
        super(game)

        var self = this
        this.registerActionToGame(' ', function() {
            // switch to main sence 
            var scene = new SceneMain(self.game)
            self.game.updateScene(scene)
            // remove registered actions
            self.removeActions()
        })
    }

    draw() {
        this.ctx.font = '48px serif'
        this.ctx.textBaseline = 'middle'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('Press space to start', this.canvas.width / 2, this.canvas.height / 2)   
    }
}