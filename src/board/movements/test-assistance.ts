import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { Movements } from "./movements";

export class TestAssistance {
  private boardState: BoardState;
  private movements: Movements;

  constructor(boardState: BoardState, movements: Movements) {
    this.boardState = boardState;
    this.movements = movements;
  }

  public setupKingsOnInitialPositions(): void {
    this.boardState.board[7][4] = {
      rowIndex: 7,
      columnIndex: 4,
      chessPiece: new King(Color.Black),
    } as Cell;
    this.boardState.board[0][4] = {
      rowIndex: 0,
      columnIndex: 4,
      chessPiece: new King(Color.White),
    } as Cell;
  }

  public assertAvailableMovementCells(expected: Cell[], currentCell: Cell): void {
    const actual = this.movements.getAvailable(this.boardState, currentCell, true);
    expect(xorWith(actual, expected, isEqual).length).toBe(0);
  }
}
