const mpg = require('mpg123');
const player = new mpg.MpgPlayer();
const player2 = new mpg.MpgPlayer();

const crash = 'sound/sfx_exp_short_soft1.mp3';
const menu = 'sound/Mello C - Lovusuno.mp3';
const game = 'sound/Jim Hall - Thumper.mp3';
const score = 'sound/sfx_coin_cluster3.mp3';

const playScoreSound = () => {
  player2.volume(15);
  player2.play(score);
};

const playCrashSound = () => {
  playMenuMusic(false);
  player2.volume(100);
  player2.play(crash);
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
  playCrashSound
};
