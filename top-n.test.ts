import {
  getMatchesFieldFirst,
  getMatchesInYear,
  getMockMatchFilter,
  getWinningTeams,
} from './match.helper';
import { MatchBuilder } from './src/Builders/MatchBuilder';
import {
  Match,
  MatchesFieldFirst,
  MatchesInYear,
  RESULT,
  TOSS,
  TopNTossWinningTeamNames,
  WinningTeams,
} from './src/interfaces/services';

// import { TopNTeamsInYear } from './top-n';

//[+] find match id's in year 2016

//[+] filter team names that won toss

//[+] filter team names that elected to field

//[+] find top 4 teams names from among the above

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

      const sut = getWinningTeams();

      //act
      const result = sut.getTeamWinCount([match1, match2]);

      //assert
      expect(result.has('a'));

      expect(result.size).toEqual(1);
    });

    it('will give top 3 names ', () => {
      //arrange
      const team_count = new Map<string, number>();

      team_count.set('a', 1);
      team_count.set('b', 2), team_count.set('c', 3), team_count.set('d', 4);

      const sut = getTopNTossWinningTeamNames();

      //act
      const result = sut.getTop(team_count, 1);
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

    //arrange
    const winningTeams = new WinningTeams();
    const expected = new Map<string, number>();

    expected.set('c', 3);
    expected.set('b', 2);
    expected.set('a', 1);

    //act
    const filteredByNames: Map<string, number> =
      winningTeams.getTeamWinCount(matches);

    const top3 = getTopNTossWinningTeamNames().getTop(filteredByNames, 3);

    //assert
    expect(top3).toStrictEqual(expected);
  });
});

const allMatchesWithTossDecisionField = (matches: Match[]) => {
  return matches.every((match) => match.TOSS_DECISION === TOSS.FIELD);
};

const getTopNTossWinningTeamNames = () => {
  return new TopNTossWinningTeamNames();
};

//[-] filter team names that elected to field
