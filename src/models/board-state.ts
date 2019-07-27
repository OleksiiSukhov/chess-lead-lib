import { last } from "lodash";
import { Cell } from "../board/cell";
import { ChessPiece } from "../chess-pieces/chess-piece";
import { Color } from "./color";
import { DrawType } from "./draw-type";
import { GameStatus } from "./game-status";
import { MovedChessPiece } from "./moved-chess-piece";
import { WinType } from "./win-type";

export class BoardState {
  public isCheck: boolean = false;
  public nextTurn?: Color = undefined;
  public winSide?: Color = undefined;
  public gameStatus: GameStatus = GameStatus.InProgress;
  public drawType?: DrawType = undefined;
  public winType?: WinType = undefined;
  public board: Cell[][] = [];
  public repetitionNumber: number = 0;
  public movements: MovedChessPiece[] = [];

  public isLastMovementsPerformedBy(chessPiece: ChessPiece): boolean {
    if (!chessPiece) {
      throw Error("chessPiece should be defined.");
    }

    const lastMovements = last(this.movements);

    if (!lastMovements) {
      return false;
    }

    return lastMovements.chessPieceId === chessPiece.id;
  }
}
