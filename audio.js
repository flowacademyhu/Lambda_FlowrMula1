const mpg = require('mpg123');
const player = new mpg.MpgPlayer();

const crash = 'sound/sfx_exp_short_soft1.mp3';
const menu = 'sound/Arcade-Heroes.mp3';

const playCrash = () => {
  player.play(crash);
};

const playMenuMusic = (play) => {
  if (play) {
    player.play(menu);
  } else {
    player.stop();
  }
};

module.exports = {
  playMenuMusic,
  playCrash
};
