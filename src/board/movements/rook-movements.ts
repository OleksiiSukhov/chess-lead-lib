import { cloneDeep } from "lodash";
import { ChessPiece } from "../../chess-pieces/chess-piece";
import { King } from "../../chess-pieces/king";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Cell } from "../cell";
import { Movements } from "./movements";

export class RookMovements extends Movements {
  constructor() {
    super();

    this.maxMovementSquares = 7;
    this.directions = [
      { row: 0, column: -1 },
      { row: 0, column: 1 },
      { row: -1, column: 0 },
      { row: 1, column: 0 },
    ];
  }

  public getAvailable(
    boardState: BoardState,
    currentCell: Cell,
    checkCheckingNeeded: boolean,
  ): Cell[] {
    this.validateGetAvailableArguments(boardState.board, currentCell);

    const availableSquares = this.getAvailableBasedOnDirections(boardState.board, currentCell);

    if (!checkCheckingNeeded) {
      return availableSquares;
    }

    return this.getAdjustedAvailableCellsWithCheckChecking(
      availableSquares,
      boardState,
      currentCell,
    );
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

  private getAllyKingCell(board: Cell[][], currentColor: Color): Cell {
    for (let row = 0; row < 8; row++) {
      for (let cell = 0; cell < 8; cell++) {
        const chessPiece = board[row][cell].chessPiece;

        if (chessPiece && chessPiece instanceof King && chessPiece.color === currentColor) {
          return board[row][cell];
        }
      }
    }

    throw Error("Ally King was not found.");
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
