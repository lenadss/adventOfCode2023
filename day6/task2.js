import fs from 'fs';
const data = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

let time = Number(data[0].split(':')[1].replace(/[^0-9]/g, ''));
let maxDistance = Number(data[1].split(':')[1].replace(/[^0-9]/g, ''));

console.log('time = ' + time);
console.log('maxDistance = ' + maxDistance);

let waysToWin = 0;

for (let holdTime = 0; holdTime <= time; holdTime++) {
  let speed = holdTime;
  let timeLeft = time - holdTime;

  if (speed * timeLeft > maxDistance) {
    waysToWin++;
  }
}
console.log('waysToWin = ' + waysToWin);
