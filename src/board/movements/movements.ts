import { cloneDeep } from "lodash";
import { ChessPiece } from "../../chess-pieces/chess-piece";
import { ChessType } from "../../chess-pieces/chess-type";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Direction } from "../../models/direction";
import { Cell } from "../cell";

export abstract class Movements {
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

  public validateGetAvailableArguments(boardCells: Cell[][], currentCell: Cell): void {
    if (!boardCells || !currentCell || !currentCell.chessPiece) {
      throw new Error("boardCells, currentCell and chessPiece on it should be defined");
    }
  }

  public getAvailableBasedOnDirections(boardCells: Cell[][], currentCell: Cell): Cell[] {
    if (!this.directions || !this.maxMovementSquares) {
      throw new Error("directions and maxMovementSquares should be defined");
    }

    const availableCells: Cell[] = [];

    for (const direction of this.directions) {
      for (let squaresCount = 0; squaresCount < this.maxMovementSquares; squaresCount++) {
        const nextCell = new Cell(
          currentCell.rowIndex + this.getMovementSquaresCount(direction.row, squaresCount),
          currentCell.columnIndex + this.getMovementSquaresCount(direction.column, squaresCount),
        );

        if (!nextCell.isInBoardBoundaries) {
          break;
        }

        if (nextCell.isSamePositionAs(currentCell)) {
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

    // todo: check "check" for available cells

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
    const initialChessPiece = cloneDeep(currentCell.chessPiece);

    if (!initialChessPiece) {
      throw Error("Current cell chess piece should be defined.");
    }

    const allyKingCell = this.getAllyKingCell(boardState.board, initialChessPiece.color);
    const boardStateCopy = cloneDeep(boardState);

    boardStateCopy.board[currentCell.rowIndex][currentCell.columnIndex].chessPiece = undefined;

    initialAvailableCells.forEach(availableCell => {
      const previousCell = cloneDeep(
        boardStateCopy.board[availableCell.rowIndex][availableCell.columnIndex],
      );

      this.makeTestMovement(boardStateCopy.board, availableCell, initialChessPiece);

      initialAvailableCells = this.getAdjustedCells(
        initialAvailableCells,
        boardStateCopy,
        allyKingCell,
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
        if (this.isKingInCheck(boardCell, boardState, allyKingCell)) {
          initialAvailableCells = initialAvailableCells.filter(
            square =>
              square.rowIndex !== availableSquare.rowIndex ||
              square.columnIndex !== availableSquare.columnIndex,
          );
        }
      });
    });

    return initialAvailableCells;
  }

  private getAllyKingCell(board: Cell[][], currentColor: Color): Cell {
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

    throw Error("Ally King was not found.");
  }

  private isKingInCheck(
    boardCellToCheck: Cell,
    boardState: BoardState,
    allyKingCell: Cell,
  ): boolean {
    const chessPiece = boardCellToCheck.chessPiece;

    if (
      !chessPiece ||
      !allyKingCell.chessPiece ||
      chessPiece.color === allyKingCell.chessPiece.color
    ) {
      return false;
    }

    const currentEnemyAvailableCells = chessPiece
      .movements()
      .getAvailable(boardState, boardCellToCheck, false);

    return currentEnemyAvailableCells.some(
      enemyAvailableCell =>
        enemyAvailableCell.rowIndex === allyKingCell.rowIndex &&
        enemyAvailableCell.columnIndex === allyKingCell.columnIndex,
    );
  }
}
