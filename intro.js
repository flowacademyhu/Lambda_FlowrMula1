const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const menu = require('./menu');
const audio = require('./audio');

const intro = () => {
  audio.playMenuMusic(true);
  console.clear();

  CFonts.say('Team Mate Studios|presents...', {
    font: 'tiny',
    align: 'center',
    colors: ['red', 'black']
  });

  CFonts.say('Flowrmula 1', {
    font: 'tiny',
    align: 'center',
    gradient: ['yellow', 'red']
  });

  CFonts.say('Press SPACE to continue...', {
    font: 'tiny',
    align: 'center'
  });

  term.grabInput();

  term.on('key', function (name) {
    if (name === ' ') {
      term.removeAllListeners('key');
      menu.menu();
    }
  });
};

intro();
