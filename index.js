const table = require('table').table;
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const mapWidth = 10;
const mapHeight = 20;

const player = {
  coordinates: [
    { x: 3, y: mapHeight - 8 },
    { x: 2, y: mapHeight - 7 },
    { x: 3, y: mapHeight - 7 },
    { x: 4, y: mapHeight - 7 },
    { x: 3, y: mapHeight - 6 },
    { x: 2, y: mapHeight - 5 },
    { x: 3, y: mapHeight - 5 },
    { x: 4, y: mapHeight - 5 }
  ]
};

const enemies = [
  {
    coordinates: [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 }
    ]
  },
  {
    coordinates: [
      { x: mapWidth - 2, y: 0 },
      { x: mapWidth - 3, y: 1 },
      { x: mapWidth - 2, y: 1 },
      { x: mapWidth - 1, y: 1 },
      { x: mapWidth - 2, y: 2 },
      { x: mapWidth - 3, y: 3 },
      { x: mapWidth - 2, y: 3 },
      { x: mapWidth - 1, y: 3 }
    ]
  }
];

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
    for (const coordinate of player.coordinates) {
      if (coordinate.x === 0) {
        return;
      }
    }
    for (let i = 0; i < player.coordinates.length; i++) {
      player.coordinates[i].x -= 1;
    }
  } else if (x === 1) {
    for (const coordinate of player.coordinates) {
      if (coordinate.x === mapWidth - 1) {
        return;
      }
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
  for (const coordinate of enemy.coordinates) {
    if (coordinate.y === mapHeight - 1) {
      return;
    }
  }
  for (let i = 0; i < enemy.coordinates.length; i++) {
    enemy.coordinates[i].y += 1;
  }
};

const startGame = (player, enemies) => {
  movePlayer(player);
  setInterval(() => {
    printGame();
    moveEnemies(enemies);
  }, 1000);
};

startGame(player, enemies);
