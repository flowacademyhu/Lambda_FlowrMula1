const axel = require('axel');
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const mapWidth = 11;
const mapHeight = 20;
const defaultPrintGameInterval = 700;
const reduceIntervalBy = 100;
const minimumInterval = 200;
const reduceIntervalAtStep = 20;
const addEnemyFrequencyPercent = 0.5;
const carHeight = 4;
const mapColor = [211, 211, 211]; // lightgray
const mapTextureColor = [175, 175, 175];
const tireColor = [0, 0, 0]; // black
const cockpitColor = [47, 79, 79]; // darkslategray
const carColors = {
  red: [255, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
  gold: [255, 215, 0],
  orange: [255, 165, 0],
  purple: [128, 0, 128],
  yellow: [255, 255, 0],
  pink: [255, 192, 203]
};
const tireCharacter = '◼';
const bodyCharacter = '█';
const noseCharacter = '▲';
const driverCharacter = '◉';
const mapBorderCharacter = '≣';
const scoreText = 'Score:';
let printGameInterval;
let intervalId;
let step;
let score;

const generateCarPattern = (car, startingCoordinates) => {
  const coordinates = [];
  startingCoordinates.color = car.color; // nose
  startingCoordinates.character = noseCharacter;
  coordinates.push(startingCoordinates);
  let obj = {}; // tire front left
  obj.x = startingCoordinates.x - 1;
  obj.y = startingCoordinates.y + 1;
  obj.color = tireColor;
  obj.character = tireCharacter;
  coordinates.push(obj);
  obj = {}; // body front
  obj.x = startingCoordinates.x;
  obj.y = startingCoordinates.y + 1;
  obj.color = car.color;
  obj.character = bodyCharacter;
  coordinates.push(obj);
  obj = {}; // tire front right
  obj.x = startingCoordinates.x + 1;
  obj.y = startingCoordinates.y + 1;
  obj.color = tireColor;
  obj.character = tireCharacter;
  coordinates.push(obj);
  obj = {}; // body left
  obj.x = startingCoordinates.x - 1;
  obj.y = startingCoordinates.y + 2;
  obj.color = car.color;
  obj.character = bodyCharacter;
  coordinates.push(obj);
  obj = {}; // body middle, driver
  obj.x = startingCoordinates.x;
  obj.y = startingCoordinates.y + 2;
  obj.color = car.color;
  obj.backgroundColor = cockpitColor;
  obj.character = driverCharacter;
  coordinates.push(obj);
  obj = {}; // body right
  obj.x = startingCoordinates.x + 1;
  obj.y = startingCoordinates.y + 2;
  obj.color = car.color;
  obj.character = bodyCharacter;
  coordinates.push(obj);
  obj = {}; // tire rear left
  obj.x = startingCoordinates.x - 1;
  obj.y = startingCoordinates.y + 3;
  obj.color = tireColor;
  obj.character = tireCharacter;
  coordinates.push(obj);
  obj = {}; // body rear
  obj.x = startingCoordinates.x;
  obj.y = startingCoordinates.y + 3;
  obj.color = car.color;
  obj.character = bodyCharacter;
  coordinates.push(obj);
  obj = {}; // tire rear right
  obj.x = startingCoordinates.x + 1;
  obj.y = startingCoordinates.y + 3;
  obj.color = tireColor;
  obj.character = tireCharacter;
  coordinates.push(obj);
  car.coordinates = coordinates;
};

const player = {};
const enemies = [];

const playerStartingPosition = () => {
  generateCarPattern(player, {
    x: Math.floor(mapWidth / 2),
    y: mapHeight - 8
  });
};

const setCarColor = (car, colorName) => {
  car.color = carColors[colorName];
};

const generateRandomX = () => {
  const max = mapWidth - 2;
  return Math.floor(Math.random() * (max - 1 + 1)) + 1;
};

const getRandomCarColor = (carColors) => {
  const keys = Object.keys(carColors);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
};

const addEnemy = () => {
  const enemy = {};
  do {
    setCarColor(enemy, getRandomCarColor(carColors));
  } while (enemy.color === player.color);
  generateCarPattern(enemy, { x: generateRandomX(), y: 0 });
  enemies.push(enemy);
};

const generateMap = (width, height) => {
  const row = '|'.repeat(width).split('');
  const map = [];
  for (let i = 0; i < height; i++) {
    map.push([...row]);
  }
  return map;
};

const printCar = (car, map) => {
  for (const coordinate of car.coordinates) {
    map[coordinate.y][coordinate.x] = coordinate;
  }
};

const printPlayerCar = (player, map) => {
  printCar(player, map);
};

const printEnemyCars = (enemies, map) => {
  for (const enemy of enemies) {
    printCar(enemy, map);
  }
};

const movePlayerHorizontally = (player, x) => {
  if (x === -1) {
    if (player.coordinates[1].x === 0) {
      return;
    }
    for (let i = 0; i < player.coordinates.length; i++) {
      player.coordinates[i].x -= 1;
    }
  } else if (x === 1) {
    if (player.coordinates[3].x === mapWidth - 1) {
      return;
    }
    for (let i = 0; i < player.coordinates.length; i++) {
      player.coordinates[i].x += 1;
    }
  }
};

const movePlayerVertically = (player, y) => {
  if (y === -1) {
    if (player.coordinates[1].y === 5) {
      return;
    }
    for (let i = 0; i < player.coordinates.length; i++) {
      player.coordinates[i].y -= 1;
    }
  } else if (y === 1) {
    if (player.coordinates[3].y === mapHeight - 7) {
      return;
    }
    for (let i = 0; i < player.coordinates.length; i++) {
      player.coordinates[i].y += 1;
    }
  }
};

const printScoreAxel = () => {
  axel.cursor.restore();
  axel.bg(0, 0, 0); // black
  axel.fg(255, 0, 0); // red
  axel.text(
    0,
    mapHeight - carHeight * 2 + 1,
    scoreText + score.toString().padStart(mapWidth + 8 - scoreText.length, ' ')
  );
};

const printMapBorderAxel = (i, j) => {
  const onLineEnd = j === mapWidth - 1;
  axel.bg(255, 255, 255);
  axel.fg(...carColors.red);
  axel.text(j + 4 + (onLineEnd ? 2 : 0), i + 1 - carHeight, mapBorderCharacter);
};

const printGrassAxel = (i, j) => {
  const onLineEnd = j === mapWidth - 1;
  axel.bg(0, 255, 0);
  axel.fg(255, 255, 255);
  for (let n = 0; n < 3; n++) {
    axel.text(j + 1 + n + (onLineEnd ? 6 : 0), i + 1 - carHeight, '⋮');
  }
};

const printGameAxel = () => {
  axel.clear();
  const map = generateMap(mapWidth, mapHeight);
  printPlayerCar(player, map);
  printEnemyCars(enemies, map);
  for (let i = carHeight; i < map.length - carHeight; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (j === 0 || j === mapWidth - 1) {
        printMapBorderAxel(i, j);
        printGrassAxel(i, j);
      }
      axel.bg(...mapColor);
      if (typeof map[i][j] === 'object') {
        axel.fg(...map[i][j].color);
        if (map[i][j].backgroundColor) {
          axel.bg(...map[i][j].backgroundColor);
        }
        axel.text(j + 1 + 4, i + 1 - carHeight, map[i][j].character);
      } else {
        axel.fg(...mapTextureColor);
        axel.text(j + 1 + 4, i + 1 - carHeight, map[i][j]);
      }
    }
  }
  printScoreAxel();
  // axel.text(0, mapHeight - carHeight * 2 + 2, 'Step: ' + step);
  // axel.text(0, mapHeight - carHeight * 2 + 3, 'Interval: ' + printGameInterval);
  axel.cursor.restore();
};

const checkCollision = (player, enemies) => {
  for (const playerCoordinate of player.coordinates) {
    for (const enemy of enemies) {
      for (const enemyCoordinate of enemy.coordinates) {
        if (
          playerCoordinate.x === enemyCoordinate.x &&
          playerCoordinate.y === enemyCoordinate.y
        ) {
          return true;
          // console.log('Game Over!');
          // process.exit();
        }
      }
    }
  }
  return false;
};

const movePlayer = (player) => {
  stdin.on('data', (key) => {
    if (key === 'q') {
      process.exit();
    } else if (key === 'a') {
      movePlayerHorizontally(player, -1);
    } else if (key === 'd') {
      movePlayerHorizontally(player, 1);
    } else if (key === 'w') {
      movePlayerVertically(player, -1);
    } else if (key === 's') {
      movePlayerVertically(player, 1);
    }
    printGameAxel();
  });
};

const removeEnemy = (index) => {
  enemies.splice(index, 1);
};

const isEnemyDown = (enemy) => enemy.coordinates[5].y === mapHeight - 1;

const moveEnemies = (enemies) => {
  for (const enemy of enemies) {
    for (let i = 0; i < enemy.coordinates.length; i++) {
      enemy.coordinates[i].y += 1;
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    if (isEnemyDown(enemies[i])) {
      removeEnemy(i);
      score++;
    }
  }
};

const runGame = () => {
  moveEnemies(enemies);
  printGameAxel();
  // checkCollision(player, enemies);
  if (checkCollision(player, enemies)) {
    clearInterval(intervalId);
    return;
  }
  step++;
  if (
    enemies.length === 0 ||
    step % Math.round(mapHeight * addEnemyFrequencyPercent) === 0
  ) {
    addEnemy();
  }
  if (
    step > 0 &&
    step % reduceIntervalAtStep === 0 &&
    printGameInterval >= minimumInterval + reduceIntervalBy
  ) {
    printGameInterval -= reduceIntervalBy;
    clearInterval(intervalId);
    intervalId = setInterval(runGame, printGameInterval);
  }
};

const startGame = (player, enemies) => {
  printGameInterval = defaultPrintGameInterval;
  score = 0;
  step = 0;
  setCarColor(player, 'blue');
  playerStartingPosition();
  movePlayer(player);
  intervalId = setInterval(runGame, printGameInterval);
};

startGame(player, enemies);
