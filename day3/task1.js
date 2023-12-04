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

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function isSymbol(value) {
  return /[^a-zA-Z\d\.]/.test(value);
}

let input = await asyncReadFile('./assets/input.txt');
let partNumbers = [];

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
            isPartNumber
          )
            return;

          if (
            isSymbol(input[row + i][startIndex + j]) ||
            isSymbol(input[row + i][endIndex + j])
          ) {
            isPartNumber = true;
          }
        });
      });

      if (isPartNumber) {
        partNumbers.push(n);
      }
      col = endIndex + 1;
      //console.log(n);
    } else {
      col++;
    }
  }
}
//console.log(partNumbers);
const sum = partNumbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);
console.log(sum);
