import fs from 'fs';
const input = fs
  .readFileSync('./assets/input-test.txt', 'utf-8')
  .split(/\r?\n/);

const seeds = input[0]
  .split(': ')[1]
  .split(' ')
  .map((e) => Number(e));

//console.log('seeds');
//console.log(seeds);

const maps = [];
let map = { name: '', ranges: [] };

for (let i = 2; i < input.length; i++) {
  const line = input[i];
  if (line === '') {
    //console.log(map.ranges);
    maps.push(map);
    map = { name: '', ranges: [] };
  } else if (line.endsWith('map:')) {
    map.name = line.split(' ')[0];
  } else {
    const [destination, source, range] = line.split(' ').map((e) => Number(e));
    map.ranges.push({ source, destination, range });
  }
}

//console.log('maps');
//console.log(maps);

let minLocation = Number.MAX_SAFE_INTEGER;
console.time('search');
for (const s of seeds) {
  let match = s;
  for (const category of maps) {
    for (const r of category.ranges) {
      if (match >= r.source && match < r.source + r.range) {
        match = r.destination + match - r.source;
        break;
      }
    }
  }
  minLocation = Math.min(minLocation, match);
}

console.log('Lowest location: ' + minLocation);
console.timeEnd('search');
