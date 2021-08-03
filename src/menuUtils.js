const CFonts = require('cfonts');

function renderMenuItem(item) {
  return CFonts.render(item.title, {
    font: 'tiny',
    align: 'center',
    colors: ['red', 'black']
  }).string
}

module.exports = {renderMenuItem}