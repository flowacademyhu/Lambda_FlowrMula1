const term = require('terminal-kit').terminal;
const ctx = require('axel');
const index = require('./index');
const colorPicking = require('./colorPicking');

term.red('Welcome to Flowrmula 1!\n Buckle in!\n');

const items = ['New game', 'High score', 'Exit'];

const menu = term.singleColumnMenu(items, function (_error, response) {
  console.clear();
  if (response.selectedText === 'New game') {
    colorPicking.colorPicking();
  }
  // if (response.selectedText === 'High score')
  if (response.selectedText === 'Exit') {
    process.exit();
  }
});
