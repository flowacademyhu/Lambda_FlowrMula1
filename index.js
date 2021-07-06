const table = require('table').table;
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const mapWidth = 10;
const mapHeight = 10;

const player = {
  coordinates: [
    { x: 2, y: mapHeight - 4 },
    { x: 1, y: mapHeight - 3 },
    { x: 2, y: mapHeight - 3 },
    { x: 3, y: mapHeight - 3 },
    { x: 2, y: mapHeight - 2 },
    { x: 1, y: mapHeight - 1 },
    { x: 2, y: mapHeight - 1 },
    { x: 3, y: mapHeight - 1 }
  ]
};

const enemies = [
  {
    coordinates: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 3 }
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
  }
};

const movePlayer = (player) => {
  stdin.on('data', (key) => {
    if (key === 'a') {
      movePlayerHorizontally(player, -1);
    } else if (key === 'q') {
      process.exit();
    }
  });
};

const printGame = (player, enemies) => {
  const map = generateMap(mapWidth, mapHeight);
  printPlayerCar(player, map);
  printEnemyCars(enemies, map);
  movePlayer(player);
  setInterval(() => {
    console.log(table(map));
  }, 1000);
};

printGame(player, enemies);
