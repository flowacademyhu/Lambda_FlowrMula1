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
  {
    title: 'New game',
    handler: newGame,
  },
  {
    title: 'High score',
    handler: highScore,
  },
  {
    title: 'Exit',
    handler: exit,
  }
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
    formattedItems.push(CFonts.render(items[i].title, {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string)
  }


  term.singleColumnMenu(formattedItems, function (_error, response) {
    console.clear();

    const handler = items[response.selectedIndex].handler;

    handler();
  });
};

module.exports = { menu };
