import { MatchBuilder } from './src/Builders/MatchBuilder';

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

describe('Top 4 Teams', () => {
  describe('get team id`s of teams that played in the specified year', () => {
    it.each([
      {
        valid: {
          MATCH_ID: 1,
          SEASON: 2016,
          TEAM1: 'a',
          TEAM2: 'b',
          TOSS_WINNER: 'a',
          TOSS_DECISION: TOSS.FIELD,
          RESULT: RESULT.WIN,
          WINNER: 'a',
        },
        invalid: {
          MATCH_ID: 2,
          SEASON: 2017,
          TEAM1: 'c',
          TEAM2: 'd',
          TOSS_WINNER: 'c',
          TOSS_DECISION: TOSS.BAT,
          RESULT: RESULT.WIN,
          WINNER: 'c',
        },
      },
      {
        valid: {
          MATCH_ID: 3,
          SEASON: 2017,
          TEAM1: 'a',
          TEAM2: 'b',
          TOSS_WINNER: 'a',
          TOSS_DECISION: TOSS.FIELD,
          RESULT: RESULT.WIN,
          WINNER: 'a',
        },
        invalid: {
          MATCH_ID: 4,
          SEASON: 2018,
          TEAM1: 'c',
          TEAM2: 'd',
          TOSS_WINNER: 'c',
          TOSS_DECISION: TOSS.BAT,
          RESULT: RESULT.WIN,
          WINNER: 'c',
        },
      },
    ])(
      'returns the matches that happened in the year $valid.SEASON',
      ({ valid, invalid }) => {
        //winner
        const match_1: Match = new MatchBuilder()
          .withMatchId(valid.MATCH_ID)
          .withSeason(valid.SEASON)
          .withResult(valid.RESULT)
          .withTeam1(valid.TEAM1)
          .withTeam2(valid.TEAM2)
          .withTossDecision(valid.TOSS_DECISION)
          .withTossWinner(valid.TOSS_WINNER)
          .withWinner(valid.WINNER)
          .build();

        const match_2: Match = {
          ...invalid,
          CITY: '',
          DATE: new Date(),
        };
        //matches in year 2016
        const matches: number[] = getMatchIdsInYear(
          [match_1, match_2],
          valid.SEASON
        );

        expect(matches).toContain(valid.MATCH_ID);

        // names of teams who won the toss
        // const tossWinners: string[] = getTossWinners(matches);

        // expect(tossWinners).toHaveLength(2);

        // expect(tossWinners).toContain('a');
        // expect(tossWinners).toContain('c');
      }
    );
  });

  describe('Names of teams that won the toss', () => {});
});

// function topNTeamsInYear(top: number, year: number): Team[] {
//   const match_1: Match = getMatchOfYear(2016);

//   const match_2: Match = getMatchOfYear(2017);

//   //[+] find teams in year 2016

//   //[+] won toss

//   //[+] elected to field
// }
function getTossWinningTeamNames(matches: Match[]): string[] {
  const tossWinners = matches.reduce((prev: Set<string>, current: Match) => {
    prev.add(current.TOSS_WINNER);
    return prev;
  }, new Set<string>());

  return Array.from(tossWinners);
}

function getMatchIdsInYear(matches: Match[], year: number): number[] {
  const filteredMatches = matches
    .filter((match) => match.SEASON === year)
    .map((match) => match.MATCH_ID);

  return filteredMatches;
}
