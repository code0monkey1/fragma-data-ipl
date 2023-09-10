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

describe('csv parser test', () => {
  it('should read lines from CSV file', async () => {
    const csvFilePath = './data/matches.csv';
    const csvReader = new CsvReader(csvFilePath);

    let line = await csvReader.readLine();
    console.log(line);

    line = await csvReader.readLine();
    console.log(line);

    line = await csvReader.readLine();
    console.log(line);
  }, 100000); // increase timeout to 10 seconds);
});

interface Source<T> {
  readLine(): Promise<T | null>;
}

import fs from 'fs';
import readline from 'readline';

class CsvReader implements Source<string> {
  private readonly readStream: fs.ReadStream;
  private readonly rl: readline.Interface;

  constructor(filePath: string) {
    this.readStream = fs.createReadStream(filePath);
    this.rl = readline.createInterface({ input: this.readStream });
  }
  async readLine(): Promise<string | null> {
    const line = await new Promise<string | null>((resolve) => {
      this.rl.once('line', (line) => {
        resolve(line);
      });
    });
    return line;
  }
}

export default CsvReader;

// export class CsvReader implements Source<string> {
//   readLine(): Promise<string | null> {
//     throw new Error('Method not implemented.');
//   }
// }
