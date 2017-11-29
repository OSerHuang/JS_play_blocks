class Ball extends Element {
    constructor(...args) {
        super(...args)
        this.xSpeed = 10
        this.ySpeed = -10
    }

    move() {
        this.x += this.xSpeed
        this.y += this.ySpeed
        this.checkBorder()
    }

    checkBorder() {
        if (this.x < 0 || this.x > this.canvas.width - this.width) {
            this.sideCollide()
        } else if (this.y < 0 || this.y > this.canvas.height - this.height) {
            this.headOnCollide()
        }
    }

    getCollisionType(element) {
        // return 1 if head-on collide 
        // return 2 if side collide 
        // return 0 if no collide
        var corners = this.getCorners()
        var insideCorners = []
        for (var k in corners) {
            var cornerX = corners[k][0]
            var cornerY = corners[k][1]
            if (element.isPositionInside(cornerX, cornerY)) {
                insideCorners.push(k)
            }
        }
        // if 1 corner insides
        if (insideCorners.length == 1) {
            if (insideCorners[0] == '0') {
                if (this.ySpeed > 0 && this.xSpeed > 0) return 1
                if (this.ySpeed > 0 && this.xSpeed < 0) return 2
                if (this.ySpeed < 0 && this.xSpeed < 0) return 1
            }
            if (insideCorners[0] == '1') {
                if (this.ySpeed < 0 && this.xSpeed > 0) return 1
                if (this.ySpeed > 0 && this.xSpeed > 0) return 2
                if (this.ySpeed < 0 && this.xSpeed < 0) return 1
            }
            if (insideCorners[0] == '2') {
                if (this.ySpeed < 0 && this.xSpeed < 0) return 2
                if (this.ySpeed > 0 && this.xSpeed > 0) return 1
                if (this.ySpeed > 0 && this.xSpeed < 0) return 1
            }
            if (insideCorners[0] == '3') {
                if (this.ySpeed > 0 && this.xSpeed > 0) return 1
                if (this.ySpeed < 0 && this.xSpeed > 0) return 2
                if (this.ySpeed > 0 && this.xSpeed < 0) return 1
            }
        }
        // if 2 corners inside
        if (insideCorners.length == 2) {
            var sum = insideCorners[0] + insideCorners[1]
            switch (sum) {
                case '01': return 1
                case '23': return 1
                case '02': return 2
                case '13': return 2
            }
        }
        return 0
    }

    headOnCollide() {
        this.ySpeed *= -1
    }

    sideCollide() {
        this.xSpeed *= -1
    }
}