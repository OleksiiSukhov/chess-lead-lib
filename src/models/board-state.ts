import { last } from "lodash";
import { Movements } from "../board/movements/movements";
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

  public isGameFinished(): boolean {
    return this.gameStatus === GameStatus.Win || this.gameStatus === GameStatus.Draw;
  }

  public switchNextTurn(): void {
    if (this.isGameFinished()) {
      this.nextTurn = undefined;
    } else {
      this.nextTurn = this.nextTurn === Color.White ? Color.Black : Color.White;
    }
  }

  public setNewGameStatus(): void {
    const enemyColor = this.nextTurn === Color.White ? Color.Black : Color.White;
    const enemyKingCell = Movements.getKingCell(this.board, enemyColor) as Cell;

    const allyCells = Movements.getOccupiedCells(this.board, this.nextTurn);
    const enemyCells = Movements.getOccupiedCells(this.board, enemyColor);

    if (allyCells.length === 1 && enemyCells.length === 1) {
      this.gameStatus = GameStatus.Draw;
      this.drawType = DrawType.InsufficientMaterial;
      return;
    }

    this.isCheck = allyCells.some(allyCell =>
      Movements.isKingInCheck(allyCell, this, enemyKingCell),
    );

    const enemyKingCanMove = enemyCells.some(enemyCell => {
      const chessPiece = enemyCell.chessPiece;
      return chessPiece && chessPiece.movements().getAvailable(this, enemyCell, true).length > 0;
    });

    if (this.isCheck) {
      this.gameStatus = enemyKingCanMove ? GameStatus.InProgress : GameStatus.Win;

      if (this.gameStatus === GameStatus.Win) {
        this.winType = WinType.Checkmate;
        this.winSide = this.nextTurn;
      }
    } else {
      this.gameStatus = enemyKingCanMove ? GameStatus.InProgress : GameStatus.Draw;

      if (this.gameStatus === GameStatus.Draw) {
        this.drawType = DrawType.Stalemate;
      }
    }
  }

  public setDrawByAgreement(): void {
    this.gameStatus = GameStatus.Draw;
    this.drawType = DrawType.ByAgreement;
  }
}
