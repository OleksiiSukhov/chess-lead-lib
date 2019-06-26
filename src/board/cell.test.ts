/* tslint:disable:no-string-literal */

import { Color } from "../models/color";
import { Cell } from "./cell";
import { CellColorProvider } from "./cell-color-provider";

let cell: Cell;

beforeEach(() => {
  cell = new Cell();
});

test("color should return saved color when it was already set to White", () => {
  cell["color"] = Color.White;
  expect(cell.cellColor).toBe(Color.White);
});

test("color should return saved color when it was already set to Black", () => {
  cell["color"] = Color.Black;
  expect(cell.cellColor).toBe(Color.Black);
});

test("color should call CellColorProvider.getCellColor when there is no saved color", () => {
  cell["color"] = undefined;
  cell.rowIndex = 1;
  cell.columnIndex = 2;

  const getCellColorMock = jest.fn();
  getCellColorMock.mockReturnValue(Color.Black);

  CellColorProvider.getCellColor = getCellColorMock.bind(CellColorProvider);

  expect(cell.cellColor).toBe(Color.Black);
  expect(getCellColorMock).toHaveBeenCalledWith(1, 2);
});
