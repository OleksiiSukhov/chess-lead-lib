import { cloneDeep } from "lodash";
import { ChessPiece } from "../../chess-pieces/chess-piece";
import { ChessType } from "../../chess-pieces/chess-type";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { Direction } from "../../models/direction";
import { Utils } from "../../utils/utils";
import { Guard } from "../../validators/guard";

export abstract class Movements {
  public static getKingCell(board: Cell[][], currentColor: Color): Cell | undefined {
    for (let row = 0; row < 8; row++) {
      for (let cell = 0; cell < 8; cell++) {
        const chessPiece = board[row][cell].chessPiece;

        if (
          chessPiece &&
          chessPiece.chessType === ChessType.King &&
          chessPiece.color === currentColor
        ) {
          return board[row][cell];
        }
      }
    }

    Guard.throwAllyKingWasNotFound();
  }

  public static isKingInCheck(
    boardCellToCheck: Cell,
    boardState: BoardState,
    kingCell: Cell,
  ): boolean {
    const chessPiece = boardCellToCheck.chessPiece;

    if (!chessPiece || !kingCell.chessPiece || chessPiece.color === kingCell.chessPiece.color) {
      return false;
    }

    const currentEnemyAvailableCells = chessPiece
      .movements()
      .getAvailable(boardState, boardCellToCheck, false);

    return currentEnemyAvailableCells.some(enemyAvailableCell =>
      Utils.cellsOnSamePosition(enemyAvailableCell, kingCell),
    );
  }

  public static getOccupiedCells(board: Cell[][], color: Color | undefined): Cell[] {
    const cells: Cell[] = [];

    board.forEach(row => {
      row.forEach(cell => {
        if (cell.chessPiece && cell.chessPiece.color === color) {
          cells.push(cell);
        }
      });
    });

    return cells;
  }

  public maxMovementSquares?: number = 0;
  public canLeap: boolean = false;
  public canDoCastling: boolean = false;
  public canDoEnPassant: boolean = false;
  public canDoPromotion: boolean = false;
  public directions?: Direction[] = [];

  public abstract getAvailable(
    boardState: BoardState,
    currentCell: Cell,
    checkCheckingNeeded: boolean,
  ): Cell[];

  public getAvailableBasedOnDirections(boardCells: Cell[][], currentCell: Cell): Cell[] {
    Guard.validateGetAvailableBasedOnDirectionsArguments(this.directions, this.maxMovementSquares);

    const availableCells: Cell[] = [];

    for (const direction of this.directions as Direction[]) {
      for (
        let squaresCount = 0;
        squaresCount < (this.maxMovementSquares as number);
        squaresCount++
      ) {
        const nextCell = new Cell(
          currentCell.rowIndex + this.getMovementSquaresCount(direction.row, squaresCount),
          currentCell.columnIndex + this.getMovementSquaresCount(direction.column, squaresCount),
        );

        if (!nextCell.isInBoardBoundaries) {
          break;
        }

        if (Utils.cellsOnSamePosition(nextCell, currentCell)) {
          continue;
        }

        const nextBoardCell = boardCells[nextCell.rowIndex][nextCell.columnIndex];
        const nextCellChessPiece = nextBoardCell.chessPiece;
        const currentCellChessPiece = currentCell.chessPiece;

        if (nextCellChessPiece && currentCellChessPiece) {
          if (nextCellChessPiece.color !== currentCellChessPiece.color) {
            availableCells.push(nextBoardCell);
          }

          break;
        }

        availableCells.push(nextBoardCell);
      }
    }

    return availableCells;
  }

  public getMovementSquaresCount(direction: number, squaresCount: number): number {
    if (direction === 0) {
      return 0;
    }

    return direction + (direction === -1 ? squaresCount * -1 : squaresCount);
  }

  public getAdjustedAvailableCellsWithCheckChecking(
    initialAvailableCells: Cell[],
    boardState: BoardState,
    currentCell: Cell,
  ): Cell[] {
    const currentChessPiece = cloneDeep(currentCell.chessPiece) as ChessPiece;
    const boardStateCopy = cloneDeep(boardState);

    boardStateCopy.board[currentCell.rowIndex][currentCell.columnIndex].chessPiece = undefined;

    initialAvailableCells.forEach(availableCell => {
      const previousCell = cloneDeep(
        boardStateCopy.board[availableCell.rowIndex][availableCell.columnIndex],
      );

      this.makeTestMovement(boardStateCopy.board, availableCell, currentChessPiece);
      const allyKingCell = Movements.getKingCell(boardStateCopy.board, currentChessPiece.color);

      initialAvailableCells = this.getAdjustedCells(
        initialAvailableCells,
        boardStateCopy,
        allyKingCell as Cell,
        availableCell,
      );

      boardStateCopy.board[availableCell.rowIndex][availableCell.columnIndex] = previousCell;
    });

    return initialAvailableCells;
  }

  private makeTestMovement(board: Cell[][], cellToMove: Cell, chessPiece: ChessPiece): void {
    board[cellToMove.rowIndex][cellToMove.columnIndex].chessPiece = cloneDeep(chessPiece);
  }

  private getAdjustedCells(
    initialAvailableCells: Cell[],
    boardState: BoardState,
    allyKingCell: Cell,
    availableSquare: Cell,
  ): Cell[] {
    boardState.board.forEach(boardRow => {
      boardRow.forEach(boardCell => {
        if (Movements.isKingInCheck(boardCell, boardState, allyKingCell)) {
          initialAvailableCells = initialAvailableCells.filter(cell => {
            return !Utils.cellsOnSamePosition(cell, availableSquare);
          });
        }
      });
    });

    return initialAvailableCells;
  }
}
