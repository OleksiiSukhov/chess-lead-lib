import { Bishop } from "../chess-pieces/bishop";
import { ChessPiece } from "../chess-pieces/chess-piece";
import { ChessPieceType } from "../chess-pieces/chess-piece-type";
import { King } from "../chess-pieces/king";
import { Knight } from "../chess-pieces/knight";
import { Pawn } from "../chess-pieces/pawn";
import { Queen } from "../chess-pieces/queen";
import { Rook } from "../chess-pieces/rook";
import { BoardState } from "../models/board-state";
import { Color } from "../models/color";
import { Square } from "../models/square";

export class BoardBuilder {
  public static createInitial(): BoardState {
    const boardState = new BoardState();
    boardState.nextTurn = Color.White;
    boardState.board = BoardBuilder.setupEmptyBoard();

    BoardBuilder.setMainChessPieces(boardState.board, Color.White);
    BoardBuilder.setMainChessPieces(boardState.board, Color.Black);

    BoardBuilder.setPawns(boardState.board, Color.White);
    BoardBuilder.setPawns(boardState.board, Color.Black);

    return boardState;
  }

  public static setupEmptyBoard(): Square[][] {
    const squares: Square[][] = [];

    for (let row = 0; row < 8; row++) {
      squares.push([]);
      for (let column = 0; column < 8; column++) {
        squares[row].push(new Square(row, column));
      }
    }

    return squares;
  }

  public static createChessPiece(chessPieceType: ChessPieceType, color: Color): ChessPiece {
    switch (chessPieceType) {
      case ChessPieceType.Pawn:
        return new Pawn(color);
      case ChessPieceType.Rook:
        return new Rook(color);
      case ChessPieceType.Knight:
        return new Knight(color);
      case ChessPieceType.Bishop:
        return new Bishop(color);
      case ChessPieceType.Queen:
        return new Queen(color);
      case ChessPieceType.King:
        return new King(color);

      default:
        throw Error("Not supported chessPieceType.");
    }
  }

  private static setPawns(board: Square[][], color: Color): void {
    const row = color === Color.White ? 1 : 6;

    for (let column = 0; column < 8; column++) {
      board[row][column].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Pawn, color);
    }
  }

  private static setMainChessPieces(board: Square[][], color: Color): void {
    const row = color === Color.White ? 0 : 7;

    board[row][0].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Rook, color);
    board[row][1].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Knight, color);
    board[row][2].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Bishop, color);
    board[row][3].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Queen, color);
    board[row][4].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.King, color);
    board[row][5].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Bishop, color);
    board[row][6].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Knight, color);
    board[row][7].chessPiece = BoardBuilder.createChessPiece(ChessPieceType.Rook, color);
  }
}
