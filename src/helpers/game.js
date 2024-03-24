function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

export function getSum(array) {
  return array.reduce((partialSum, a) => partialSum + a, 0);
}

function generateNonNegtiveColumn(sum, length) {
  const tmp = [];
  for (let i=0; i < length - 1; i++) {
    tmp.push(Math.random());
  }
  tmp.push(0);
  tmp.push(1);
  tmp.sort((a,b) => a - b);
  
  const column = [];
  for (let i=0; i < tmp.length - 1; i++) {
    column.push(Math.floor(sum * (tmp[i + 1] - tmp[i])));
  }
  
  const currentSum = getSum(column);
  const index = getRandomInt(0, length);
  column[index] += sum - currentSum;
  
  return column;
}

function generateIntegerColumn(sum, length) {
  const column = [];
  for (let i=0; i < length - 1; i++) {
    column.push(getRandomInt(-sum + 1, sum))
  }
  
  const currentSum = getSum(column);
  if (Math.abs(sum - currentSum) >= sum) {
    return generateIntegerColumn(sum, length);
  }  
    
  column.push(sum - currentSum);
  return column;
}

function generateNumberColumn(sum, length, includeNegatives) {
  if (includeNegatives) {
    return generateIntegerColumn(sum, length);
  }
  
  return generateNonNegtiveColumn(sum, length);
}

function generateNumberMatrix(sum, numberOfDisks, numbersPerDisk, includeNegatives) {
  const numberMatrix = [];
  for (let i=0; i < numbersPerDisk; i++) {
    const numberColumn = generateNumberColumn(sum, numberOfDisks, includeNegatives);
    numberMatrix.push(numberColumn);
  }
  return numberMatrix;
}

export function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function rotate(array) {
  return array.push(array.shift());
}

function randomRotate(matrix) {
  return matrix.map((row) => {
    const numberOfRotations = getRandomInt(0, row.length);
    for (let i=0; i < numberOfRotations; i++) {
      rotate(row);
    }
    return row;
  });
}

export function isSolved(sum, answer) {
  const numberMatrix = transpose(answer);
  return numberMatrix.every((numberColumn) => getSum(numberColumn) === sum);
}

export function newGame(sum, numberOfDisks, numbersPerDisk, includeNegatives) {
  const numberMatrix = generateNumberMatrix(sum, numberOfDisks, numbersPerDisk, includeNegatives);
  const disksText = transpose(numberMatrix);
  randomRotate(disksText);
  
  if (isSolved(sum, disksText)) {
    return newGame(sum, numberOfDisks, numbersPerDisk, includeNegatives);
  }
  
  return disksText;
}
