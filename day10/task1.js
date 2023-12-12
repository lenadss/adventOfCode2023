import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

let startPoint;
const grid = input.map((row, i) => {
  const startIndex = row.indexOf('S');
  if (startIndex > -1) {
    startPoint = { x: i, y: startIndex };
  }
  return row.split('');
});

//console.log('startPoint');
//console.log(startPoint);
//console.log('grid:');
//console.log(grid);

const connectors = {
  '|': [
    [-1, 0],
    [1, 0],
  ],
  '-': [
    [0, -1],
    [0, 1],
  ],
  L: [
    [0, 1],
    [-1, 0],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  7: [
    [0, -1],
    [1, 0],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
};

const lastRow = grid.length - 1;
const lastCol = grid[0].length - 1;

for (let i = 0; i <= lastRow; i++) {
  for (let j = 0; j <= lastCol; j++) {
    const tile = grid[i][j];
    const connector = connectors[tile];
    if (connector) {
      if (
        !connector.every(([x, y]) => {
          const nextX = x + i;
          const nextY = y + j;

          if (nextX < 0 || nextX > lastRow || nextY < 0 || nextY > lastCol) {
            return false;
          }

          const nextTile = grid[nextX][nextY];
          if (nextTile === '.') {
            return false;
          }

          if (
            nextTile !== 'S' &&
            !connectors[nextTile].some(
              ([dx, dy]) => nextX + dx === i && nextY + dy === j
            )
          ) {
            return false;
          }
          return true;
        })
      ) {
        grid[i][j] = '.';
        i = i !== 0 ? i - 2 : i;
        break;
      }
    }
  }
}

//console.log('New grid');
//console.log(grid);

fs.writeFileSync('./assets/output.txt', grid.map((v) => v.join('')).join('\n'));

let count = grid.reduce(
  (acc, cur) => acc + cur.reduce((a, c) => a + (c !== '.' ? 1 : 0), 0),
  0
);

console.log('Count = ' + count);
console.log('Farthest point = ' + count / 2);
