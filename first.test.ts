import { CsvParser } from './csv';

describe('csv-parser', () => {
  it('wil give result', async () => {
    const sut = new CsvParser();

    const result = await sut.parse('/data/matches.csv');
  });
});
