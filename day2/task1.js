import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

const findRed = /([\d.]+) *red/g;
const findGreen = /([\d.]+) *green/g;
const findBlue = /([\d.]+) *blue/g;

let gamesIdSum = 0;
input.forEach((str) => {
  let game = str.split(': ');
  let gameId = Number(game[0].replace(/[^0-9]/g, ''));

  let redCubes = Array.from(game[1].matchAll(findRed), (m) => m[1]);
  const maxNumOfRedCubesInGame = Math.max(...redCubes);

  let greenCubes = Array.from(game[1].matchAll(findGreen), (m) => m[1]);
  const maxNumOfGreenCubesInGame = Math.max(...greenCubes);

  let blueCubes = Array.from(game[1].matchAll(findBlue), (m) => m[1]);
  const maxNumOfBlueCubesInGame = Math.max(...blueCubes);

  if (
    maxNumOfRedCubesInGame <= RED_CUBES &&
    maxNumOfGreenCubesInGame <= GREEN_CUBES &&
    maxNumOfBlueCubesInGame <= BLUE_CUBES
  ) {
    gamesIdSum += gameId;
  }
});

console.log('GamesId Sum = ' + gamesIdSum);
