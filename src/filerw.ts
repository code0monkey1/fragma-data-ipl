import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

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
