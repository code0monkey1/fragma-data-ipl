import { Parser } from '../../../../csv';
import { Match, WinCount } from '../../../../top-n.test';
import { MatchCsvParser, MatchFilter, TopN } from '../../services';

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

    const filteredMatches = this.matchFilter.filter(matches);

    const topTeams = this.teamWinCount.getCount(filteredMatches);

    const topTeamNames = this.topNTeamNames.getTop(topTeams, top);

    return topTeamNames;
  }
}
