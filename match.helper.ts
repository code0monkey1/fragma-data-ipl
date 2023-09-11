import {
  Filter,
  Match,
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

export const getMatchesInYear = (matchFilter: Filter<Match>, year: number) => {
  return new MatchesInYear(matchFilter, year);
};

export function getMockMatchFilter(): Filter<Match> {
  return {
    filter: function (matches: Match[]): Match[] {
      return matches;
    },
  };
}
