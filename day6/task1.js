import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

let time = input[0]
  .split(':')[1]
  .split(' ')
  .filter((v) => v)
  .map((e) => Number(e));
let distance = input[1]
  .split(':')[1]
  .split(' ')
  .filter((v) => v)
  .map((e) => Number(e));

let races = [];
for (let i = 0; i < time.length; i++) {
  races.push({ time: time[i], maxDistance: distance[i] });
}

//console.log('races');
//console.log(races);

let multiply = 1;

for (const race of races) {
  let waysToWin = 0;

  for (let holdTime = 0; holdTime <= race.time; holdTime++) {
    let speed = holdTime;
    let timeLeft = race.time - holdTime;

    if (speed * timeLeft > race.maxDistance) {
      waysToWin++;
    }
  }
  //console.log('waysToWin = ' + waysToWin);

  multiply = multiply * waysToWin;
}

console.log('multiply = ' + multiply);
