import { Match } from '../../../top-n.test';

export interface TopN<T> {
  getTop(n: number): T[];
}
export interface MatchFilter {
  filter(matches: Match[]): Match[];
}
