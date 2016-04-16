const five       = require("johnny-five"),
      keypress   = require('keypress'),
      FrontWheel = require("./frontWheel"),
      RearWheel  = require('./rearWheel'),
      Robot      = require("./robot"),
      RobotRun   = require('./robotRun');

keypress(process.stdin);

const board = new five.Board({
  port: '/dev/tty.CAPEBOT2-DevB'
});

board.on("ready", function() {

    const frontWheel = new FrontWheel(4, 5, 180),
        rearWheel = new RearWheel(6, 7, 200);

    const robot = new Robot(frontWheel);
    this.repl.inject({
        robot: robot
    });

    const robotRun = new RobotRun(rearWheel);
    this.repl.inject({
        robotRun: robotRun
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
                    robotRun.forward();
                    break;
                case 'down':
                    console.log('Backwards');
                    robotRun.reverse();
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
                    robotRun.stop();
                    break;
            };
    });
});
