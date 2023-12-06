import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const findRed = /([\d.]+) *red/g;
const findGreen = /([\d.]+) *green/g;
const findBlue = /([\d.]+) *blue/g;

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
