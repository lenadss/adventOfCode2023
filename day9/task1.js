import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const histories = input.map((row) => row.split(' ').map((v) => Number(v)));

//console.log(histories);

const difference = (history) => {
  const result = [];
  for (let i = 0; i < history.length - 1; i++) {
    result.push(history[i + 1] - history[i]);
  }
  return result;
};

const differences = (history) => {
  const result = [history];
  while (history.find((n) => n != 0)) {
    const d = difference(history);
    result.push(d);
    history = d;
  }
  return result;
};

const sum = histories
  .map((h) => {
    const d = differences(h);
    let extrapolation = d
      .reverse()
      .reduce((acc, curr) => acc + curr[curr.length - 1], 0);
    //console.log('Extrapolation');
    //console.log(extrapolation);
    return extrapolation;
  })
  .reduce((a, b) => a + b, 0);

console.log('Extrapolations = ' + sum);
