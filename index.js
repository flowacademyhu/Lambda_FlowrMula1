// const Player = {
//   coordinates: [[height], [width]]
// };
const table = require('table').table;
const mapWidth = 5;
const mapHeight = 5;

const generateMap = (width, height) => {
  const arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};

const fillMap = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = ' ';
    }
  }
};

// const printGame = (player, enemy, map) => {};

const map = generateMap(mapWidth, mapHeight);
fillMap(map);
// console.log(map);
console.log(table(map));
