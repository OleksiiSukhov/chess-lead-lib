/* tslint:disable:no-string-literal */

import { SquareColorProvider } from "../board/square-color-provider";
import { King } from "../chess-pieces/king";
import { Color } from "./color";
import { Square } from "./square";

test("color should return saved color when it was already set to White", () => {
  const square = new Square(0, 0);
  square["color"] = Color.White;
  expect(square.squareColor).toBe(Color.White);
});

test("color should return saved color when it was already set to Black", () => {
  const square = new Square(0, 0);
  square["color"] = Color.Black;
  expect(square.squareColor).toBe(Color.Black);
});

test("color should call SquareColorProvider.getSquareColor when there is no saved color", () => {
  const square = new Square(1, 2);
  square["color"] = undefined;

  const getSquareColorMock = jest.fn();
  getSquareColorMock.mockReturnValue(Color.Black);

  SquareColorProvider.getSquareColor = getSquareColorMock.bind(SquareColorProvider);

  expect(square.squareColor).toBe(Color.Black);
  expect(getSquareColorMock).toHaveBeenCalledWith(1, 2);
});

test("rowName should return correct name of row (1-8)", () => {
  [...Array(8).keys()].forEach(index => {
    const square = new Square(index, 0);
    expect(square.rowName).toBe((index + 1).toString());
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
    const square = new Square(0, indexToName[0]);
    expect(square.columnName).toBe(indexToName[1]);
  });
});

test("isEmpty should return true when chessPiece is not defined", () => {
  const square = new Square(0, 0);

  expect(square.isEmpty).toBeTruthy();
});

test("isEmpty should return false when chessPiece is defined", () => {
  const square = new Square(0, 0);
  square.chessPiece = new King(Color.Black);

  expect(square.isEmpty).toBeFalsy();
});

test("isInBoardBoundaries should return true when row and column indexes between 0 and 7", () => {
  for (let i = 0; i <= 7; i++) {
    const square = new Square(i, 0);
    expect(square.isInBoardBoundaries).toBeTruthy();
  }

  for (let i = 0; i <= 7; i++) {
    const square = new Square(0, i);
    expect(square.isInBoardBoundaries).toBeTruthy();
  }
});

test("isInBoardBoundaries should return false when row or column indexes not within 0 and 7 range", () => {
  const invalidIndexes = [-1, 8, -7];

  invalidIndexes.forEach(invalidIndex => {
    const square = new Square(invalidIndex, 0);
    expect(square.isInBoardBoundaries).toBeFalsy();
  });

  invalidIndexes.forEach(invalidIndex => {
    const square = new Square(0, invalidIndex);
    expect(square.isInBoardBoundaries).toBeFalsy();
  });
});
