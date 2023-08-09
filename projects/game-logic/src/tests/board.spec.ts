import { CoordsHelper } from "../lib/features/board/coords.helper";

describe('board', () => {

  beforeEach(() => {});

  it('true', () => {
    expect(true).toBe(true);
      
    const numberOfFields = 19;
    const boardDiameterByHex = 5;
    const board = CoordsHelper.createHexagonalBoardCoords(boardDiameterByHex);

    const set = new Set();
    const constraintViolated = board.filter(f => (f.q + f.r + f.s) !== 0)
    expect(constraintViolated.length).toEqual(0);

    board.forEach(f => set.add(`${f.q}${f.r}${f.s}`));
    expect(set.size).toEqual(board.length);
    expect(board.length).toEqual(numberOfFields);
  });

});