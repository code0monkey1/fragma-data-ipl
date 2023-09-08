import { Match, RESULT, TOSS } from './top-n.test';

export const getMatch = (
  year: number,
  team1: string,
  team2: string,
  tossWinner: string,
  tossDecision: TOSS,
  result: RESULT,
  winner: string
): Match => {
  const match: Match = {
    MATCH_ID: year,
    SEASON: year,
    CITY: 'delhi',
    DATE: new Date(),
    TEAM1: team1,
    TEAM2: team2,
    TOSS_WINNER: tossWinner,
    TOSS_DECISION: tossDecision,
    RESULT: result,
    WINNER: winner,
  };

  return match;
};

export const getMatchesFromCsv = (csv: string): Match[] => {
  const matchArrays: String[][] = csvToStringArrays(csv, '\n');

  let matches: Match[] = [];

  for (const array of matchArrays) {
    const match: Match = {
      MATCH_ID: Number(array[0]),
      SEASON: Number(array[1]),
      CITY: String(array[2]),
      DATE: new Date(String(array[3])),
      TEAM1: String(array[4]),
      TEAM2: String(array[5]),
      TOSS_WINNER: String(array[6]),
      TOSS_DECISION: String(array[7]) as TOSS,
      RESULT: String(array[8]) as RESULT,
      WINNER: String(array[9]),
    };
    matches.push(match);
  }

  return matches;
};

export const csvToStringArrays = (
  str: String,
  separator: String
): String[][] => {
  const strArray: String[][] = [];

  str.split(`${separator}`).forEach((csv) => {
    console.log('csv', csv);
    strArray.push(csvToStringArray(csv));
  });

  return strArray;
};

export const csvToStringArray = (str: String): String[] => {
  return str.split(',');
};
