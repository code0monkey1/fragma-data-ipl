import { parse } from 'csv-parse';
import fs from 'fs';
import { CsvParser, Parser } from './csv';
import {
  Filter,
  ItemScore,
  Match,
  MatchCsvParser,
  TopN,
} from './src/interfaces/services';
import TopNTeams from './src/interfaces/use-cases/teams/top-n-teams-use-case';
import { getMatchFilters } from './src/services/Filter';

describe('First Test', () => {
  it('one should be one', () => {
    const mockMatchCsvParser: Parser<Match> = {
      parse: function (): Promise<Match[]> {
        throw new Error('Function not implemented.');
      },
    };
    const mockMatchFilter1: Filter<Match> = {
      filter: function (matches: Match[]): Match[] {
        throw new Error('Function not implemented.');
      },
    };
    const mockMatchFilter2: Filter<Match> = {
      filter: function (matches: Match[]): Match[] {
        throw new Error('Function not implemented.');
      },
    };
    const mockTeamWinCount: ItemScore<string, number, Match> = {
      getTeamWinCount: function (matches: Match[]): Map<string, number> {
        throw new Error('Function not implemented.');
      },
    };
    const mockTopNTeams: TopN<string, number> = {
      getTop: function (
        teamCount: Map<string, number>,
        n: number
      ): Map<string, number> {
        throw new Error('Function not implemented.');
      },
    };
    const sut = new TopNTeams(
      mockMatchCsvParser,
      getMatchFilters(2016),
      mockTeamWinCount,
      mockTopNTeams
    );
    const result = sut.execute(3);
    console.log(result);
  });
});

describe('csv-parser', () => {
  it('wil give result', async () => {
    const sut = new CsvParser('/data/matches.csv');

    const result = await sut.parse();
  });
});
