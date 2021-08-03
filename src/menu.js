const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const colorPicking = require('./colorPicking');
const leaderboard = require('./leaderboard');
const audio = require('./audio');

function newGame() {
  colorPicking.colorPicking(menu);
}

function highScore() {
  leaderboard.leaderboard(menu);
}

function exit() {
  audio.stopMusicPlayer();
  process.exit();
}

const items = [
  'New game',
  'High score',
  'Exit'
];

const menu = () => {
  console.clear();

  CFonts.say('Welcome to Flowrmula 1!\n Buckle in.', {
    font: 'block',
    align: 'center',
    gradient: ['yellow', 'red']
  });

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

    const selectedMenuItem = items[response.selectedIndex]

    if (selectedMenuItem === 'New game') {
      newGame();
    }
    if (selectedMenuItem === 'High score') {
      highScore();
    }
    if (selectedMenuItem === 'Exit') {
      exit();
    }
  });
};

module.exports = { menu };
