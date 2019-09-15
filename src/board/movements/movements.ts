import { cloneDeep } from "lodash";
import { ChessPiece } from "../../chess-pieces/chess-piece";
import { ChessPieceType } from "../../chess-pieces/chess-piece-type";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Direction } from "../../models/direction";
import { Square } from "../../models/square";
import { Utils } from "../../utils/utils";
import { Guard } from "../../validators/guard";

export abstract class Movements {
  public static getKingSquare(board: Square[][], currentColor: Color): Square | undefined {
    for (let row = 0; row < 8; row++) {
      for (let square = 0; square < 8; square++) {
        const chessPiece = board[row][square].chessPiece;

        if (
          chessPiece &&
          chessPiece.chessPieceType === ChessPieceType.King &&
          chessPiece.color === currentColor
        ) {
          return board[row][square];
        }
      }
    }

    Guard.throwAllyKingWasNotFound();
  }

  public static isKingInCheck(
    boardSquareToCheck: Square,
    boardState: BoardState,
    kingSquare: Square,
  ): boolean {
    const chessPiece = boardSquareToCheck.chessPiece;

    if (!chessPiece || !kingSquare.chessPiece || chessPiece.color === kingSquare.chessPiece.color) {
      return false;
    }

    const currentEnemyAvailableSquares = chessPiece
      .movements()
      .getAvailable(boardState, boardSquareToCheck, false);

    return currentEnemyAvailableSquares.some(enemyAvailableSquare =>
      Utils.squaresOnSamePosition(enemyAvailableSquare, kingSquare),
    );
  }

  public static getOccupiedSquares(board: Square[][], color: Color | undefined): Square[] {
    const squares: Square[] = [];

    board.forEach(row => {
      row.forEach(square => {
        if (square.chessPiece && square.chessPiece.color === color) {
          squares.push(square);
        }
      });
    });

    return squares;
  }

  public maxMovementSquares?: number = 0;
  public canLeap: boolean = false;
  public canDoCastling: boolean = false;
  public canDoEnPassant: boolean = false;
  public canDoPromotion: boolean = false;
  public directions?: Direction[] = [];

  public abstract getAvailable(
    boardState: BoardState,
    currentSquare: Square,
    checkCheckingNeeded: boolean,
  ): Square[];

  public getAvailableBasedOnDirections(boardSquares: Square[][], currentSquare: Square): Square[] {
    Guard.validateGetAvailableBasedOnDirectionsArguments(this.directions, this.maxMovementSquares);

    const availableSquares: Square[] = [];

    for (const direction of this.directions as Direction[]) {
      for (
        let squaresCount = 0;
        squaresCount < (this.maxMovementSquares as number);
        squaresCount++
      ) {
        const nextSquare = new Square(
          currentSquare.rowIndex + this.getMovementSquaresCount(direction.row, squaresCount),
          currentSquare.columnIndex + this.getMovementSquaresCount(direction.column, squaresCount),
        );

        if (!nextSquare.isInBoardBoundaries) {
          break;
        }

        if (Utils.squaresOnSamePosition(nextSquare, currentSquare)) {
          continue;
        }

        const nextBoardSquare = boardSquares[nextSquare.rowIndex][nextSquare.columnIndex];
        const nextSquareChessPiece = nextBoardSquare.chessPiece;
        const currentSquareChessPiece = currentSquare.chessPiece;

        if (nextSquareChessPiece && currentSquareChessPiece) {
          if (nextSquareChessPiece.color !== currentSquareChessPiece.color) {
            availableSquares.push(nextBoardSquare);
          }

          break;
        }

        availableSquares.push(nextBoardSquare);
      }
    }

    return availableSquares;
  }

  public getMovementSquaresCount(direction: number, squaresCount: number): number {
    if (direction === 0) {
      return 0;
    }

    return direction + (direction === -1 ? squaresCount * -1 : squaresCount);
  }

  public getAdjustedAvailableSquaresWithCheckChecking(
    initialAvailableSquares: Square[],
    boardState: BoardState,
    currentSquare: Square,
  ): Square[] {
    const currentChessPiece = cloneDeep(currentSquare.chessPiece) as ChessPiece;
    const boardStateCopy = cloneDeep(boardState);

    boardStateCopy.board[currentSquare.rowIndex][currentSquare.columnIndex].chessPiece = undefined;

    initialAvailableSquares.forEach(availableSquare => {
      const previousSquare = cloneDeep(
        boardStateCopy.board[availableSquare.rowIndex][availableSquare.columnIndex],
      );

      this.makeTestMovement(boardStateCopy.board, availableSquare, currentChessPiece);
      const allyKingSquare = Movements.getKingSquare(boardStateCopy.board, currentChessPiece.color);

      initialAvailableSquares = this.getAdjustedSquares(
        initialAvailableSquares,
        boardStateCopy,
        allyKingSquare as Square,
        availableSquare,
      );

      boardStateCopy.board[availableSquare.rowIndex][availableSquare.columnIndex] = previousSquare;
    });

    return initialAvailableSquares;
  }

  private makeTestMovement(board: Square[][], squareToMove: Square, chessPiece: ChessPiece): void {
    board[squareToMove.rowIndex][squareToMove.columnIndex].chessPiece = cloneDeep(chessPiece);
  }

  private getAdjustedSquares(
    initialAvailableSquares: Square[],
    boardState: BoardState,
    allyKingSquare: Square,
    availableSquare: Square,
  ): Square[] {
    boardState.board.forEach(boardRow => {
      boardRow.forEach(boardSquare => {
        if (Movements.isKingInCheck(boardSquare, boardState, allyKingSquare)) {
          initialAvailableSquares = initialAvailableSquares.filter(square => {
            return !Utils.squaresOnSamePosition(square, availableSquare);
          });
        }
      });
    });

    return initialAvailableSquares;
  }
}
