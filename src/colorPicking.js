const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const addName = require('./addName');
const index = require('./index');
const {renderMenuItem} = require('./menuUtils');

function red() {
  index.setCarColor(index.player, 'red');
}

function blue() {
  index.setCarColor(index.player, 'blue');
}

function green() {
  index.setCarColor(index.player, 'green');
}

const items = [
  {
    title: 'Red',
    handler: red,
  },
  {
    title: 'Blue',
    handler: blue,
  },
  {
    title: 'Green',
    handler: green,
  }
];

const formattedItems = items.map(renderMenuItem)

const colorPicking = (menu) => {
  console.clear();

  CFonts.say('Please, pick a color for your car.', {
    font: 'tiny',
    align: 'center',
    colors: ['yellow', 'black']
  });

  term.singleColumnMenu(formattedItems, function (_error, response) {
    const handler = items[response.selectedIndex].handler;

    handler();

    addName.addName(menu);
  });
};

module.exports = { colorPicking };
