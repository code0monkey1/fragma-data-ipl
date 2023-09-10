import { Match } from './top-n.test';

const csv = require('csv-parser');
const fs = require('fs');

const path = require('path');

interface Parser<T> {
  parse(): Promise<T[]>;
}

export const csvParser = async (fileName: string): Promise<Match[]> => {
  const results: Match[] = [];

  await new Promise((resolve) => {
    fs.createReadStream(fileName)
      .pipe(csv())
      .on('data', (data: Match) => results.push(data))
      .on('end', resolve);
  });

  return results;
};

export class CsvParser implements Parser<Match> {
  constructor(private readonly fileName: string) {}
  async parse(): Promise<Match[]> {
    const results: Match[] = [];

    await new Promise((resolve) => {
      fs.createReadStream(this.fileName)
        .pipe(csv())
        .on('data', (data: Match) => results.push(data))
        .on('end', resolve);
    });

    return results;
  }
}

// (async () => {
//   const result = await csvParser('./data/matches.csv');

//   console.log('Results are', result);

//   console.log('The total lines are', result.length);

//   console.log('First line', result[0]);
// })();
