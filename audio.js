const mpg = require('mpg123');
const player = new mpg.MpgPlayer();
const player2 = new mpg.MpgPlayer();

const crash = 'sound/What Are You Doing Step Bro Sound Effect.mp3';
const menu = 'sound/Mello C.mp3';
const game = 'sound/Jim Hall - Thumper.mp3';
const score = 'sound/untitled.mp3';

const playScoreSound = () => {
  player2.volume(300);
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
    player.volume(40);
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
