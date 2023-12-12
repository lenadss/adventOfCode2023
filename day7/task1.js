import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

const order = '23456789TJQKA';
let hands = [];

const count = (c, a) => {
  c[a] = (c[a] || 0) + 1;
  return c;
};

for (let row of input) {
  const [hand, bid] = row.split(' ');
  const value = hand.split('');
  const numericValue = value.map((v) => order.indexOf(v));
  const counts = value.reduce(count, {});
  const duplicates = Object.values(counts).reduce(count, {});
  const rank =
    (duplicates[5] && 7) ||
    (duplicates[4] && 6) ||
    (duplicates[3] && duplicates[2] && 5) ||
    (duplicates[3] && 4) ||
    (duplicates[2] > 1 && 3) ||
    (duplicates[2] && 2) ||
    1;
  hands.push({ numericValue, rank, bid });
}

const compareHands = (h1, h2) => {
  if (h1.rank === h2.rank) {
    let i = 0;
    while (i < h1.numericValue.length) {
      if (h1.numericValue[i] !== h2.numericValue[i]) {
        return h1.numericValue[i] < h2.numericValue[i] ? -1 : 1;
      }
      i++;
    }
  }
  return h1.rank < h2.rank ? -1 : 1;
};

const sortedHands = hands.sort(compareHands);

let totalWinnigs = 0;
for (let i = 0; i < sortedHands.length; i++) {
  totalWinnigs = totalWinnigs + sortedHands[i].bid * (i + 1);
}

console.log('Total winnings = ' + totalWinnigs);
