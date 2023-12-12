import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const map = input.map((line) => line.split(''));

const findStart = (map) => {
  return map.flatMap((row, y) => {
    return row.flatMap((char, x) => (char === 'S' ? [x, y] : []));
  });
};

const start = findStart(map);

const directions = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];
const tileConnections = {
  '|': [
    [0, -1],
    [0, 1],
  ],
  '-': [
    [-1, 0],
    [1, 0],
  ],
  L: [
    [0, 1],
    [-1, 0],
  ],
  J: [
    [0, 1],
    [1, 0],
  ],
  7: [
    [0, -1],
    [1, 0],
  ],
  F: [
    [0, -1],
    [-1, 0],
  ],
};

const isPossibleFrom = (direction, tile) => {
  if (!tileConnections[tile]) {
    return false;
  }
  return tileConnections[tile].find(
    ([dx, dy]) => dx === direction[0] && dy === direction[1]
  );
};

const isPossibleTo = (direction, tile) => {
  if (!tileConnections[tile]) {
    return false;
  }
  return tileConnections[tile].find(
    ([dx, dy]) => dx === -direction[0] && dy === -direction[1]
  );
};

const isPossibleMove = (map, [x, y], [dx, dy]) => {
  const currentTile = map[y][x];

  if (
    y + dy > map.length - 1 ||
    y + dy < 0 ||
    x + dx > map[0].length - 1 ||
    x + dx < 0
  ) {
    return false;
  }
  const nextTile = map[y + dy][x + dx];
  return (
    isPossibleTo([dx, dy], currentTile) && isPossibleFrom([dx, dy], nextTile)
  );
};

const findNextLocation = (map, [x, y], visited) => {
  return directions
    .filter(([dx, dy]) => isPossibleMove(map, [x, y], [dx, dy])) // filter possible moves
    .map(([dx, dy]) => [x + dx, y + dy]) // map move to coordinates
    .find(([nx, ny]) => !visited.find(([x, y]) => x === nx && y === ny)); // accept not visisited
};

const buildPipe = (map, location) => {
  const pipe = [];
  while (location) {
    pipe.push(location);
    location = findNextLocation(map, location, pipe);
  }
  return pipe;
};

const fixStartTile = (map) => {
  const [x, y] = findStart(map);
  const tile = Object.entries(tileConnections)
    .filter(([tile, connections]) => {
      return (
        connections.filter(([dx, dy]) => {
          // filter possible connections
          const nextTile = map[y - dy][x - dx]; // get tile
          return (
            isPossibleTo([-dx, -dy], tile) &&
            isPossibleFrom([-dx, -dy], nextTile)
          );
        }).length === 2
      ); // accept only 2 connections
    })
    .map(([tile]) => tile)
    .find(() => true); // get filtered tile
  map[y][x] = tile; // replace start tile
  return map;
};

const fixedMap = fixStartTile(map);
const pipe = buildPipe(fixedMap, start, []);

console.log(`part1: ${pipe.length / 2}`);
