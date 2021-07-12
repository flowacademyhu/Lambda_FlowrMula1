const term = require('terminal-kit').terminal;
const index = require('./index');

const addName = () => {
  console.clear();
  term.red(
    'Please enter your name.\nThe game will start after pressing the Enter key.\n'
  );

  term.inputField(function (_error, input) {
    index.startGame();
  });
};

exports.addName = addName;
