export interface TopN {
  getTop(teamCount: Map<string, number>, n: number): Map<string, number>;
}

export interface Filter<T> {
  filter(matches: T[]): T[];
}

export interface MatchCsvParser {
  parse(): Match[];
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

export class WinningTeams implements ItemScore<string, number, Match> {
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
export interface ItemScore<Item, Score, Input> {
  getTeamWinCount(matches: Input[]): Map<Item, Score>;
}
export class MatchesFieldFirst implements Filter<Match> {
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
export class MatchesInYear implements Filter<Match> {
  constructor(
    private readonly matchFilter: Filter<Match>,
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
