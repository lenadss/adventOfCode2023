import fs from 'fs';
const input = fs
  .readFileSync('./assets/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map((v) => v.split(''));

//console.log('input');
//console.log(input);

const expansion = 1000000;

let emptyRows = [];
for (let i = 0; i < input.length; i++) {
  if (!input[i].includes('#')) {
    emptyRows.push(i);
  }
}

//console.log('emptyRows');
//console.log(emptyRows);

let emptyCols = [];
for (let j = 0; j < input[0].length; j++) {
  if (!input.map((row) => row[j]).includes('#')) {
    emptyCols.push(j);
  }
}

//console.log('emptyCols');
//console.log(emptyCols);

let galaxies = input.flatMap((row, i) =>
  row.map((p, j) => (p === '#' ? [i, j] : [])).filter((v) => v.length > 0)
);

//console.log('galaxies');
//console.log(galaxies);

let sum = 0;
const numberOfGalaxies = galaxies.length;
for (let i = 0; i < numberOfGalaxies - 1; i++) {
  const [startRow, startCol] = galaxies[i];
  for (let j = i + 1; j < numberOfGalaxies; j++) {
    const [endRow, endCol] = galaxies[j];

    const rows = [startRow, endRow].sort((a, b) => a - b);
    const cols = [startCol, endCol].sort((a, b) => a - b);

    const emptyRowsInBetween = emptyRows.reduce(
      (acc, r) => acc + (rows[0] < r && r < rows[1] ? 1 : 0),
      0
    );
    const emptyColsInBetween = emptyCols.reduce(
      (acc, c) => acc + (cols[0] < c && c < cols[1] ? 1 : 0),
      0
    );
    sum +=
      rows[1] -
      rows[0] +
      emptyRowsInBetween * (expansion - 1) +
      (cols[1] - cols[0] + emptyColsInBetween * (expansion - 1));
  }
}
console.log(sum);
