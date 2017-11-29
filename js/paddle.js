class Paddle extends Element {
    constructor(...args) {
        super(...args)
        this.speed = 10
    }

    checkBorder() {
        if (this.x < 0) {
            this.x = 0
        } else if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width
        }
    }

    moveLeft() {
        this.x -= this.speed
        this.checkBorder()
    }

    moveRight() {
        this.x += this.speed
        this.checkBorder()
    }
}