class Element {
    constructor(image, x, y, width, height) {
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.canvas = document.getElementById('canvas')
    }

    draw() {
        var ctx = this.canvas.getContext('2d')
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    getCorners() {
        // return upper left corner, u r , b l , b r position
        return [
            [this.x, this.y],
            [this.x + this.width, this.y],
            [this.x, this.y + this.height],
            [this.x + this.width, this.y + this.height],
        ]
    }

    isPositionInside(x, y) {
        if (x >= this.x && x <= this.x + this.width) {
            if (y >= this.y && y <= this.y + this.height) {
                return true
            }
        }
        return false
    }
}