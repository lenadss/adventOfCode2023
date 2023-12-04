import { promises as fsPromises } from 'fs';

async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
  } catch (err) {
    console.log(err);
  }
}

let input = await asyncReadFile('./assets/input.txt');

let gameSum = 0;
let games = {};
input.forEach((str) => {
  let game = str.split(': ');
  let gameId = Number(game[0].replace(/[^0-9]/g, ''));
  let cards = game[1].split(' | ');

  let winningNumbers = cards[0]
    .split(' ')
    .filter((n) => n)
    .map((n) => Number(n));
  let yourNumbers = cards[1]
    .split(' ')
    .filter((n) => n)
    .map((n) => Number(n));

  let intersection = winningNumbers.filter((value) =>
    yourNumbers.includes(value)
  );
  games = {
    ...games,
    [gameId]: {
      count: 1,
      worth: intersection.length,
    },
  };
});

for (const gameId in games) {
  if (games[gameId].worth > 0) {
    for (let i = 1; i <= games[gameId].worth; i++) {
      let index = Number(gameId) + i;
      if (index <= input.length) {
        games[index].count = games[index].count + games[gameId].count;
      }
    }
  }
  gameSum = gameSum + games[gameId].count;
}

console.log(games);
console.log('Game Sum = ' + gameSum);
