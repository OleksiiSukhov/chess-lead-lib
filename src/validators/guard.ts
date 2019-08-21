import { ChessLead } from "..";
import { ChessPiece } from "../chess-pieces/chess-piece";
import { BoardState } from "../models/board-state";
import { Cell } from "../models/cell";
import { Color } from "../models/color";
import { Direction } from "../models/direction";
import { GameStatus } from "../models/game-status";
import { Utils } from "../utils/utils";

export class Guard {
  public static throwAllyKingWasNotFound(): void {
    throw Error("Ally King was not found.");
  }

  public static validateCell(cell: Cell): void {
    Guard.validateProperty(cell, "cell");
  }

  public static validateBoardIndexes(rowIndex: number, columnIndex: number): void {
    if (rowIndex < 0 || rowIndex > 7 || columnIndex < 0 || columnIndex > 7) {
      throw Error("row and column indexes should be 0 to 7.");
    }
  }

  public static validateChessPiece(chessPiece: ChessPiece | undefined): void {
    Guard.validateProperty(chessPiece, "chessPiece");
  }

  public static validateDirections(directions: Direction[] | undefined): void {
    Guard.validateProperty(directions, "directions");
  }

  public static validateGetAvailableArguments(boardCells: Cell[][], currentCell: Cell): void {
    if (!boardCells || !currentCell || !currentCell.chessPiece) {
      throw new Error("boardCells, currentCell and chessPiece on it should be defined.");
    }
  }

  public static validateGetAvailableBasedOnDirectionsArguments(
    directions: Direction[] | undefined,
    maxMovementSquares: number | undefined,
  ): void {
    if (!directions || !maxMovementSquares) {
      throw new Error("directions and maxMovementSquares should be defined.");
    }
  }

  public static validateResignation(boardState: BoardState, resignationColor: Color): void {
    if (boardState.gameStatus !== GameStatus.InProgress) {
      throw new Error("The game is over. Resignation is not possible.");
    }

    if (boardState.nextTurn !== resignationColor) {
      throw new Error("Resignation is not possible while opposite color turn.");
    }
  }

  public static validateMovement(chessLead: ChessLead, fromCell: Cell, toCell: Cell): void {
    const acceptableMovements = chessLead.getAcceptableMovements(fromCell);
    const acceptableToCell = acceptableMovements.find(cell =>
      Utils.cellsOnSamePosition(cell, toCell),
    );

    if (!acceptableToCell) {
      throw Error("Movement to specified cell is forbidden.");
    }
  }

  public static validateChessPieceOnCell(cell: Cell): void {
    if (!cell.chessPiece) {
      throw Error("fromCell cannot be empty.");
    }
  }

  public static validateGameStatus(chessLead: ChessLead): void {
    if (chessLead.chessBoardState.isGameFinished()) {
      throw Error("The game is over. Movement is not possible.");
    }
  }

  public static validateChessPieceColor(boardState: BoardState, cell: Cell): void {
    if ((cell.chessPiece as ChessPiece).color !== boardState.nextTurn) {
      throw Error("Wrong turn color for specified fromCell.");
    }
  }

  private static validateProperty(property: any, propertyName: string): void {
    if (!property) {
      throw new Error(`${propertyName} should be defined`);
    }
  }
}

// todo: add tests for validate functions

// test("move should throw error when movement is forbidden", () => {
//   const boardState = new BoardState();
//   boardState.nextTurn = Color.White;
//   boardState.board = BoardBuilder.setupEmptyBoard();
//   const chessPieceToMove = new Rook(Color.White);

//   boardState.board[7][4].chessPiece = new King(Color.Black);
//   boardState.board[0][4].chessPiece = new King(Color.White);
//   boardState.board[0][0].chessPiece = chessPieceToMove;

//   const chessLead = new ChessLead(boardState);

//   expect(() => chessLead.move(boardState.board[0][0], boardState.board[1][2])).toThrow(
//     "Movement to specified cell is forbidden.",
//   );
// });

// test("move should throw error when fromCell is empty", () => {
//   const boardState = new BoardState();
//   boardState.nextTurn = Color.White;
//   boardState.board = BoardBuilder.setupEmptyBoard();

//   boardState.board[7][4].chessPiece = new King(Color.Black);
//   boardState.board[0][4].chessPiece = new King(Color.White);

//   const chessLead = new ChessLead(boardState);

//   expect(() => chessLead.move(boardState.board[0][0], boardState.board[1][3])).toThrow(
//     "fromCell cannot be empty.",
//   );
// });

// [GameStatus.Draw, GameStatus.Win].forEach(gameStatus => {
//   test(`move should throw error when game is over - ${gameStatus}`, () => {
//     const boardState = new BoardState();
//     boardState.nextTurn = Color.White;
//     boardState.board = BoardBuilder.setupEmptyBoard();
//     boardState.gameStatus = gameStatus;

//     const chessPieceToMove = new Rook(Color.White);

//     boardState.board[7][4].chessPiece = new King(Color.Black);
//     boardState.board[0][4].chessPiece = new King(Color.White);
//     boardState.board[0][0].chessPiece = chessPieceToMove;

//     const chessLead = new ChessLead(boardState);

//     expect(() => chessLead.move(boardState.board[0][0], boardState.board[0][2])).toThrow(
//       "The game is over. Movement is not possible.",
//     );
//   });
// });

// test("move should throw error when wrong turn color", () => {
//   const boardState = new BoardState();
//   boardState.board = BoardBuilder.setupEmptyBoard();
//   boardState.nextTurn = Color.Black;
//   const chessPieceToMove = new Rook(Color.White);

//   boardState.board[7][4].chessPiece = new King(Color.Black);
//   boardState.board[0][4].chessPiece = new King(Color.White);
//   boardState.board[0][0].chessPiece = chessPieceToMove;

//   const chessLead = new ChessLead(boardState);

//   expect(() => chessLead.move(boardState.board[0][0], boardState.board[1][2])).toThrow(
//     "Wrong turn color for specified fromCell.",
//   );
// });
