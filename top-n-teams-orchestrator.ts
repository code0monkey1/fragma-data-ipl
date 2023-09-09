import { And } from './src/services/Filter';
import { FilterByYear } from './src/services/FilterByYear';
import { Match } from './top-n.test';

export default class TopNTeamsOrchestrator {
  constructor(private readonly matches: Match[]) {}

  execute(top: number, year: number): void {
    const filteredMatches: Match[] = [];

    this.matches.forEach((match) => {
      const allConditionsHold = new And([new FilterByYear(match, year)]);

      if (allConditionsHold.isValid()) {
        console.log(match);
        filteredMatches.push(match);
      }
    });

    console.log('filtered matches', filteredMatches);
  }
}
