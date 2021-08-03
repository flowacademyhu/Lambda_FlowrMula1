const term = require('terminal-kit').terminal;
const CFonts = require('cfonts');
const menu = require('./menu');

const checkCollision = (player, enemies) => {
  for (const playerCoordinate of player.coordinates) {
    for (const enemy of enemies) {
      for (const enemyCoordinate of enemy.coordinates) {
        if (
          playerCoordinate.x === enemyCoordinate.x &&
          playerCoordinate.y === enemyCoordinate.y
        ) {
          console.clear();
          CFonts.say(
            'Oops-a-daisy! You wrecked your car.\n Press Enter to go back to the menu.',
            {
              font: 'tiny',
              align: 'center',
              gradient: ['red', 'black']
            }
          );
          term.grabInput({ mouse: 'button' });

          term.on('key', function (name) {
            if (name === 'ENTER') {
              menu.menu();
            }
          });
        }
      }
    }
  }
};
