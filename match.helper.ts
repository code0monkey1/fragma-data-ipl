import { MatchFilter } from './src/interfaces/services/indext';
import {
  Match,
  MatchesFieldFirst,
  MatchesInYear,
  WinningTeams,
} from './top-n.test';

export const getWinningTeams = (matches: Match[]) => {
  return new WinningTeams(matches);
};

export const getMatchesFieldFirst = () => {
  return new MatchesFieldFirst();
};

export const getMatchesInYear = (matchFilter: MatchFilter, year: number) => {
  return new MatchesInYear(matchFilter, year);
};

export const csvToStringArray = (str: String): String[] => {
  return str.split(',');
};
export function getMockMatchFilter(): MatchFilter {
  return {
    filter: function (matches: Match[]): Match[] {
      return matches;
    },
  };
}
