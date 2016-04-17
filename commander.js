const five       = require("johnny-five"),
      keypress   = require('keypress'),
      FrontWheel = require("./frontWheel"),
      RearWheel  = require('./rearWheel'),
      Robot      = require("./robot"),
      RobotRun   = require('./robotRun'),
      say        = require('say');

keypress(process.stdin);

const board = new five.Board({
  port: '/dev/tty.CAPEBOT2-DevB'
});

board.on("ready", function() {
say.speak('You are ready to roll', 'Alex',1);
    const frontWheel = new FrontWheel(4, 5, 180),
        rearWheel = new RearWheel(6, 7, 256);

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
                    say.speak('good bye robots', 'Alex', 1);
                    process.exit();
                    break;
                case 'up':
                    console.log('Forward');
                    say.speak('moving forward', 'Alex', 1);
                    robotRun.forward();
                    break;
                case 'down':
                    console.log('Backwards');
                    say.speak('reversing peeps', 'Alex', 1);
                    robotRun.reverse();
                    break;
                case 'left':
                    console.log('left');
                    say.speak('to the left, to the left', 'Alex', 2);
                    robot.left();
                    break;
                case 'right':
                    console.log('right');
                    say.speak('right again', 'Alex', 1);
                    robot.right();
                    break;
                case 'space':
                    console.log('stop');
                    say.speak('holding the horses', 'Alex', 1);
                    robot.stop();
                    robotRun.stop();
                    break;
            };
    });
});
