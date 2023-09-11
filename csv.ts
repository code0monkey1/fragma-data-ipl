import * as path from 'path';
import { Match, TOSS } from './src/interfaces/services';
import { APP_ROOT } from './utils';

const csv = require('csv-parser');
const fs = require('fs');
export interface Parser<T> {
  parse(fileName: string): Promise<T[]>;
}

export class CsvParser implements Parser<Match> {
  async parse(fileName: string): Promise<Match[]> {
    const results: Match[] = [];

    await new Promise((resolve) => {
      fs.createReadStream(APP_ROOT + fileName)
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
