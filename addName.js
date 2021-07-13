const term = require('terminal-kit').terminal;
const index = require('./index');
const CFonts = require('cfonts');

const addName = () => {
  console.clear();

  CFonts.say(
    'Please, enter your name.\n After pressing Enter, the game will start.',
    {
      font: 'tiny',
      align: 'center',
      colors: ['yellow', 'black']
    }
  );

  term.inputField(function (_error, input) {
    index.player.name = input;
    index.startGame();
  });
};

module.exports = { addName };
