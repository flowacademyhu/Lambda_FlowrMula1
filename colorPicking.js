const term = require('terminal-kit').terminal;
const index = require('./index');

const colorPicking = () => {
  console.clear();
  term.red('Please, pick a color for your car.\n');

  const items = ['Red', 'Blue', 'Green'];

  term.singleColumnMenu(items, function (_error, response) {
    if (response.selectedText === 'Red') {
      index.startGame();
    }
    if (response.selectedText === 'Blue') {
      index.startGame();
    }
    if (response.selectedText === 'Green') {
      index.startGame();
    }
  });
};

exports.colorPicking = colorPicking;