import {
  Match,
  MatchFilter,
  MatchesFieldFirst,
  MatchesInYear,
  WinningTeams,
} from './src/interfaces/services';

export const getWinningTeams = () => {
  return new WinningTeams();
};

export const getMatchesFieldFirst = () => {
  return new MatchesFieldFirst();
};

export const getMatchesInYear = (matchFilter: MatchFilter, year: number) => {
  return new MatchesInYear(matchFilter, year);
};

export function getMockMatchFilter(): MatchFilter {
  return {
    filter: function (matches: Match[]): Match[] {
      return matches;
    },
  };
}
