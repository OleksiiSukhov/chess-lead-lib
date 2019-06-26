/* tslint:disable:no-string-literal */

import { Color } from "../models/color";
import { Cell } from "./cell";
import { CellColorProvider } from "./cell-color-provider";

const errorMessage = "row and column indexes should be 0 to 7";

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
  const map: Array<[number, string]> = [[0, "a"], [0, "a"], [0, "a"], [0, "a"], [0, "a"], [0, "a"], [0, "a"], [0, "a"]];

  map.forEach(indexToName => {
    const cell = new Cell(0, indexToName[0]);
    expect(cell.columnName).toBe(indexToName[1]);
  });
});

test("constructor should throw error in case when row index is negative", () => {
  expect(() => new Cell(-1, 0)).toThrow(errorMessage);
});

test("constructor should throw error in case when row index is more than 7", () => {
  expect(() => new Cell(8, 0)).toThrow(errorMessage);
});

test("constructor should throw error in case when column index is negative", () => {
  expect(() => new Cell(0, -1)).toThrow(errorMessage);
});

test("constructor should throw error in case when column index is more than 7", () => {
  expect(() => new Cell(0, 8)).toThrow(errorMessage);
});
