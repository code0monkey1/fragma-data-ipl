// Assuming you have a MatchRepository interface

import {
  Match,
  RESULT,
  TOSS,
} from './src/interfaces/use-cases/teams/top-n-teams-in-year-use-case';
import { MatchRepository } from './src/services/MatchService';

const fs = require('fs');
const csv = require('csv-parser');

class CsvMatchRepository implements MatchRepository {
  private readonly csvFilePath: string;

  constructor(csvFilePath: string) {
    this.csvFilePath = csvFilePath;
  }

  async getMatchesByYear(year: number): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      const matches: Match[] = [];

      fs.createReadStream(this.csvFilePath)
        .pipe(csv())
        .on('data', (row: any) => {
          // Assuming the CSV has columns: team1, team2, winner, year
          const matchYear = parseInt(row.year);

          if (!isNaN(matchYear) && matchYear === year) {
            matches.push({
              MATCH_ID: 0,
              SEASON: 0,
              CITY: '',
              DATE: new Date(),
              TEAM1: '',
              TEAM2: '',
              TOSS_WINNER: '',
              TOSS_DECISION: TOSS.FIELD,
              RESULT: RESULT.LOSE,
              WINNER: '',
            });
          }
        })
        .on('end', () => {
          resolve(matches);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }
}

export default CsvMatchRepository;
