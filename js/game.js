class Game {
    constructor(imagePaths, callback) {
        this.imagePaths = imagePaths
        this.callback = callback
        this.images = {}
        this.downKeys = []
        this.actions = []
        this.scene = null
        this.level = levels[0]
        this.canvas = document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')

        this.pathToImage()

        var self = this
        window.addEventListener('keydown', function(event) {
            // console.log(event)
            self.downKeys[event.key] = true
        })
        window.addEventListener('keyup', function(event) {
            // console.log(event) 
            self.downKeys[event.key] = false
        })
    }

    debugMode() {
        var chosenElement = null
        var self = this
        window.addEventListener("mousedown", function(event) {
            if (!window.paused) {
                return
            }

            for (var k in self.scene.elements) {
                var element = self.scene.elements[k]
                if (element.isPositionInside(event.offsetX, event.offsetY)) {
                    chosenElement = element
                    break
                }
            }
        })
        window.addEventListener("mousemove", function(event) {
            if (!window.paused) {
                return
            }

            if (chosenElement != null) {
                chosenElement.setPosition(mousePosition)
            } 
        })
        window.addEventListener('mouseup', function(event) {
            if (!window.paused) {
                return
            }

            if (chosenElement != null) {
                chosenElement = null
            }
        })
    }

    static getInstance(...args) {
        this.i = this.i || this(...args)
        return this.i
    }

    registerAction(key, action) {
        this.actions[key] = action
    }

    pathToImage() {
        var imageNames = Object.keys(this.imagePaths)
        for (var i in imageNames) {
            let imageName = imageNames[i]
            var self = this
            let img = new Image()
            img.src = this.imagePaths[imageName]
            // console.log(this.imagePaths[imageName])
            img.addEventListener('load', function() {
                self.images[imageName] = img
                // chech whether all img loaded, if yes, start to run
                if (Object.keys(self.images).length == imageNames.length) {
                    self.callback(self)
                }
            }, false);
        }
    }

    run(scene) {
        if (window.enableDebugMode == true) {
            this.debugMode()
        }

        this.scene = scene
        this.runLoop()
    }

    runLoop() {
        for (var k in this.downKeys) {
            if (this.downKeys[k] && this.actions[k]) {
                this.actions[k]()
            }
        }
        this.scene.update()
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.scene.draw()

        var self = this
        setTimeout(function(){
            self.runLoop()
        }, 1000/30)
    }

    updateScene(scene) {
        this.scene = scene
    }
}
