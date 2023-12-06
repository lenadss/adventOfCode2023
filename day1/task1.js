// 👇️ if using ES6 Imports uncomment line below
//import { readFileSync, promises as fsPromises } from 'fs';
import { promises as fsPromises } from 'fs';

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    return contents.split(/\r?\n/);
  } catch (err) {
    console.log(err);
  }
}

let input = await asyncReadFile('./assets/input.txt');

let numArr = input.map((str) => {
  let num = str.replace(/[^0-9]/g, '');
  return Number(num[0] + num[num.length - 1]);
});

const sum = numArr.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);

console.log(numArr);
console.log(sum);
