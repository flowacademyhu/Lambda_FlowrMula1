const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const addName = require('./addName');
const index = require('./index');

const colorPicking = (menu) => {
  console.clear();

  CFonts.say('Please, pick a color for your car.', {
    font: 'tiny',
    align: 'center',
    colors: ['yellow', 'black']
  });

  const items = [
    CFonts.render('Red', {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string,
    CFonts.render('Blue', {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string,
    CFonts.render('Green', {
      font: 'tiny',
      align: 'center',
      colors: ['red', 'black']
    }).string
  ];

  term.singleColumnMenu(items, function (_error, response) {
    if (
      response.selectedText ===
      CFonts.render('Red', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      index.setCarColor(index.player, 'red');
      addName.addName(menu);
    }
    if (
      response.selectedText ===
      CFonts.render('Blue', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      index.setCarColor(index.player, 'blue');
      addName.addName(menu);
    }
    if (
      response.selectedText ===
      CFonts.render('Green', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      index.setCarColor(index.player, 'green');
      addName.addName(menu);
    }
  });
};

module.exports = { colorPicking };
