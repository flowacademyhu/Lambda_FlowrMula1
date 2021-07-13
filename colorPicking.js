const term = require('terminal-kit').terminal;
const addName = require('./addName');
const CFonts = require('cfonts');

const colorPicking = () => {
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
      addName.addName();
    }
    if (
      response.selectedText ===
      CFonts.render('Blue', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      addName.addName();
    }
    if (
      response.selectedText ===
      CFonts.render('Green', {
        font: 'tiny',
        align: 'center',
        colors: ['red', 'black']
      }).string
    ) {
      addName.addName();
    }
  });
};

module.exports = { colorPicking };
