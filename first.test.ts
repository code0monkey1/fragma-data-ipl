import { parse } from 'csv-parse';
import fs from 'fs';

import { MatchCsvParser, MatchFilter, TopN } from './src/interfaces/services';
import TopNTeams from './src/interfaces/use-cases/teams/top-n-teams-use-case';
import { getMatchFilters } from './src/services/Filter';
import { Match, WinCount } from './top-n.test';

describe('First Test', () => {
  it('one should be one', () => {
    // const mockMatchCsvParser: MatchCsvParser = {
    //   parse: function (): Match[] {
    //     throw new Error('Function not implemented.');
    //   },
    // };
    // const mockMatchFilter1: MatchFilter = {
    //   filter: function (matches: Match[]): Match[] {
    //     throw new Error('Function not implemented.');
    //   },
    // };
    // const mockMatchFilter2: MatchFilter = {
    //   filter: function (matches: Match[]): Match[] {
    //     throw new Error('Function not implemented.');
    //   },
    // };
    // const mockTeamWinCount: WinCount = {
    //   getCount: function (matches: Match[]): Map<string, number> {
    //     throw new Error('Function not implemented.');
    //   },
    // };
    // const mockTopNTeams: TopN = {
    //   getTop: function (teamCount: Map<string, number>, n: number): string[] {
    //     throw new Error('Function not implemented.');
    //   },
    // };
    // const sut = new TopNTeams(
    //   mockMatchCsvParser,
    //   getMatchFilters(2016),
    //   mockTeamWinCount,
    //   mockTopNTeams
    // );
    // const result = sut.execute(3);
    // console.log(result);
  });
});

describe.only('csv parser test', () => {
  it('should read lines from CSV file', async () => {
    const csvFilePath = '../data/matches.csv';
    const matchHeaders = [
      'MATCH_ID',
      'SEASON',
      'CITY',
      'DATE',
      'TEAM1',
      'TEAM2',
      'TOSS_WINNER',
      'TOSS_DECISION',
      'RESULT',
      'WINNER',
    ];
    // const csvParse = new CsvParser(csvFilePath, matchHeaders);
    // const result = await csvParse.readLine();

    // console.log(result);

    // const csvReader = new CsvReader(csvFilePath);

    // let line = await csvReader.readLine();
    // console.log(line);

    // line = await csvReader.readLine();
    // console.log(line);

    // line = await csvReader.readLine();
    // console.log(line);
  }, 100000); // increase timeout to 10 seconds);
});

describe.skip('learning test', () => {
  it('reaads csv properly', () => {
    const file = fs.readFileSync('./data/matches.csv', { encoding: 'utf8' });

    console.log(file);
  });
});

interface Source<T> {
  readLine(): Promise<T | null>;
}

class CsvReader implements Source<string> {
  private readonly readStream: fs.ReadStream;
  private readonly parser: NodeJS.ReadWriteStream;
  private line: string | null = null;

  constructor(filePath: string) {
    this.readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    this.parser = parse({
      delimiter: ',',
      columns: true,
    });
    this.parser.on('readable', () => {
      let record;
      while ((record = this.parser.read()) !== null) {
        console.log(this.line);
        this.line = record as string;
      }
      this.parser.end();
    });
    this.parser.on('error', (err) => {
      console.error(err.message);
    });
  }

  async readLine(): Promise<string | null> {
    if (this.line === null) {
      await new Promise<void>((resolve) => {
        this.parser.once('readable', () => {
          resolve();
        });
      });
    }
    const line = this.line;
    this.line = null;
    return line;
  }
}

export default CsvReader;

// export class CsvReader implements Source<string> {
//   readLine(): Promise<string | null> {
//     throw new Error('Method not implemented.');
//   }
// }

// import parse from 'csv-parser';
// import fs from 'fs';
// import readline from 'readline';

// interface Source<T> {
//   readLine(): Promise<T | null>;
// }

// class CsvReader implements Source<Record<string, any>> {
//   private readonly readStream: fs.ReadStream;
//   private readonly rl: readline.Interface;
//   private readonly parser: parse.Parser;

//   constructor(filePath: string) {
//     this.readStream = fs.createReadStream(filePath);
//     this.rl = readline.createInterface({ input: this.readStream });
//     this.parser = parse();
//   }

//   async readLine(): Promise<Record<string, any> | null> {
//     const line = await new Promise<string | null>((resolve) => {
//       this.rl.once('line', (line) => {
//         resolve(line);
//       });
//     });
//     if (line === null) {
//       return null;
//     }
//     this.parser.write(line);
//     const records = await new Promise<Record<string, any>[]>((resolve) => {
//       this.parser.on('record', (record) => {
//         resolve([record]);
//       });
//     });
//     return records[0];
//   }
// }

// export default CsvReader;
