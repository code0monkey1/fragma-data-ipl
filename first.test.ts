import { MatchCsvParser, MatchFilter, TopN } from './src/interfaces/services';
import TopNTeams from './src/interfaces/use-cases/teams/top-n-teams-use-case';
import { Match, WinCount } from './top-n.test';

describe('First Test', () => {
  it('one should be one', () => {
    const mockMatchCsvParser: MatchCsvParser = {
      parse: function (): Match[] {
        throw new Error('Function not implemented.');
      },
    };

    const mockMatchFilter1: MatchFilter = {
      filter: function (matches: Match[]): Match[] {
        throw new Error('Function not implemented.');
      },
    };
    const mockMatchFilter2: MatchFilter = {
      filter: function (matches: Match[]): Match[] {
        throw new Error('Function not implemented.');
      },
    };

    const mockTeamWinCount: WinCount = {
      getCount: function (matches: Match[]): Map<string, number> {
        throw new Error('Function not implemented.');
      },
    };

    const mockTopNTeams: TopN = {
      getTop: function (teamCount: Map<string, number>, n: number): string[] {
        throw new Error('Function not implemented.');
      },
    };

    const sut = new TopNTeams(
      mockMatchCsvParser,
      mockMatchFilter1,
      mockTeamWinCount,
      mockTopNTeams
    );

    const result = sut.execute(3);

    console.log(result);
  });
});
