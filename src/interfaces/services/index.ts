import { Match } from '../../../top-n.test';

export interface TopN {
  getTop(teamCount: Map<string, number>, n: number): string[];
}
export interface MatchFilter {
  filter(matches: Match[]): Match[];
}

export interface MatchCsvParser {
  parse(): Match[];
}

export class MatchCsvParserImpl implements MatchCsvParser {
  constructor(
    private readonly csvFile: string,
    private readonly separator: string,
    private readonly headers?: [] | undefined
  ) {}
  parse(): Match[] {
    throw new Error('Method not implemented.');
  }
}
