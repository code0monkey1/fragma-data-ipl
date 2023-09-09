import { MatchFilter } from './src/interfaces/services';
import {
  Match,
  MatchesFieldFirst,
  MatchesInYear,
  WinningTeams,
} from './top-n.test';

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
