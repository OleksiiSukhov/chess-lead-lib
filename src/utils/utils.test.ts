import { Cell } from "../board/cell";
import { Utils } from "./utils";

test("cellsOnSamePosition should return true for cells with the same row and column indexes", () => {
  const cell1 = new Cell(4, 2);
  const cell2 = new Cell(4, 2);

  expect(Utils.cellsOnSamePosition(cell1, cell2)).toBeTruthy();
});

test("cellsOnSamePosition should return false for cells with the same row and column indexes", () => {
  const cell1 = new Cell(4, 2);
  const cell2 = new Cell(5, 1);

  expect(Utils.cellsOnSamePosition(cell1, cell2)).toBeFalsy();
});