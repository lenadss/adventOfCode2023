import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

function isNumeric(value) {
  return /\d/.test(value);
}

let gears = {};

for (let row = 0; row < input.length; row++) {
  let col = 0;
  while (col < input[row].length) {
    if (isNumeric(input[row][col])) {
      let startIndex = col;
      let endIndex = col;
      let n = Number(input[row][col]);

      if (col + 1 < input[row].length) {
        for (let c = col + 1; c < input[row].length; c++) {
          if (isNumeric(input[row][c])) {
            n = n * 10 + Number(input[row][c]);
            endIndex = c;
          } else {
            break;
          }
        }
      }

      let isPartNumber = false;

      [-1, 0, 1].forEach((i) => {
        if (row + i < 0 || row + i === input.length || isPartNumber) return;

        [-1, 0, 1].forEach((j) => {
          if (
            startIndex + j < 0 ||
            startIndex + j === input[row].length ||
            endIndex + j < 0 ||
            endIndex + j === input[row].length ||
            (input[row + i][startIndex + j] !== '*' &&
              input[row + i][endIndex + j] !== '*') ||
            isPartNumber
          )
            return;

          let key = '';
          if (input[row + i][startIndex + j] === '*') {
            key = `${row + i}_${startIndex + j}`;
            gears[key] = gears[key] ? [...gears[key], n] : [n];
            isPartNumber = true;
            return;
          }

          if (input[row + i][endIndex + j] === '*') {
            key = `${row + i}_${endIndex + j}`;
            gears[key] = gears[key] ? [...gears[key], n] : [n];
            isPartNumber = true;
            return;
          }
        });
      });

      col = endIndex + 1;
    } else {
      col++;
    }
  }
}
//console.log(gears);

let sum = 0;

Object.values(gears).forEach((val) => {
  if (val.length === 2) {
    let gearRatio = val[0] * val[1];
    sum = sum + gearRatio;
  }
});

console.log('Sum = ' + sum);
