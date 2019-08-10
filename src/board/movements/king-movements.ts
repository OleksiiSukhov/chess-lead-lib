import { ChessPiece } from "../../chess-pieces/chess-piece";
import { ChessType } from "../../chess-pieces/chess-type";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Cell } from "../cell";
import { Movements } from "./movements";

export class KingMovements extends Movements {
  private readonly initialColumn: number = 4;

  constructor() {
    super();

    this.maxMovementSquares = 1;
    this.directions = [
      { row: -1, column: -1 },
      { row: -1, column: 1 },
      { row: 1, column: -1 },
      { row: 1, column: 1 },
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

    const availableCells = this.getAvailableBasedOnDirections(boardState.board, currentCell);

    if (!checkCheckingNeeded) {
      return availableCells;
    }

    const castlingAvailableCells = this.getCastlingAcceptableCells(boardState, currentCell);

    castlingAvailableCells.forEach(castlingCell => availableCells.push(castlingCell));

    return this.getAdjustedAvailableCellsWithCheckChecking(availableCells, boardState, currentCell);
  }

  private getCastlingAcceptableCells(boardState: BoardState, currentCell: Cell): Cell[] {
    const acceptableCells: Cell[] = [];

    if (!currentCell.chessPiece) {
      throw Error("King is not found.");
    }

    if (currentCell.chessPiece.moved) {
      return acceptableCells;
    }

    if (this.isCellInCheck(boardState, currentCell, currentCell.chessPiece.color)) {
      return acceptableCells;
    }

    [0, 7].forEach(rookInitialColumn => {
      const castlingCell = this.getCastlingCell(
        boardState,
        rookInitialColumn,
        currentCell.chessPiece as ChessPiece,
      );

      if (castlingCell) {
        acceptableCells.push(castlingCell);
      }
    });

    return acceptableCells;
  }

  private getCastlingCell(
    boardState: BoardState,
    rookInitialColumn: number,
    chessPiece: ChessPiece,
  ): Cell | undefined {
    const initialKingRow = this.getInitialRow(chessPiece.color);
    const rook = boardState.board[initialKingRow][rookInitialColumn].chessPiece;

    if (!rook || rook.chessType !== ChessType.Rook) {
      return undefined;
    }

    if (rook.moved) {
      return undefined;
    }

    if (
      !this.cellsBetweenRookAndKingAreEmpty(boardState.board, rookInitialColumn, initialKingRow)
    ) {
      return undefined;
    }

    const isLeftCastling = rookInitialColumn === 0;

    if (!this.areKingCellsNotInCheckWhileCastling(boardState, isLeftCastling, chessPiece.color)) {
      return undefined;
    }

    return boardState.board[initialKingRow][this.getNewKingColumn(isLeftCastling)];
  }

  private cellsBetweenRookAndKingAreEmpty(
    board: Cell[][],
    rookStartColumn: number,
    initialKingRow: number,
  ): boolean {
    const isLeftCastling = rookStartColumn === 0;

    const start: number = isLeftCastling ? rookStartColumn : this.initialColumn;
    const stop: number = isLeftCastling ? this.initialColumn : rookStartColumn;

    for (let column = start + 1; column < stop; column++) {
      if (board[initialKingRow][column].chessPiece) {
        return false;
      }
    }

    return true;
  }

  private areKingCellsNotInCheckWhileCastling(
    boardState: BoardState,
    isLeftCastling: boolean,
    color: Color,
  ): boolean {
    const newKingColumn = this.getNewKingColumn(isLeftCastling);
    const initialRow = this.getInitialRow(color);

    const start = isLeftCastling ? newKingColumn : this.initialColumn;
    const stop = isLeftCastling ? this.initialColumn : newKingColumn;

    for (let column = start; column < stop; column++) {
      if (this.isCellInCheck(boardState, boardState.board[initialRow][column], color)) {
        return false;
      }
    }

    return true;
  }

  private getNewKingColumn(isLeftCastling: boolean) {
    return isLeftCastling ? 2 : 6;
  }

  private isCellInCheck(boardState: BoardState, kingCell: Cell, color: Color): boolean {
    return this.getAllEnemiesAvailableCells(boardState, color).some(
      enemyAvailableCell =>
        enemyAvailableCell.rowIndex === kingCell.rowIndex &&
        enemyAvailableCell.columnIndex === kingCell.columnIndex,
    );
  }

  private getAllEnemiesAvailableCells(boardState: BoardState, color: Color): Cell[] {
    const cells: Cell[] = [];

    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const cell = boardState.board[row][column];
        const chessPiece = cell.chessPiece;

        if (!chessPiece || chessPiece.color === color) {
          continue;
        }

        chessPiece
          .movements()
          .getAvailable(boardState, cell, false)
          .forEach(availableCell => {
            if (
              !cells.find(
                currentCell =>
                  currentCell.rowIndex === availableCell.rowIndex &&
                  currentCell.columnIndex === availableCell.columnIndex,
              )
            ) {
              cells.push(availableCell);
            }
          });
      }
    }

    return cells;
  }

  private getInitialRow(color: Color): number {
    return color === Color.White ? 0 : 7;
  }
}
