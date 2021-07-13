const fs = require('fs');

fs.readFile('./scores.txt', 'utf-8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
