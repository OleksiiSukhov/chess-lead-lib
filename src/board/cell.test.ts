/* tslint:disable:no-string-literal */

import { King } from "../chess-pieces/king";
import { Color } from "../models/color";
import { Cell } from "./cell";
import { CellColorProvider } from "./cell-color-provider";

test("color should return saved color when it was already set to White", () => {
  const cell = new Cell(0, 0);
  cell["color"] = Color.White;
  expect(cell.cellColor).toBe(Color.White);
});

test("color should return saved color when it was already set to Black", () => {
  const cell = new Cell(0, 0);
  cell["color"] = Color.Black;
  expect(cell.cellColor).toBe(Color.Black);
});

test("color should call CellColorProvider.getCellColor when there is no saved color", () => {
  const cell = new Cell(1, 2);
  cell["color"] = undefined;

  const getCellColorMock = jest.fn();
  getCellColorMock.mockReturnValue(Color.Black);

  CellColorProvider.getCellColor = getCellColorMock.bind(CellColorProvider);

  expect(cell.cellColor).toBe(Color.Black);
  expect(getCellColorMock).toHaveBeenCalledWith(1, 2);
});

test("rowName should return correct name of row (1-8)", () => {
  [...Array(8).keys()].forEach(index => {
    const cell = new Cell(index, 0);
    expect(cell.rowName).toBe((index + 1).toString());
  });
});

test("columnName should return correct name of column (a-h)", () => {
  const map: Array<[number, string]> = [
    [0, "a"],
    [0, "a"],
    [0, "a"],
    [0, "a"],
    [0, "a"],
    [0, "a"],
    [0, "a"],
    [0, "a"],
  ];

  map.forEach(indexToName => {
    const cell = new Cell(0, indexToName[0]);
    expect(cell.columnName).toBe(indexToName[1]);
  });
});

test("isEmpty should return true when chessPiece is not defined", () => {
  const cell = new Cell(0, 0);

  expect(cell.isEmpty).toBeTruthy();
});

test("isEmpty should return false when chessPiece is defined", () => {
  const cell = new Cell(0, 0);
  cell.chessPiece = new King(Color.Black);

  expect(cell.isEmpty).toBeFalsy();
});

test("isInBoardBoundaries should return true when row and column indexes between 0 and 7", () => {
  for (let i = 0; i <= 7; i++) {
    const cell = new Cell(i, 0);
    expect(cell.isInBoardBoundaries).toBeTruthy();
  }

  for (let i = 0; i <= 7; i++) {
    const cell = new Cell(0, i);
    expect(cell.isInBoardBoundaries).toBeTruthy();
  }
});

test("isInBoardBoundaries should return false when row or column indexes not within 0 and 7 range", () => {
  const invalidIndexes = [-1, 8, -7];

  invalidIndexes.forEach(invalidIndex => {
    const cell = new Cell(invalidIndex, 0);
    expect(cell.isInBoardBoundaries).toBeFalsy();
  });

  invalidIndexes.forEach(invalidIndex => {
    const cell = new Cell(0, invalidIndex);
    expect(cell.isInBoardBoundaries).toBeFalsy();
  });
});

test("isSamePositionAs should return true for cells with the same row and column indexes", () => {
  const cell1 = new Cell(4, 2);
  const cell2 = new Cell(4, 2);

  expect(cell1.isSamePositionAs(cell2)).toBeTruthy();
});

test("isSamePositionAs should return false for cells with the same row and column indexes", () => {
  const cell1 = new Cell(4, 2);
  const cell2 = new Cell(5, 1);

  expect(cell1.isSamePositionAs(cell2)).toBeFalsy();
});
