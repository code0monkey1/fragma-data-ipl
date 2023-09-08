// Assuming you have a Match entity

import { Match } from '../interfaces/use-cases/teams/top-n-teams-in-year-use-case';

export interface TeamService {
  calculateRankings(matches: Match[]): string[];
}
export class TeamServiceImpl implements TeamService {
  calculateRankings(matches: Match[]): string[] {
    // Calculate team rankings based on match results
    const teamWins = new Map<string, number>();

    for (const match of matches) {
      // Update team wins count
      if (match.WINNER) {
        teamWins.set(match.WINNER, (teamWins.get(match.WINNER) || 0) + 1);
      }
    }

    // Sort teams by wins in descending order
    const sortedTeams = Array.from(teamWins.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    // Extract the top 4 teams
    const topTeams = sortedTeams.map((entry) => entry[0]);

    return topTeams;
  }
}

export default TeamService;
