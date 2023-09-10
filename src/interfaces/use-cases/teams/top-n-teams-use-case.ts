import { CsvParser, Parser } from '../../../../csv';

import { getMatchFilters } from '../../../services/Filter';

import {
  Match,
  MatchFilter,
  TOSS,
  TopN,
  TopNTossWinningTeamNames,
  WinCount,
  WinningTeams,
} from '../../services';

interface TopNTeamsToFieldFirstUseCase {
  execute(top: number, year: number): Promise<Map<string, number>>;
}
export default class TopNTeams implements TopNTeamsToFieldFirstUseCase {
  constructor(
    private readonly matchCsvParser: Parser<Match>,
    private readonly matchFilter: MatchFilter,
    private readonly teamWinCount: WinCount,
    private readonly topNTeamNames: TopN
  ) {}

  async execute(top: number): Promise<Map<string, number>> {
    const matches = await this.matchCsvParser.parse();

    const filteredMatches = this.matchFilter.filter(matches);

    const winCount = this.teamWinCount.getTeamWinCount(filteredMatches);

    const result = this.topNTeamNames.getTop(winCount, top);

    return result;
  }
}

(async () => {
  const topN = new TopNTeams(
    new CsvParser('../../../../data/matches.csv'),
    getMatchFilters(2016),
    new WinningTeams(),
    new TopNTossWinningTeamNames()
  );

  const result = await topN.execute(10);
  console.log(result);
})();
