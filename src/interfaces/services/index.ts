export interface TopN {
  getTop(teamCount: Map<string, number>, n: number): Map<string, number>;
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
export type Match = {
  MATCH_ID: number;
  SEASON: number;
  CITY: string;
  DATE: Date;
  TEAM1: string;
  TEAM2: string;
  TOSS_WINNER: string;
  TOSS_DECISION: TOSS;
  RESULT: RESULT;
  WINNER: string;
};

export class WinningTeams implements WinCount {
  getTeamWinCount(matches: Match[]): Map<string, number> {
    const team_win = new Map<string, number>();

    matches.forEach((match) => {
      if (match.WINNER === match.TOSS_WINNER) {
        const count = team_win.get(match.WINNER) || 0;
        team_win.set(match.WINNER, count + 1);
      }
    });

    return team_win;
  }
}

export enum TOSS {
  FIELD = 'field',
  BAT = 'bat',
}

export enum RESULT {
  WIN = 'win',
  LOSE = 'lose',
  NO_RESULT = 'no result',
}
export interface WinCount {
  getTeamWinCount(matches: Match[]): Map<string, number>;
}
export class MatchesFieldFirst implements MatchFilter {
  filter(matches: Match[]): Match[] {
    const filtered: Match[] = [];

    matches.forEach((match) => {
      if (match.TOSS_DECISION === TOSS.FIELD) {
        filtered.push(match);
      }
    });

    return filtered;
  }
}
export class MatchesInYear implements MatchFilter {
  constructor(
    private readonly matchFilter: MatchFilter,
    private readonly year: number
  ) {}

  filter(matches: Match[]): Match[] {
    const filteredMatches = matches.filter(
      (match) => match.SEASON === this.year
    );

    return this.matchFilter.filter(filteredMatches);
  }
}

export class TopNTossWinningTeamNames implements TopN {
  getTop(team_count: Map<string, number>, n: number): Map<string, number> {
    const names = Array.from(team_count.entries()).sort((a, b) => {
      return b[1] - a[1];
    });

    const map = names.reduce((acc, obj) => {
      acc.set(obj[0], obj[1]);
      return acc;
    }, new Map());

    return map;
  }
}
export class Team {
  constructor(
    private readonly name: string,
    private readonly matches: Match[]
  ) {}

  getWinningCount() {}

  addMatch(match: Match) {
    this.matches.push(match);
  }
  getName() {
    return this.name;
  }
}
