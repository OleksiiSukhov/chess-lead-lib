import { King } from "../chess-pieces/king";
import { Cell } from "../models/cell";
import { Color } from "../models/color";

export class TestAssistance {
  public static setupKingsOnInitialPositions(boardCells: Cell[][]): void {
    boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
    boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  }
}
