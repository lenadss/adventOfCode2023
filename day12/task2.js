import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

let records = input.map((row) => {
  const [springConditions, groups] = row.split(' ');
  return {
    springConditions,
    groups: groups.split(',').map((v) => +v),
  };
});

//console.log('records');
//console.log(records);
let cache = new Map();

const count = (conditions, groups) => {
  const key = [conditions, groups.toString()].join('');
  if (cache.has(key)) return cache.get(key);

  if (conditions === '') {
    return groups.length === 0 ? 1 : 0;
  }

  if (groups.length === 0) {
    return conditions.includes('#') ? 0 : 1;
  }

  let result = 0;

  if ('.?'.includes(conditions[0])) {
    result += count(conditions.slice(1), groups);
  }

  if ('#?'.includes(conditions[0])) {
    if (
      groups[0] <= conditions.length &&
      !conditions.slice(0, groups[0]).includes('.') &&
      (groups[0] === conditions.length || conditions[groups[0]] !== '#')
    ) {
      result += count(conditions.slice(groups[0] + 1), groups.slice(1));
    }
  }

  cache.set(key, result);
  return result;
};

let totalArrangments = 0;

for (const record of records) {
  const unfoldedConditions = new Array(5)
    .fill(record.springConditions)
    .join('?');
  const unfoldedGroups = Array(5).fill(record.groups).flat();
  //console.log('unfoldedConditions');
  //console.log(unfoldedConditions);
  //console.log('unfoldedGroups');
  //console.log(unfoldedGroups);

  totalArrangments += count(unfoldedConditions, unfoldedGroups);
}

console.log('totalArrangments = ' + totalArrangments);
