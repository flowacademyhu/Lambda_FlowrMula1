const mpg = require('mpg123');
const player = new mpg.MpgPlayer();

const crash = 'sound/sfx_exp_short_soft1.mp3';
const menu = 'sound/Arcade-Heroes.mp3';
const game =
  'sound/2020-06-18_-_8_Bit_Retro_Funk_-_www.FesliyanStudios.com_David_Renda.mp3';
const score = 'sound/sfx_sounds_Blip10.mp3';

const playScoreSound = () => {
  player.play(score);
};

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

const playGameMusic = (play) => {
  if (play) {
    player.play(game);
  } else {
    player.stop();
  }
};

module.exports = {
  playMenuMusic,
  playGameMusic,
  playScoreSound,
  playCrash
};
