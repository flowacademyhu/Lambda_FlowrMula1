const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const colorPicking = require('./colorPicking');
const leaderboard = require('./leaderboard');
const audio = require('./audio');

const menu = () => {
  console.clear();

  CFonts.say('Welcome to Flowrmula 1!\n Buckle in.', {
    font: 'block',
    align: 'center',
    gradient: ['yellow', 'red']
  });

  const items = [
    'New game',
    'High score',
    'Exit'
  ];

  const formattedItems = []

  for(let i =0; i< items.length; i++) {
    formattedItems.push(CFonts.render(items[i], {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string)
  }

  term.singleColumnMenu(formattedItems, function (_error, response) {
    console.clear();

    if (response.selectedIndex === 0) {
      colorPicking.colorPicking(menu);
    }
    if (response.selectedIndex === 1) {
      leaderboard.leaderboard(menu);
    }
    if (response.selectedIndex === 2) {
      audio.stopMusicPlayer();
      process.exit();
    }
  });
};

module.exports = { menu };
