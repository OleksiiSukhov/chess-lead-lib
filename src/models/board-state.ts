import { last } from "lodash";
import { ChessPiece } from "../chess-pieces/chess-piece";
import { Guard } from "../validators/guard";
import { Cell } from "./cell";
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
    Guard.validateChessPiece(chessPiece);

    const lastMovements = last(this.movements);

    if (!lastMovements) {
      return false;
    }

    return lastMovements.chessPieceId === chessPiece.id;
  }

  public resign(color: Color): void {
    Guard.validateResignation(this, color);

    this.winSide = color === Color.White ? Color.Black : Color.White;
    this.gameStatus = GameStatus.Win;
    this.nextTurn = undefined;
    this.winType = WinType.Resignation;
  }
}
