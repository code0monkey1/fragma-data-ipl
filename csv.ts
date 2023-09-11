import * as path from 'path';
import { Match, TOSS } from './src/interfaces/services';
import { APP_ROOT } from './utils';

const csv = require('csv-parser');
const fs = require('fs');
export interface Parser<T> {
  parse(): Promise<T[]>;
}

export class CsvParser implements Parser<Match> {
  constructor(private readonly fileName: string) {}
  async parse(): Promise<Match[]> {
    const results: Match[] = [];

    await new Promise((resolve) => {
      fs.createReadStream(APP_ROOT + this.fileName)
        .pipe(csv())
        .on('data', (data: Match) =>
          results.push({
            ...data,
            TOSS_DECISION:
              data.TOSS_DECISION === 'field' ? TOSS.FIELD : TOSS.BAT,
            SEASON: Number(data.SEASON),
          })
        )
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
