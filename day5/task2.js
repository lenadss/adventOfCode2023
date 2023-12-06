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

let input = await asyncReadFile('./assets/input.txt');

let seedsToSoilStartIndex = input.indexOf('seed-to-soil map:') + 1;
let soilToFertilizerStartIndex = input.indexOf('soil-to-fertilizer map:') + 1;
let fertilizerToWaterStartIndex = input.indexOf('fertilizer-to-water map:') + 1;
let waterToLightStartIndex = input.indexOf('water-to-light map:') + 1;
let lightToTemperatureStartIndex =
  input.indexOf('light-to-temperature map:') + 1;
let temperatureToHumidityStartIndex =
  input.indexOf('temperature-to-humidity map:') + 1;
let humidityToLocationStartIndex =
  input.indexOf('humidity-to-location map:') + 1;

let seedsRaw = input[0].split(': ')[1].split(' ');
let seedsRanges = seedsRaw.reduce((resultArr, item, index) => {
  const chunkIndex = Math.floor(index / 2);
  if (!resultArr[chunkIndex]) {
    resultArr[chunkIndex] = [];
  }
  resultArr[chunkIndex].push(item);
  return resultArr;
}, []);

console.log('seedsRanges');
console.log(seedsRanges);

let seedsToSoilConvertor = input.slice(
  seedsToSoilStartIndex,
  soilToFertilizerStartIndex - 1
);
let soilToFertilizerConvertor = input.slice(
  soilToFertilizerStartIndex,
  fertilizerToWaterStartIndex - 1
);
let fertilizerToWaterConvertor = input.slice(
  fertilizerToWaterStartIndex,
  waterToLightStartIndex - 1
);
let waterToLightConvertor = input.slice(
  waterToLightStartIndex,
  lightToTemperatureStartIndex - 1
);
let lightToTemperatureConvertor = input.slice(
  lightToTemperatureStartIndex,
  temperatureToHumidityStartIndex - 1
);
let temperatureToHumidityConvertor = input.slice(
  temperatureToHumidityStartIndex,
  humidityToLocationStartIndex - 1
);
let humidityToLocationConvertor = input.slice(humidityToLocationStartIndex);

function convertor(item, convertorMap) {
  for (const row of convertorMap) {
    let range = row.split(' ');
    let destinationRange = Number(range[0]);
    let sourceRange = Number(range[1]);
    let rangeLength = Number(range[2]);

    if (item >= sourceRange && item < sourceRange + rangeLength) {
      return destinationRange + (item - sourceRange);
    }
  }
  return item;
}

let minLocation = null;
seedsRanges.forEach((range) => {
  let startRange = Number(range[0]);
  let lengthRange = Number(range[1]);
  for (let seeds = startRange; seeds < startRange + lengthRange; seeds++) {
    let seedsToSoilMap = convertor(seeds, seedsToSoilConvertor);
    let soilToFertilizerMap = convertor(
      seedsToSoilMap,
      soilToFertilizerConvertor
    );
    let fertilizerToWaterMap = convertor(
      soilToFertilizerMap,
      fertilizerToWaterConvertor
    );
    let waterToLightMap = convertor(
      fertilizerToWaterMap,
      waterToLightConvertor
    );
    let lightToTemperatureMap = convertor(
      waterToLightMap,
      lightToTemperatureConvertor
    );
    let temperatureToHumidityMap = convertor(
      lightToTemperatureMap,
      temperatureToHumidityConvertor
    );
    let humidityToLocationMap = convertor(
      temperatureToHumidityMap,
      humidityToLocationConvertor
    );

    if (!minLocation) minLocation = humidityToLocationMap;
    if (humidityToLocationMap < minLocation)
      minLocation = humidityToLocationMap;
  }
});

console.log('minLocation = ' + minLocation);
