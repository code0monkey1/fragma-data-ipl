import { parse } from 'csv-parse';
import fs from 'fs';
import { CsvParser, csvParser } from './csv';
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

describe.only('csv-parser', () => {
  it('wil give result', async () => {
    const sut = new CsvParser('./data/matches.csv');

    const result = await sut.parse();

    console.log('The result is', result);

    console.log('The length for sure is ', result.length);
  });
});
