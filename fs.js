const fs = require('fs');
const Cfonts = require('cfonts');
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

Cfonts.say('Leaderboard', {
  font: 'tiny',
  font: 'block',
  align: 'center',
  //   letterSpacing: ,
  colors: ['yellow', 'black']
});

Cfonts.say(
  ` ${array[0]}\n  ${array[1]}\n  ${array[2]}\n  ${array[3]}\n ${array[4]}`,
  {
    font: 'tiny',
    align: 'center',
    colors: ['red', 'black']
  }
);

// term.grabInput({ mouse: 'button' });

// term.on('key', function (name) {
//   if (name === 'ENTER') {
//     menu.menu();
//   }
// });
// term.on('key', function (name) {
//   if (name === 'ENTER') {
//     menu.menu();
//   }
// });
