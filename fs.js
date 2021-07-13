const fs = require('fs');
const fonts = require('cfonts');
const terminalKit = require('terminal-kit').terminal;
let array = [];
fs.readFileSync('./scores.txt', 'utf-8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  //   array = data;
  //   return array;
});
let fileToString = fs.readFileSync('./scores.txt').toString('utf-8');
array = fileToString;

array = array.split('\n');
array = array.map((index) => index.split(';'));
array = array.map((elem) => [elem[0], Number(elem[1])]);
array = array.sort((a, b) => b[1] - a[1]);
array = array.slice(0, 5);

// console.log(cfonts "Leaderboard" --font "chrome");

terminalKit.table(array, {
  hasBorder: true,
  contentHasMarkup: true,
  borderChars: 'heavyRounded',
  borderAttr: { color: 'white' },
  textAttr: { bgColor: 'default' },
  firstCellTextAttr: { bgColor: 'black' },
  firstRowTextAttr: { bgColor: 'black' },
  firstColumnTextAttr: { bgColor: 'black' },
  secondColumnTextAttr: { bgColor: 'red' },
  width: 18,
  lineWrap: false,
  fit: true
});
