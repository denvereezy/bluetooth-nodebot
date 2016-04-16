const five = require("johnny-five");

const RearWheel = function(pwmPin, directPin, speedParam){
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
    motor.reverse(speed);
  }

  this.reverse = function(){
    motor.forward(speed);
  }
}

module.exports = RearWheel;
