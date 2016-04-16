const five = require("johnny-five");

const RightWheel = function(pwmPin, directPin, speedParam){
  const motor = new five.Motor({
      pins: {
        pwm: pwmPin,
        dir: directPin
      },
      invertPWM: true
  }),
  speed = speedParam || 256;


  this.stop = function(){
    motor.stop();
  }

  this.forward = function(){
    motor.forward(speed);
  }

  this.reverse = function(){
    motor.reverse(speed);
  }

  this.faster = function (increase) {
    increase = increase || 1;
    speed += increase;
  }

  this.slower = function (decrease) {
    decrease = decrease || 1;
    speed -= decrease;
  }

}

module.exports = RightWheel;
