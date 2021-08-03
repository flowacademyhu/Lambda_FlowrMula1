const fs = require('fs');
const adatok = require('./index');
const ujAdatok = require('./addName');
const writeScores = (name, score) => {
  {
    fs.appendFileSync('./scores.txt', `\n${name};${score}`, 'utf-8');
  }
};

module.exports = { writeScores };
