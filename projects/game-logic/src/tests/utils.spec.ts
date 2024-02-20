import { generateRandomNumbersFromZeroTo } from "../../../utils/src/randomizer";


describe('utils', () => {

  it('should return array of unique numbers between 0 and x', () => {
    const a = 10;
    const result = generateRandomNumbersFromZeroTo(a);

    const set = new Set();
    result.forEach(n => set.add(n));
    expect(set.size).toEqual(result.length);

    const sorted = result.sort();

    expect(sorted[0]).toEqual(0);
    expect(sorted[sorted.length - 1] + 1).toEqual(a);
  });        
});