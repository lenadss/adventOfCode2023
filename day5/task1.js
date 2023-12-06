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

let input = await asyncReadFile('./assets/input-test.txt');

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

let seeds = input[0].split(': ')[1].split(' ');

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

function convertor(source, convertorMap) {
  let result = {};
  source.forEach((i) => {
    let item = Number(i);
    let itemMapped = false;
    for (const row of convertorMap) {
      let range = row.split(' ');
      let destinationRange = Number(range[0]);
      let sourceRange = Number(range[1]);
      let rangeLength = Number(range[2]);

      if (item >= sourceRange && item < sourceRange + rangeLength) {
        result = { ...result, [item]: destinationRange + (item - sourceRange) };
        itemMapped = true;
        break;
      }
    }
    if (!itemMapped) {
      result = { ...result, [item]: item };
    }
  });
  return result;
}

let seedsToSoilMap = convertor(seeds, seedsToSoilConvertor);
let soilToFertilizerMap = convertor(
  Object.values(seedsToSoilMap),
  soilToFertilizerConvertor
);
let fertilizerToWaterMap = convertor(
  Object.values(soilToFertilizerMap),
  fertilizerToWaterConvertor
);
let waterToLightMap = convertor(
  Object.values(fertilizerToWaterMap),
  waterToLightConvertor
);
let lightToTemperatureMap = convertor(
  Object.values(waterToLightMap),
  lightToTemperatureConvertor
);
let temperatureToHumidityMap = convertor(
  Object.values(lightToTemperatureMap),
  temperatureToHumidityConvertor
);
let humidityToLocationMap = convertor(
  Object.values(temperatureToHumidityMap),
  humidityToLocationConvertor
);

let lowestLocation = Math.min.apply(Math, Object.values(humidityToLocationMap));

console.log('minLocation = ' + lowestLocation);
