import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

let records = input.map((row) => {
  const [springConditions, groups] = row.split(' ');
  return {
    springConditions,
    groups: groups.split(',').map((v) => +v),
  };
});

////console.log('records');
//console.log(records);

const count = (conditions, groups) => {
  //console.log('********New iteration********');
  //console.log('Start conditions = ' + conditions);
  //console.log('Start groups = ' + groups);

  if (conditions === '') {
    return groups.length === 0 ? 1 : 0;
  }

  if (groups.length === 0) {
    return conditions.includes('#') ? 0 : 1;
  }

  let result = 0;

  if ('.?'.includes(conditions[0])) {
    //console.log('----------First if start----------');
    //console.log('1: conditions[0] ' + conditions[0]);

    result += count(conditions.slice(1), groups);

    //console.log('1: Back to conditions[0] ' + conditions[0]);
    //console.log('1: Back to conditions = ' + conditions);
    //console.log('1: Back to groups = ' + groups);
    //console.log('----------First if end----------');
  }

  if ('#?'.includes(conditions[0])) {
    if (
      groups[0] <= conditions.length &&
      !conditions.slice(0, groups[0]).includes('.') &&
      (groups[0] === conditions.length || conditions[groups[0]] !== '#')
    ) {
      //console.log('----------Second if start----------');
      //console.log('2: conditions[0] ' + conditions[0]);

      result += count(conditions.slice(groups[0] + 1), groups.slice(1));

      //console.log('2: Back to conditions[0] ' + conditions[0]);
      //console.log('2: Back to conditions = ' + conditions);
      //console.log('2: Back to groups = ' + groups);
      //console.log('----------Second if end----------');
    }
  }

  //console.log('result = ' + result);
  return result;
};

let totalArrangments = 0;

for (const record of records) {
  totalArrangments += count(record.springConditions, record.groups);
}

console.log('totalArrangments = ' + totalArrangments);
