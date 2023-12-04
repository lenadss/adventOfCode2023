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

const findRed = /([\d.]+) *red/g;
const findGreen = /([\d.]+) *green/g;
const findBlue = /([\d.]+) *blue/g;

let input = await asyncReadFile('./assets/input.txt');

let gamesSum = 0;
input.forEach((str) => {
  let game = str.split(': ');

  let redCubes = Array.from(game[1].matchAll(findRed), (m) => m[1]);
  const maxNumOfRedCubesInGame = Math.max(...redCubes);

  let greenCubes = Array.from(game[1].matchAll(findGreen), (m) => m[1]);
  const maxNumOfGreenCubesInGame = Math.max(...greenCubes);

  let blueCubes = Array.from(game[1].matchAll(findBlue), (m) => m[1]);
  const maxNumOfBlueCubesInGame = Math.max(...blueCubes);

  gamesSum +=
    maxNumOfRedCubesInGame * maxNumOfGreenCubesInGame * maxNumOfBlueCubesInGame;
});

console.log('GamesId Sum = ' + gamesSum);
