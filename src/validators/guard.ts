import { ChessLead } from "..";
import { ChessPiece } from "../chess-pieces/chess-piece";
import { ChessPieceType } from "../chess-pieces/chess-piece-type";
import { BoardState } from "../models/board-state";
import { Color } from "../models/color";
import { Direction } from "../models/direction";
import { GameStatus } from "../models/game-status";
import { Square } from "../models/square";
import { Utils } from "../utils/utils";

export class Guard {
  public static throwAllyKingWasNotFound(): void {
    throw Error("Ally King was not found.");
  }

  public static validateSquare(square: Square): void {
    Guard.validateProperty(square, "square");
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

  public static validateGetAvailableArguments(
    boardSquares: Square[][],
    currentSquare: Square,
  ): void {
    if (!boardSquares || !currentSquare || !currentSquare.chessPiece) {
      throw new Error("boardSquares, currentSquare and chessPiece on it should be defined.");
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

  public static validateMovement(chessLead: ChessLead, fromSquare: Square, toSquare: Square): void {
    const acceptableMovements = chessLead.getAcceptableMovements(fromSquare);
    const acceptableToSquare = acceptableMovements.find(square =>
      Utils.squaresOnSamePosition(square, toSquare),
    );

    if (!acceptableToSquare) {
      throw Error("Movement to specified square is forbidden.");
    }
  }

  public static validatePromotion(
    fromSquare: Square,
    toSquare: Square,
    newChessPieceType?: ChessPieceType,
  ): void {
    const chessPiece = fromSquare.chessPiece as ChessPiece;

    if (
      chessPiece.chessPieceType === ChessPieceType.Pawn &&
      (toSquare.rowIndex === 7 || toSquare.rowIndex === 0)
    ) {
      if (newChessPieceType === undefined) {
        throw Error("Pawn must be promoted. New ChessPiece type should be specified.");
      }

      if (newChessPieceType === ChessPieceType.Pawn || newChessPieceType === ChessPieceType.King) {
        throw Error("Pawn cannot be promoted to Pawn or King.");
      }
    } else if (newChessPieceType !== undefined) {
      throw Error("ChessPiece type should be specified only in case of Pawn promotion.");
    }
  }

  public static validateChessPieceOnSquare(square: Square): void {
    if (!square.chessPiece) {
      throw Error("fromSquare cannot be empty.");
    }
  }

  public static validateGameStatus(chessLead: ChessLead): void {
    if (chessLead.chessBoardState.isGameOver()) {
      throw Error("The game is over. Movement is not possible.");
    }
  }

  public static validateChessPieceColor(boardState: BoardState, square: Square): void {
    if ((square.chessPiece as ChessPiece).color !== boardState.nextTurn) {
      throw Error("Wrong turn color for specified fromSquare.");
    }
  }

  private static validateProperty(property: any, propertyName: string): void {
    if (!property) {
      throw new Error(`${propertyName} should be defined`);
    }
  }
}
