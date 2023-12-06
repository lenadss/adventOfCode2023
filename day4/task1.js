import fs from 'fs';
const input = fs.readFileSync('./assets/input.txt', 'utf-8').split(/\r?\n/);

let gameSum = 0;

input.forEach((str) => {
  let game = str.split(': ');
  let cards = game[1].split(' | ');
  //console.log(cards);
  let winningNumbers = cards[0]
    .split(' ')
    .filter((n) => n)
    .map((n) => Number(n));
  let yourNumbers = cards[1]
    .split(' ')
    .filter((n) => n)
    .map((n) => Number(n));
  //console.log(winningNumbers);
  //console.log(yourNumbers);
  let intersection = winningNumbers.filter((value) =>
    yourNumbers.includes(value)
  );
  //console.log(intersection);
  let cardWorth = 0;

  if (intersection.length > 0) {
    intersection.forEach(() => {
      if (!cardWorth) cardWorth = 1;
      else cardWorth = cardWorth * 2;
    });
  }
  //console.log(cardWorth);
  gameSum = gameSum + cardWorth;
});

console.log('Game Sum = ' + gameSum);
