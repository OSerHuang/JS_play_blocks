class Block extends Element {
    constructor(...args) {
        super(...args)
        this.lives = 1
    }

    kill() {
        if (this.lives > 0) {
            this.lives -= 1
        }
    }

    draw() {
        if (this.lives < 1) {
            return
        }

        super.draw()
    }
}