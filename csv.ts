import { Match } from './top-n.test';

const csv = require('csv-parser');
const fs = require('fs');

const path = require('path');

const csvParser = async (fileName: string): Promise<Match[]> => {
  const results: Match[] = [];

  const reader = fs
    .createReadStream(fileName)
    .pipe(csv())
    .on('data', (data: Match) => results.push(data));

  await new Promise((resolve) => {
    reader.on('end', resolve);
  });

  return results;
};

(async () => {
  const result = await csvParser('./data/matches.csv');

  console.log('Results are', result);

  console.log('The total lines are', result.length);

  console.log('First line', result[0]);
})();
