import { Match } from '../interfaces/use-cases/teams/top-n-teams-in-year-use-case';
import { Filter } from './Filter';

export class FilterByYear implements Filter {
  constructor(private readonly match: Match, private readonly year: number) {}
  isValid(): boolean {
    return this.match.SEASON === this.year;
  }
}
