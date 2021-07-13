const fs = require('fs');
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

console.log(array);

array = array.split('\n');
array = array.map((index) => index.split(';'));
array = array.map((elem) => [elem[0], Number(elem[1])]);
array.sort((a, b) => b[1] - a[1]);
console.log(array);
