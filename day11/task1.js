import fs from 'fs';
const input = fs
  .readFileSync('./assets/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map((v) => v.split(''));

const rotateArr = (arr) =>
  arr[0].map((val, index) => arr.map((row) => row[index]));

const increaseArr = (arr) => {
  let res = [];
  arr.forEach((row) => {
    if (row.includes('#')) {
      res.push(row);
    } else {
      res.push(row);
      res.push(row);
    }
  });
  return res;
};

let image = increaseArr(input);

//console.log('image');
//console.log(image);

let modifiedImage = rotateArr(increaseArr(rotateArr(image)));

//console.log('modifiedImage');
//console.log(modifiedImage);

let galaxies = modifiedImage.flatMap((row, i) =>
  row.map((p, j) => (p === '#' ? [i, j] : [])).filter((v) => v.length > 0)
);

//console.log('galaxies');
//console.log(galaxies);

const numberOfGalaxies = galaxies.length;

let sum = 0;
for (let i = 0; i < numberOfGalaxies - 1; i++) {
  for (let j = i + 1; j < numberOfGalaxies; j++) {
    sum =
      sum +
      Math.abs(galaxies[j][0] - galaxies[i][0]) +
      Math.abs(galaxies[j][1] - galaxies[i][1]);
  }
}

console.log('distance = ' + sum);
