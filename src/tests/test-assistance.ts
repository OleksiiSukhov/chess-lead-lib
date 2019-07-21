import { Cell } from "../board/cell";

export class TestAssistance {
  public static setupEmptyBoard(): Cell[][] {
    const cells: Cell[][] = [];

    for (let row = 0; row < 8; row++) {
      cells.push([]);
      for (let column = 0; column < 8; column++) {
        cells[row].push(new Cell(row, column));
      }
    }

    return cells;
  }
}
