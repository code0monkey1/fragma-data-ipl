import { CsvParser, Parser } from '../../../../csv';

import { getMatchFilters } from '../../../services/Filter';

import {
  Filter,
  ItemScore,
  Match,
  TopN,
  TopNTossWinningTeamNames,
  WinningTeams,
} from '../../services';

interface TopNTeamsToFieldFirstUseCase {
  execute(top: number, fileName: string): Promise<Map<string, number>>;
}
export default class TopNTeams implements TopNTeamsToFieldFirstUseCase {
  constructor(
    private readonly matchCsvParser: Parser<Match>,
    private readonly matchFilter: Filter<Match>,
    private readonly teamWinCount: ItemScore<string, number, Match>,
    private readonly topNTeamNames: TopN<string, number>
  ) {}

  async execute(top: number, fileName: string): Promise<Map<string, number>> {
    const matches = await this.matchCsvParser.parse(fileName);

    console.log('matches', matches);
    const filteredMatches = this.matchFilter.filter(matches);

    const winCount = this.teamWinCount.getTeamWinCount(filteredMatches);

    const result = this.topNTeamNames.getTop(winCount, top);

    return result;
  }
}

(async () => {
  const topN = new TopNTeams(
    new CsvParser(),
    getMatchFilters(2016),
    new WinningTeams(),
    new TopNTossWinningTeamNames()
  );

  const result = await topN.execute(10, '/data/deliveries.csv');
  console.log(result);
})();
