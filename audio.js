const mpg = require('mpg123');

const crash = 'sound/sfx_exp_short_soft1.mp3';

const playCrash = () => {
  const player = new mpg.MpgPlayer();
  player.play(crash);
};

module.exports = {
  playCrash
};
