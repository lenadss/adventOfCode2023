import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const words = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
};

let numArr = input.map((str) => {
  let wordsKeys = Object.keys(words);
  let firstIndex = str.length - 1;
  let lastIndex = 0;
  let firstKeyToSubstitute = '';
  let lastKeyToSubstitute = '';

  console.log(str);

  wordsKeys.forEach((key) => {
    let newFirstIndex = str.indexOf(key);
    let newLastIndex = str.lastIndexOf(key);

    if (newFirstIndex > -1 && newFirstIndex <= firstIndex) {
      firstIndex = newFirstIndex;
      firstKeyToSubstitute = key;
    }

    if (newLastIndex > -1 && newLastIndex >= lastIndex) {
      lastIndex = newLastIndex;
      lastKeyToSubstitute = key;
    }
  });

  return Number(words[firstKeyToSubstitute] + words[lastKeyToSubstitute]);
});

const sum = numArr.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);

console.log(numArr);
console.log(sum);
