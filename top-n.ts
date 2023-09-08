import {
  Match,
  TopNTeamsInYearUseCase,
} from './src/interfaces/use-cases/teams/top-n-teams-in-year-use-case';

// Teams in year

// Team Filters

// Top N Teams

// export class TopNTeamsInYear implements TopNTeamsInYearUseCase {
//   constructor(
//     private readonly matches: Match[],
//     private readonly filters: Filter[]
//   ) {}
//   execute(top: number, year: number): void {
//     const filteredMatches = [];

//     for (let match of this.matches) {
//       const allFilters = new And(this.filters);

//       if (allFilters.isValid()) {
//         filteredMatches.push(match);
//       }
//     }
//   }
// }

// class TopResult {
//   constructor(
//     private readonly year: number,
//     private readonly team: string,
//     private readonly count: number
//   ) {}

//   toString() {
//     return `${this.year},${this.team},${this.count}`;
//   }
// }
