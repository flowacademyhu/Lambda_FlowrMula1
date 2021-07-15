const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const colorPicking = require('./colorPicking');
const leaderboard = require('./leaderboard');
const scores = require('./writehighscores');
const player = require('./index').player;

const menu = () => {
  console.clear();

  CFonts.say('Welcome to Flowrmula 1!\n Buckle in.', {
    font: 'block',
    align: 'center',
    gradient: ['yellow', 'red']
  });

  const items = [
    CFonts.render('New game', {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string,
    CFonts.render('High score', {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string,
    CFonts.render('Exit', {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string
  ];

  term.singleColumnMenu(items, function (_error, response) {
    console.clear();

    if (
      response.selectedText ===
      CFonts.render('New game', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      colorPicking.colorPicking(menu);
    }
    if (
      response.selectedText ===
      CFonts.render('High score', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      leaderboard.leaderboard(menu);
    }
    if (
      response.selectedText ===
      CFonts.render('Exit', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      process.exit();
    }
  });
};

module.exports = { menu };
