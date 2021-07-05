const Player = {
  coordinates: [[height], [width]]
};

const generateMap = (width, height) => {
  const arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};

const printGame = (player, enemy, map) => {};
