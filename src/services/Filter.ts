import {
  Match,
  MatchesFieldFirst,
  MatchesInYear,
  TOSS,
} from '../../top-n.test';

export const getMatchFilters = (filterYear: number) => {
  return new MatchesInYear(new MatchesFieldFirst(), filterYear);
};
