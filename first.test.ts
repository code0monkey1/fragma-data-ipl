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
  it('things are going to get weird', () => {});
});

interface Source<T> {
  read(): T;
}

interface Destination<T> {
  write(line: T): void;
}

class CsvProcessor<T> {
  constructor(
    private readonly readLine: Source<T>,
    private readonly writeLine: Destination<T>
  ) {}

  parse() {}
}

const fs = require('fs');
const csv = require('csv-parser');

export class CsvMatchRepository<String> implements Source<String> {
  private readonly csvFilePath: string;

  constructor(csvFilePath: string) {
    this.csvFilePath = csvFilePath;
  }

  async getMatches(year: number): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      const matches: Match[] = [];

      fs.createReadStream(this.csvFilePath)
        .pipe(csv())
        .on('data', (row: any) => {
          // Assuming the CSV has columns: team1, team2, winner, year
          console.log(row);
        })
        .on('end', () => {
          resolve(matches);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }

  read(): String {
    throw new Error('Method not implemented.');
  }
}
