import { BoardState } from "../../models/board-state";
import { Direction } from "../../models/direction";
import { Square } from "../../models/square";
import { Guard } from "../../validators/guard";
import { Movements } from "./movements";

export class KnightMovements extends Movements {
  constructor() {
    super();

    this.directions = [
      { row: -1, column: -2 },
      { row: -1, column: 2 },
      { row: 1, column: -2 },
      { row: 1, column: 2 },
      { row: -2, column: -1 },
      { row: -2, column: 1 },
      { row: 2, column: -1 },
      { row: 2, column: 1 },
    ];
  }

  public getAvailable(
    boardState: BoardState,
    currentSquare: Square,
    checkCheckingNeeded: boolean,
  ): Square[] {
    Guard.validateDirections(this.directions);

    Guard.validateGetAvailableArguments(boardState.board, currentSquare);

    const availableSquares: Square[] = [];

    for (const direction of this.directions as Direction[]) {
      const nextSquare = new Square(
        currentSquare.rowIndex + direction.row,
        currentSquare.columnIndex + direction.column,
      );

      if (!nextSquare.isInBoardBoundaries) {
        continue;
      }

      const nextBoardSquare = boardState.board[nextSquare.rowIndex][nextSquare.columnIndex];
      const nextSquareChessPiece = nextBoardSquare.chessPiece;
      const currentSquareChessPiece = currentSquare.chessPiece;

      const isSquareEmpty = !nextSquareChessPiece;
      const isSquareWithEnemy =
        nextSquareChessPiece &&
        currentSquareChessPiece &&
        nextSquareChessPiece.color !== currentSquareChessPiece.color;

      if (isSquareEmpty || isSquareWithEnemy) {
        availableSquares.push(nextBoardSquare);
      }
    }

    if (!checkCheckingNeeded) {
      return availableSquares;
    }

    return this.getAdjustedAvailableSquaresWithCheckChecking(
      availableSquares,
      boardState,
      currentSquare,
    );
  }
}
