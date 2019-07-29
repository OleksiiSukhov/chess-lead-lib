import { Cell } from "../board/cell";
import { King } from "../chess-pieces/king";
import { Color } from "../models/color";

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

  public static setupKingsOnInitialPositions(boardCells: Cell[][]): void {
    boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
    boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  }
}
