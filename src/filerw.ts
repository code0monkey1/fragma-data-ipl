import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import { Match } from '../top-n.test';

// export class CsvParser {
//   private csvFilePath: string;
//   private headers: string[];
//   constructor(filePath: string, headers: string[]) {
//     this.csvFilePath = path.resolve(__dirname, filePath);
//     this.headers = headers;
//   }

//   async readLine(): Promise<Match[]> {
//     const result: Match[] = [];

//     const fileContent = fs.readFileSync(this.csvFilePath, {
//       encoding: 'utf-8',
//     });

//     parse(
//       fileContent,
//       {
//         delimiter: ',',
//         columns: this.headers,
//       },
//       (error, records) => {
//         if (error) {
//           console.error(error);
//         }

//         records.forEach((record: Match) => {
//           const match: Match = {
//             MATCH_ID: record.MATCH_ID,
//             SEASON: record.SEASON,
//             CITY: record.CITY,
//             DATE: record.DATE,
//             TEAM1: record.TEAM1,
//             TEAM2: record.TEAM2,
//             TOSS_WINNER: record.TOSS_WINNER,
//             TOSS_DECISION: record.TOSS_DECISION,
//             RESULT: record.RESULT,
//             WINNER: record.WINNER,
//           };
//         });
//       }
//     );

//     return result;
//   }
// }

interface CSVRecord {
  [key: string]: string;
}

export class CSVParser {
  private readonly filePath: string;
  private readonly headers: string[];
  private readonly parser;
  private readonly lineStream: fs.ReadStream;

  constructor(filePath: string, headers: string[]) {
    this.filePath = filePath;
    this.headers = headers;
    this.parser = parse({
      delimiter: ',',
      columns: headers,
    });
    this.lineStream = fs.createReadStream(filePath);
  }

  async readLine(): Promise<CSVRecord | null> {
    const linePromise = new Promise<string>((resolve, reject) => {
      this.lineStream.on('data', (chunk) => {
        const lines = chunk.toString().split('\n');
        resolve(lines[0]);
      });
      this.lineStream.on('error', (err) => {
        reject(err);
      });
    });

    const recordPromise = new Promise<CSVRecord>((resolve, reject) => {
      this.parser.on('readable', () => {
        const record = this.parser.read();
        if (record) {
          resolve(record);
        }
      });
      this.parser.on('error', (err) => {
        reject(err);
      });
    });

    try {
      const line = await linePromise;
      const record = await recordPromise;
      return record;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
