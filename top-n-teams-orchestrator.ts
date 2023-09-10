import { Match, MatchCsvParser } from './src/interfaces/services';

export default class TopNTeamsOrchestrator {
  constructor(private readonly matchCsvParser: MatchCsvParser) {}

  execute(top: number, year: number): void {
    const matches = this.matchCsvParser.parse();

    const filteredMatches: Match[] = [];

    matches.forEach((match) => {
      filteredMatches.push(match);
    });

    console.log('filtered matches', filteredMatches);
  }
}
