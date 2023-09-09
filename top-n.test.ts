import {
  getMatchesFieldFirst,
  getMatchesInYear,
  getMockMatchFilter,
  getWinningTeams,
} from './match.helper';
import { MatchBuilder } from './src/Builders/MatchBuilder';
import { MatchFilter, TopN } from './src/interfaces/services/indext';
import { FieldFirst } from './src/services/Filter';
// import { TopNTeamsInYear } from './top-n';

export enum TOSS {
  FIELD = 'field',
  BAT = 'bat',
}

export enum RESULT {
  WIN = 'win',
  LOSE = 'lose',
  NO_RESULT = 'no result',
}

export type Match = {
  MATCH_ID: number;
  SEASON: number;
  CITY: string;
  DATE: Date;
  TEAM1: string;
  TEAM2: string;
  TOSS_WINNER: string;
  TOSS_DECISION: TOSS;
  RESULT: RESULT;
  WINNER: string;
};

export class Team {
  constructor(
    private readonly name: string,
    private readonly matches: Match[]
  ) {}

  getWinningCount() {}

  addMatch(match: Match) {
    this.matches.push(match);
  }
  getName() {
    return this.name;
  }
}

//[+] find match id's in year 2016

//[+] filter team names that won toss

//[+] filter team names that elected to field

//[+] find top 4 teams names from among the above

interface MatchCsvParser {
  parse(csv: string, separator: string, headers?: []): Match[];
}
class MatchCsvParserImpl implements MatchCsvParser {
  parse(csvFile: string, separator: string, headers?: [] | undefined): Match[] {
    throw new Error('Method not implemented.');
  }
}
describe('Top 4 Teams', () => {
  describe('CSV Parser', () => {});

  describe('CSV Match Parser', () => {
    it('gets the specified filename , separator and headers', () => {});
  });

  describe('MatchesInYear', () => {
    it('gets matches that happened in the year 2016', () => {
      const match1 = new MatchBuilder().withSeason(2016).withMatchId(1).build();
      const match2 = new MatchBuilder().withSeason(2017).withMatchId(2).build();
      const filterYear = 2016;

      const sut = getMatchesInYear(getMockMatchFilter(), filterYear);
      //act
      //matches in year 2016
      const matchesOfFilterYear = sut.filter([match1, match2]);
      // assert
      expect(matchesOfFilterYear).toContainEqual(match1);
      expect(matchesOfFilterYear).not.toContainEqual(match2);
      expect(matchesOfFilterYear).toHaveLength(1);
    });
  });

  describe('Matches in which fielding was first', () => {
    it('gets all matches where fielding was first', () => {
      //arrange

      const match1 = new MatchBuilder()
        .withMatchId(1)
        .withTossDecision(TOSS.FIELD)
        .build();
      const match2 = new MatchBuilder()
        .withTossDecision(TOSS.BAT)
        .withMatchId(2)
        .build();

      const sut = getMatchesFieldFirst();

      //act

      //matches in year 2016
      const matchesFieldFirst = sut.filter([match1, match2]);

      // assert
      expect(matchesFieldFirst).toContainEqual(match1);
      expect(matchesFieldFirst).not.toContainEqual(match2);

      expect(matchesFieldFirst).toHaveLength(1);
    });
  });

  describe('Winning Names', () => {
    it('will give match winning names', () => {
      //arrange
      const match1 = new MatchBuilder()
        .withTossWinner('a')
        .withWinner('a')
        .build();
      const match2 = new MatchBuilder()
        .withTossWinner('c')
        .withWinner('d')
        .build();

      const sut = getWinningTeams([match1, match2]);

      //act
      const result = sut.getTeamWinCount();

      //assert
      expect(result.has('a'));

      expect(result.size).toEqual(1);
    });

    it('will give top 3 names ', () => {
      //arrange
      const team_count = new Map<string, number>();

      team_count.set('a', 1);
      team_count.set('b', 2), team_count.set('c', 3), team_count.set('d', 4);

      const sut = getTopNTossWinningTeamNames(team_count);

      //act
      const result = sut.getTop(1);
      console.log(result);
      expect(result).toStrictEqual(['d']);

      //assert
    });
  });
});

describe('get top 4 which elected to field first after winning toss in year 2016 and 2017', () => {
  it.each([
    {
      valid: [
        new MatchBuilder()
          .withSeason(2016)
          .withMatchId(1)
          .withTossWinner('c')
          .withResult(RESULT.WIN)
          .withWinner('c')
          .withTossDecision(TOSS.FIELD)
          .build(),
        new MatchBuilder()
          .withSeason(2016)
          .withMatchId(1)
          .withTossWinner('c')
          .withWinner('c')
          .withResult(RESULT.WIN)
          .withTossDecision(TOSS.FIELD)
          .build(),
        new MatchBuilder()
          .withSeason(2016)
          .withMatchId(1)
          .withTossWinner('c')
          .withWinner('c')
          .withResult(RESULT.WIN)
          .withTossDecision(TOSS.FIELD)
          .build(),
        new MatchBuilder()
          .withSeason(2016)
          .withMatchId(1)
          .withTossWinner('b')
          .withWinner('b')
          .withResult(RESULT.WIN)
          .withTossDecision(TOSS.FIELD)
          .build(),
        new MatchBuilder()
          .withSeason(2016)
          .withMatchId(1)
          .withTossWinner('b')
          .withWinner('b')
          .withResult(RESULT.WIN)
          .withTossDecision(TOSS.FIELD)
          .build(),
        new MatchBuilder()
          .withSeason(2016)
          .withMatchId(1)
          .withTossWinner('a')
          .withWinner('a')
          .withResult(RESULT.WIN)
          .withTossDecision(TOSS.FIELD)
          .build(),
      ],
      invalid: [
        new MatchBuilder()
          .withSeason(2016)
          .withMatchId(1)
          .withTossWinner('c')
          .withWinner('c')
          .withResult(RESULT.WIN)
          .withTossDecision(TOSS.BAT)
          .build(),
      ],
    },
  ])('give us the answer', ({ valid, invalid }) => {
    const matches = new MatchesInYear(new MatchesFieldFirst(), 2016).filter([
      ...valid,
      ...invalid,
    ]);

    expect(allMatchesWithTossDecisionField(matches)).toBeTruthy();

    const winningTeams = new WinningTeams(matches);

    const filteredByNames: Map<string, number> = winningTeams.getTeamWinCount();

    const top3 = getTopNTossWinningTeamNames(filteredByNames).getTop(3);

    expect(top3).toStrictEqual(['c', 'b', 'a']);
  });
});

const allMatchesWithTossDecisionField = (matches: Match[]) => {
  return matches.every((match) => match.TOSS_DECISION === TOSS.FIELD);
};

export class MatchesInYear implements MatchFilter {
  constructor(
    private readonly matchFilter: MatchFilter,
    private readonly year: number
  ) {}

  filter(matches: Match[]): Match[] {
    const filteredMatches = matches.filter(
      (match) => match.SEASON === this.year
    );

    return this.matchFilter.filter(filteredMatches);
  }
}

class TopNTossWinningTeamNames implements TopN<string> {
  constructor(private readonly team_count: Map<string, number>) {}

  getTop(n: number): string[] {
    const names = Array.from(this.team_count.entries()).sort((a, b) => {
      return b[1] - a[1];
    });

    return names.map((name) => name[0]).slice(0, n);
  }
}

const getTopNTossWinningTeamNames = (team_count: Map<string, number>) => {
  return new TopNTossWinningTeamNames(team_count);
};

export class WinningTeams {
  constructor(private readonly matches: Match[]) {}

  getTeamWinCount(): Map<string, number> {
    const team_win = new Map<string, number>();

    this.matches.forEach((match) => {
      if (match.WINNER === match.TOSS_WINNER) {
        const count = team_win.get(match.WINNER) || 0;
        team_win.set(match.WINNER, count + 1);
      }
    });

    return team_win;
  }
}
export class MatchesFieldFirst implements MatchFilter {
  filter(matches: Match[]): Match[] {
    const filtered: Match[] = [];

    matches.forEach((match) => {
      const filteredMatches = new FieldFirst(match);

      if (filteredMatches.isValid()) {
        filtered.push(match);
      }
    });

    return filtered;
  }
}

//[-] filter team names that elected to field
