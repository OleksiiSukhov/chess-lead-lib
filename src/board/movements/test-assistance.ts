import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Square } from "../../models/square";
import { Movements } from "./movements";

export class TestAssistance {
  private boardState: BoardState;
  private movements: Movements;

  constructor(boardState: BoardState, movements: Movements) {
    this.boardState = boardState;
    this.movements = movements;
  }

  public setupKingsOnInitialPositions(): void {
    this.boardState.board[7][4].chessPiece = new King(Color.Black);
    this.boardState.board[0][4].chessPiece = new King(Color.White);
  }

  public assertAvailableMovementSquares(expected: Square[], currentSquare: Square): void {
    const actual = this.movements.getAvailable(this.boardState, currentSquare, true);
    expect(xorWith(actual, expected, isEqual).length).toBe(0);
  }
}
