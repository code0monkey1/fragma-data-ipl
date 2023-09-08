import MatchService from './src/services/MatchService';
import TeamService from './src/services/TeamService';

class TeamOrchestrator {
  constructor(
    private matchService: MatchService,
    private teamService: TeamService
  ) {}

  async getTop4TeamsByYear(year: number): Promise<string[]> {
    // Fetch matches for the given year
    const matches = await this.matchService.getMatchesByYear(year);

    // Calculate team rankings based on match results
    const teamRankings = this.teamService.calculateRankings(matches);

    // Get the top 4 teams
    const top4Teams = teamRankings.slice(0, 4);

    return top4Teams;
  }
}

export default TeamOrchestrator;
