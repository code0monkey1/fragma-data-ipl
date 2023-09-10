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
  execute(top: number, year: number): Promise<string[]>;
}
export default class TopNTeams implements TopNTeamsToFieldFirstUseCase {
  constructor(
    private readonly matchCsvParser: Parser<Match>,
    private readonly matchFilter: MatchFilter,
    private readonly teamWinCount: WinCount,
    private readonly topNTeamNames: TopN
  ) {}

  async execute(top: number): Promise<string[]> {
    const matches = await this.matchCsvParser.parse();

    const convertedMatches: Match[] = matches.map((m: Match) => {
      return {
        ...m,
        TOSS_DECISION: m.TOSS_DECISION === 'field' ? TOSS.FIELD : TOSS.BAT,
        SEASON: Number(m.SEASON),
      };
    });

    const filteredMatches = this.matchFilter.filter(convertedMatches);

    console.log('filtered matches', filteredMatches);

    const topTeams = this.teamWinCount.getTeamWinCount(filteredMatches);

    console.log(topTeams);

    const topTeamNames = this.topNTeamNames.getTop(topTeams, top);

    console.log(topTeamNames);

    return topTeamNames;
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
