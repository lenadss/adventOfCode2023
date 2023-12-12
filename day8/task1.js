import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const instruction = input[0];

let nodes = {};
for (let i = 2; i < input.length; i++) {
  const coordinates = [...input[i].matchAll(/([A-Z]){3}/g)].map((m) => m[0]);
  nodes[coordinates[0]] = { L: coordinates[1], R: coordinates[2] };
}

//console.log(nodes);

let point = 'AAA';
let path = nodes[point];
let stepsCounter = 0;
for (let i = 0; i < instruction.length; i++) {
  stepsCounter++;
  point = path[instruction[i]];
  if (point === 'ZZZ') {
    break;
  }
  path = nodes[point];
  if (i + 1 === instruction.length) {
    i = -1;
  }
}

console.log('stepsCounter = ' + stepsCounter);
