import { MatchesFieldFirst, MatchesInYear } from '../interfaces/services';

export const getMatchFilters = (filterYear: number) => {
  return new MatchesInYear(new MatchesFieldFirst(), filterYear);
};
