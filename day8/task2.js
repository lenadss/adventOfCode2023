import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const instructions = input[0];

let nodesMap = {};
for (let i = 2; i < input.length; i++) {
  const coordinates = [...input[i].matchAll(/([A-Z0-9]){3}/g)].map((m) => m[0]);
  nodesMap[coordinates[0]] = { L: coordinates[1], R: coordinates[2] };
}

//console.log('instructions = ' + instructions);
//console.log(nodesMap);

let startNodes = Object.keys(nodesMap).filter((key) => key.endsWith('A'));

console.log('startNodes');
console.log(startNodes);

const stepsForEachStart = startNodes.map((node) => {
  let step;
  for (step = 0; !node.endsWith('Z'); step++) {
    const instruction = instructions.charAt(step % instructions.length);
    node = nodesMap[node][instruction];
  }
  return step;
});

console.log('stepsForEachStart');
console.log(stepsForEachStart);

const greatestCommonDivisor = (a, b) => {
  if (a % b != 0) return greatestCommonDivisor(b, a % b);
  else return b;
};

const leastCommonMultiple = (a, b) => {
  return (a * b) / greatestCommonDivisor(a, b);
};

const lcm = stepsForEachStart.reduce((a, b) => leastCommonMultiple(a, b));

console.log('Steps = ' + lcm);
