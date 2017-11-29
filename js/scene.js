class Scene {
    constructor(game) {
        this.game = game
        this.keys = []
        this.canvas = this.game.canvas
        this.ctx = this.game.context
    }

    registerActionToGame(key, func) {
        this.storeActionKey(key)
        this.game.registerAction(key, func)
    }

    storeActionKey(key) {
        this.keys.push(key)
    }

    removeActions() {
        // clear the registered action keys when leaving current scene
        for (var k in this.keys) {
            delete this.game.actions[this.keys[k]]
        }
    }

    update() {}

    draw() {}
}