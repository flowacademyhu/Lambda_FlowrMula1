const table = require('table').table;
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const mapWidth = 11;
const mapHeight = 20;

const generateCarPattern = (startingCoordinates) => {
  const coordinates = [];
  coordinates.push(startingCoordinates);
  let obj = {};
  obj.x = startingCoordinates.x - 1;
  obj.y = startingCoordinates.y + 1;
  coordinates.push(obj);
  obj = {};
  obj.x = startingCoordinates.x;
  obj.y = startingCoordinates.y + 1;
  coordinates.push(obj);
  obj = {};
  obj.x = startingCoordinates.x + 1;
  obj.y = startingCoordinates.y + 1;
  coordinates.push(obj);
  obj = {};
  obj.x = startingCoordinates.x;
  obj.y = startingCoordinates.y + 2;
  coordinates.push(obj);
  obj = {};
  obj.x = startingCoordinates.x - 1;
  obj.y = startingCoordinates.y + 3;
  coordinates.push(obj);
  obj = {};
  obj.x = startingCoordinates.x;
  obj.y = startingCoordinates.y + 3;
  coordinates.push(obj);
  obj = {};
  obj.x = startingCoordinates.x + 1;
  obj.y = startingCoordinates.y + 3;
  coordinates.push(obj);
  return coordinates;
};

const player = {
  coordinates: []
};

const playerStartingPosition = () => {
  player.coordinates = generateCarPattern({
    x: Math.floor(mapWidth / 2),
    y: mapHeight - 8
  });
};

const enemies = [];

const generateRandomX = () => {
  const max = mapWidth - 2;
  return Math.floor(Math.random() * (max - 1 + 1)) + 1;
};

const addEnemy = () => {
  const enemy = {};
  enemy.coordinates = generateCarPattern({ x: generateRandomX(), y: 0 });
  enemies.push(enemy);
};

const generateMap = (width, height) => {
  const row = ' '.repeat(width).split('');
  const map = [];
  for (let i = 0; i < height; i++) {
    map.push([...row]);
  }
  return map;
};

const printCar = (car, map) => {
  for (const coord of car.coordinates) {
    map[coord.y][coord.x] = '*';
  }
  return map;
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

const printGame = () => {
  console.clear();
  const map = generateMap(mapWidth, mapHeight);
  printPlayerCar(player, map);
  printEnemyCars(enemies, map);
  console.log(table(map.slice(4, -4)));
  checkCollision(player, enemies);
};

const checkCollision = (player, enemies) => {
  for (const coordinate of player.coordinates) {
    for (const enemy of enemies) {
      for (const enemyCoordinate of enemy.coordinates) {
        if (
          coordinate.x === enemyCoordinate.x &&
          coordinate.y === enemyCoordinate.y
        ) {
          console.log('Game Over!');
          process.exit();
        }
      }
    }
  }
};

const movePlayer = (player) => {
  stdin.on('data', (key) => {
    if (key === 'q') {
      process.exit();
    } else if (key === 'a') {
      movePlayerHorizontally(player, -1);
    } else if (key === 'd') {
      movePlayerHorizontally(player, 1);
    }
    printGame();
  });
};

const moveEnemies = (enemies) => {
  for (const enemy of enemies) {
    moveEnemy(enemy);
  }
};

const moveEnemy = (enemy) => {
  if (enemy.coordinates[5].y === mapHeight - 1) {
    return;
  }
  for (let i = 0; i < enemy.coordinates.length; i++) {
    enemy.coordinates[i].y += 1;
  }
};

const startGame = (player, enemies) => {
  playerStartingPosition();
  addEnemy();
  movePlayer(player);
  setInterval(() => {
    printGame();
    moveEnemies(enemies);
  }, 1000);
};

startGame(player, enemies);
