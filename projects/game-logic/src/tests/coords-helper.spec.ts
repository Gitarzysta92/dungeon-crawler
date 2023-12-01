import { HexSide } from "../lib/features/board/board.constants";
import { CoordsHelper } from "../lib/features/board/coords.helper";


describe('coords-helper', () => {

  it('should create hexagonal board with all unique fields for diameter: 5', () => {
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


  it('should create hexagonal board with all unique fields for diameter: 7', () => {
    const numberOfFields = 37;
    const boardDiameterByHex = 7;
    const board = CoordsHelper.createHexagonalBoardCoords(boardDiameterByHex);

    const set = new Set();
    const constraintViolated = board.filter(f => (f.q + f.r + f.s) !== 0)
    expect(constraintViolated.length).toEqual(0);

    board.forEach(f => set.add(`${f.q}${f.r}${f.s}`));
    expect(set.size).toEqual(board.length);
    expect(board.length).toEqual(numberOfFields);
  });


  it('should create two dimensional array with coords splitted into rows', () => {
    const boardDiameterByHex = 5;
    const board = CoordsHelper.createHexagonalBoardCoords(boardDiameterByHex);
    const sortedBoard = CoordsHelper.sortCoordsByRows(board);

    //console.log(board, sortedBoard); 
    expect(sortedBoard.length).toEqual(boardDiameterByHex);

    const numberOfItems = sortedBoard.reduce((acc, curr) => {
      const a = acc += curr.length;
      return a;
    }, 0);
    expect(board.length).toEqual(numberOfItems);

    expect(sortedBoard[0].length).toEqual(3);
    expect(sortedBoard[1].length).toEqual(4);
    expect(sortedBoard[2].length).toEqual(5);
    expect(sortedBoard[3].length).toEqual(4);
    expect(sortedBoard[4].length).toEqual(3);
  });
  

  it('should return list of coordinates that create circle around provided point with radius: 1', () => {
    const point = { r: 0, q: 0, s: 0 }
    const circle = CoordsHelper.getCircleOfCoordinates(point, 1);

    expect(circle.length).toEqual(6);

    const constraintViolated = circle.filter(f => (f.q + f.r + f.s) !== 0)
    expect(constraintViolated.length).toEqual(0);

    const expectedOutput = [
      { r: 0, q: -1, s: 1 },
      { r: 1, q: -1, s: 0 },
      { r: 1, q: 0, s: -1 },
      { r: 0, q: 1, s: -1 },
      { r: -1, q: 1, s: 0 },
      { r: -1, q: 0, s: 1 }
    ];
    const mismatchedCoords = circle.filter(f =>
      !expectedOutput.some(e => e.q === f.q && e.r === f.r && e.s === f.s))
    
    expect(mismatchedCoords.length).toEqual(0);
  });


  it('should return list of coordinates that create circle around provided point with radius: 2', () => {
    const point = { r: 0, q: 0, s: 0 }
    const circle = CoordsHelper.getCircleOfCoordinates(point, 2);

    expect(circle.length).toEqual(12);

    const constraintViolated = circle.filter(f => (f.q + f.r + f.s) !== 0)
    expect(constraintViolated.length).toEqual(0);

    const expectedOutput = [
      { r: -2, q: 0, s: 2 },
      { r: -1, q: -1, s: 2 },
      { r: 0, q: -2, s: 2 },
      { r: 1, q: -2, s: 1 },
      { r: 2, q: -2, s: 0 },
      { r: 2, q: -1, s: -1 },
      { r: 2, q: 0, s: -2 },
      { r: 1, q: 1, s: -2 },
      { r: 0, q: 2, s: -2 },
      { r: -1, q: 2, s: -1 },
      { r: -2, q: 2, s: 0 },
      { r: -2, q: 1, s: 1 }
    ];
    const mismatchedCoords = circle.filter(f =>
      !expectedOutput.some(e => e.q === f.q && e.r === f.r && e.s === f.s))
    
    expect(mismatchedCoords.length).toEqual(0);
  });

  it('should return list of coordinates that are in stright line from TOP side', () => {
    const point = { r: 0, q: 0, s: 0 }

    const result = CoordsHelper.getLineOfCoordinates(point, HexSide.Top, 2);
    expect(result[0].q).toEqual(1);
    expect(result[0].s).toEqual(-1);
    expect(result[1].q).toEqual(2);
    expect(result[1].s).toEqual(-2);
  });

  it('should return list of coordinates that are in stright line from BOTTOMLEFT side', () => {
    const point = { r: 0, q: 0, s: 0 }

    const result = CoordsHelper.getLineOfCoordinates(point, HexSide.BottomLeft, 2);
    expect(result[0].s).toEqual(1);
    expect(result[0].r).toEqual(-1);
    expect(result[1].s).toEqual(2);
    expect(result[1].r).toEqual(-2);
  });


});