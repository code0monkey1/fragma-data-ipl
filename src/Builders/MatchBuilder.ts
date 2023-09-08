import { Match, RESULT, TOSS } from '../../top-n.test';

export class MatchBuilder {
  private match: Match = {
    MATCH_ID: 0,
    SEASON: 0,
    CITY: '',
    DATE: new Date(),
    TEAM1: '',
    TEAM2: '',
    TOSS_WINNER: '',
    TOSS_DECISION: TOSS.BAT,
    RESULT: RESULT.LOSE,
    WINNER: '',
  };

  public withMatchId(matchId: number): MatchBuilder {
    this.match.MATCH_ID = matchId;
    return this;
  }

  public withSeason(season: number): MatchBuilder {
    this.match.SEASON = season;
    return this;
  }

  public withCity(city: string): MatchBuilder {
    this.match.CITY = city;
    return this;
  }

  public withDate(date: Date): MatchBuilder {
    this.match.DATE = date;
    return this;
  }

  public withTeam1(team1: string): MatchBuilder {
    this.match.TEAM1 = team1;
    return this;
  }

  public withTeam2(team2: string): MatchBuilder {
    this.match.TEAM2 = team2;
    return this;
  }

  public withTossWinner(tossWinner: string): MatchBuilder {
    this.match.TOSS_WINNER = tossWinner;
    return this;
  }

  public withTossDecision(tossDecision: TOSS): MatchBuilder {
    this.match.TOSS_DECISION = tossDecision;
    return this;
  }

  public withResult(result: RESULT): MatchBuilder {
    this.match.RESULT = result;
    return this;
  }

  public withWinner(winner: string): MatchBuilder {
    this.match.WINNER = winner;
    return this;
  }

  public build(): Match {
    return this.match;
  }
}
