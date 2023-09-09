import { WinCount } from '../../../../top-n.test';
import { MatchCsvParser, MatchFilter, TopN } from '../../services';

interface TopNTeamsToFieldFirstUseCase {
  execute(top: number, year: number): string[];
}
export default class TopNTeams implements TopNTeamsToFieldFirstUseCase {
  constructor(
    private readonly matchCsvParser: MatchCsvParser,
    private readonly matchFilter: MatchFilter,
    private readonly teamWinCount: WinCount,
    private readonly topNTeamNames: TopN
  ) {}

  execute(top: number): string[] {
    const matches = this.matchCsvParser.parse();

    const filteredMatches = this.matchFilter.filter(matches);

    const topTeams = this.teamWinCount.getCount(filteredMatches);

    const topTeamNames = this.topNTeamNames.getTop(topTeams, top);

    return topTeamNames;
  }
}
