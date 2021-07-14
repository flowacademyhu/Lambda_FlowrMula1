const term = require('terminal-kit').terminal;
const colorPicking = require('./colorPicking');
const CFonts = require('cfonts');

console.clear();

CFonts.say('Welcome to Flowrmula 1!\n Buckle in.', {
  font: 'tiny',
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

const menu = term.singleColumnMenu(items, function (_error, response) {
  console.clear();
  if (
    response.selectedText ===
    CFonts.render('New game', {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string
  ) {
    colorPicking.colorPicking();
  }
  // if (response.selectedText === 'High score')
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

module.exports = { menu };