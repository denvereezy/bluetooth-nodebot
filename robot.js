const Robot = function(frontWheel) {

    this.left = function(cb) {
        frontWheel.reverse();
        if (cb)
            cb();
        return this;
    }

    this.go = function(direction, duration) {
        const self = this;
        self[direction]();
        setTimeout(function() {
            self.stop();
        }, duration)

    }

    this.right = function(cb) {
        frontWheel.forward();
        if (cb)
            cb();
        return this;
    }

    this.stop = function(cb) {
        frontWheel.stop();
        if (cb)
            cb();
        return this;
    }

    this.direction = function(actionName, duration) {
        var self = this;
        var action = this[actionName];
        action();
        if (duration) {
            setTimeout(function() {
                self.stop();
            }, duration);
        }
    }
}

module.exports = Robot;
