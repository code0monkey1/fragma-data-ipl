import { Match } from './src/interfaces/use-cases/teams/top-n-teams-in-year-use-case';
import { And } from './src/services/Filter';
import { FilterByYear } from './src/services/FilterByYear';

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
