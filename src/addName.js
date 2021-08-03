const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const index = require('./index');

const addName = () => {
  console.clear();

  CFonts.say(
    'Please, enter your name.\n After pressing ENTER, the game will start.',
    {
      font: 'tiny',
      align: 'center',
      colors: ['yellow', 'black']
    }
  );

  term.inputField(function (_error, input) {
    index.player.name = input;
    if (index.player.name === '') {
      index.player.name = 'Player1';
    }
    index.startGame();
  });
};

module.exports = { addName };
