import { Filter } from '../../../services/Filter';
import { Match } from './top-n-teams-in-year-use-case';

export default class FilterMatchByYear implements Filter {
  constructor(private readonly match: Match, private readonly year: number) {}
  isValid(): boolean {
    return this.match.SEASON === this.year;
  }
}
