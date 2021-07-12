const term = require('terminal-kit').terminal;
const addName = require('./addName');

const colorPicking = () => {
  console.clear();
  term.red('Please, pick a color for your car.\n');

  const items = ['Red', 'Blue', 'Green'];

  term.singleColumnMenu(items, function (_error, response) {
    if (response.selectedText === 'Red') {
      addName.addName();
    }
    if (response.selectedText === 'Blue') {
      addName.addName();
    }
    if (response.selectedText === 'Green') {
      addName.addName();
    }
  });
};

exports.colorPicking = colorPicking;
