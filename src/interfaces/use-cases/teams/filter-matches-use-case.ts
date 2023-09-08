import { Filter } from '../../../services/Filter';
import { Match } from './top-n-teams-in-year-use-case';

interface FilterMatchesUseCase {
  execute(filter: Filter[]): Match[];
}

export class FilterMatches implements FilterMatchesUseCase {
  execute(filter: Filter[]): Match[] {
    throw new Error('Method not implemented.');
  }
}
