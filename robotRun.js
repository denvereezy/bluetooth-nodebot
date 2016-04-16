const RobotRun = function(rearWheel) {

    this.forward = function(cb) {
        rearWheel.reverse();
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

    this.reverse = function(cb) {
        rearWheel.forward();
        if (cb)
            cb();
        return this;
    }

    this.stop = function(cb) {
        rearWheel.stop();
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

module.exports = RobotRun;
