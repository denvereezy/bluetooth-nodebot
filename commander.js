const five     = require("johnny-five"),
      keypress = require('keypress'),
      Wheel    = require("./wheels"),
      Robot    = require("./robot");

keypress(process.stdin);

var board = new five.Board({
  port: '/dev/tty.CAPEBOT2-DevB'
});

board.on("ready", function() {

    const wheel1 = new Wheel(9, 8, 200),
        wheel2 = new Wheel(6, 7, 200);

    const robot = new Robot(wheel1, wheel2);
    this.repl.inject({
        robot: robot
    });

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', function(ch, key) {
            if (!key) return;
            switch (key.name) {
                case 'q':
                    console.log('Quitting');
                    process.exit();
                    break;
                case 'up':
                    console.log('Forward');
                    robot.forward();
                    break;
                case 'down':
                    console.log('Backwards');
                    robot.reverse();
                    break;
                case 'left':
                    console.log('left');
                    robot.left();
                    break;
                case 'right':
                    console.log('right');
                    robot.right();
                    break;
                case 'space':
                    console.log('stop');
                    robot.stop();
                    // break;
            };
    });
});
