export interface TopNTeamsInYearUseCase {
  execute(top: number, year: number): void;
}

// export type Match = {
//   MATCH_ID: number;
//   SEASON: number;
//   CITY: string;
//   DATE: Date;
//   TEAM1: string;
//   TEAM2: string;
//   TOSS_WINNER: string;
//   TOSS_DECISION: TOSS;
//   RESULT: RESULT;
//   WINNER: string;
// };

// export enum TOSS {
//   FIELD = 'field',
//   BAT = 'bat',
// }

// export enum RESULT {
//   WIN = 'win',
//   LOSE = 'lose',
//   NO_RESULT = 'no result',
// }
