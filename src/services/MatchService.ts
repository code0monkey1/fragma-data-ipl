// Assuming you have a Match entity

import { Match } from '../interfaces/use-cases/teams/top-n-teams-in-year-use-case';

export interface MatchRepository {
  getMatchesByYear(year: number): Promise<Match[]>;
}

interface MatchService {
  getMatchesByYear(year: Number): Promise<Match[]>;
}
export class MatchServiceImpl implements MatchService {
  constructor(private matchRepository: MatchRepository) {}

  async getMatchesByYear(year: number): Promise<Match[]> {
    // You should implement this method based on your data source (e.g., a database query)
    // This is just a placeholder example:
    try {
      const matches = await this.matchRepository.getMatchesByYear(year);
      return matches;
    } catch (error) {
      throw new Error('Failed to fetch matches by year');
    }
  }
}

export default MatchService;
