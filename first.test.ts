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
  it('things are going to get weird', async () => {
    const sut = new CsvReader('./data/deliveries.csv');

    try {
      let result = await sut.getNextLine();
      console.log(result);
      result = await sut.getNextLine();
      console.log(result);
      result = await sut.getNextLine();
      console.log(result);
      result = await sut.getNextLine();
      console.log(result);
    } catch (err) {}
  });
});

import fs from 'fs';
import readline from 'readline';

class CsvReader {
  private readonly readStream: fs.ReadStream;
  private readonly rl: readline.Interface;

  constructor(filePath: string) {
    this.readStream = fs.createReadStream(filePath);
    this.rl = readline.createInterface({ input: this.readStream });
  }

  async getNextLine(): Promise<string | null> {
    return new Promise((resolve) => {
      this.rl.once('line', (line) => {
        resolve(line);
      });
    });
  }

  async readCsvFile(): Promise<void> {
    const rl = this.rl;

    rl.on('close', () => {
      console.log('CSV file read complete.');
    });

    rl.on('error', (error) => {
      console.error(error);
    });

    while (true) {
      const line = await this.getNextLine();
      if (line === null) {
        break;
      }
      console.log(line);
    }
  }
}

export default CsvReader;
