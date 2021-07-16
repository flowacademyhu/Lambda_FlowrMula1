const mpg321 = require('mpg321');
const player = mpg321().remote();
const player2 = mpg321().remote();

const crash = 'sound/sfx_exp_short_soft1.mp3';
const menu = 'sound/Arcade-Heroes.mp3';
const game =
  'sound/2020-06-18_-_8_Bit_Retro_Funk_-_www.FesliyanStudios.com_David_Renda.mp3';
const score = 'sound/sfx_coin_cluster3.mp3';

const playScoreSound = () => {
  player2.gain(15);
  player2.play(score);
};

const playCrashSound = () => {
  player2.gain(100);
  player2.play(crash);
};

const playMenuMusic = (play) => {
  if (play) {
    player.play(menu);
    player.on('end', () => {
      player.play(menu);
    });
  } else {
    player.stop();
  }
};

const playGameMusic = (play) => {
  if (play) {
    player.play(game);
    player.on('end', () => {
      player.play(game);
    });
  } else {
    player.stop();
  }
};

const stopMusicPlayer = () => {
  try {
    player.quit();
    player2.quit();
  } catch (err) {}
};

module.exports = {
  playMenuMusic,
  playGameMusic,
  playScoreSound,
  playCrashSound,
  stopMusicPlayer
};
