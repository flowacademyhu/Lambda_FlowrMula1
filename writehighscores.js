const fs = require('fs');
const writeScores = (name, score) => {
  // if (isEnemyDown === true)
  {
    fs.appendFileSync('./scores.txt', `\n${name};${score}`, 'utf-8');
  }
};

module.exports = { writeScores };
