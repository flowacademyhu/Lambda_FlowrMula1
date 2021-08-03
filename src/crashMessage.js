const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');

const crashMessage = (menu) => {
  console.clear();

  term.grabInput();

  term.on('key', function (name) {
    if (name === 'ENTER') {
      term.removeAllListeners('key');
      menu();
    }
  });

  CFonts.say(
    'Oops-a-daisy! You wrecked your car.\n Press ENTER to go back to the menu.',
    {
      font: 'tiny',
      align: 'center',
      colors: ['yellow', 'black']
    }
  );
};

module.exports = { crashMessage };
