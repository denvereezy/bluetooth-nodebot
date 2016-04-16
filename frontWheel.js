const five = require("johnny-five");

const FrontWheel = function(pwmPin, directPin, speedParam){
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
}

module.exports = FrontWheel;
