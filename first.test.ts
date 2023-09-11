import { CsvParser } from './csv';

describe('csv-parser', () => {
  it('wil give result', async () => {
    const sut = new CsvParser('/data/matches.csv');

    const result = await sut.parse();
  });
});
