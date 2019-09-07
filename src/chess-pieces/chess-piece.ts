import * as v4 from "uuid/v4";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPieceType } from "./chess-piece-type";

export abstract class ChessPiece {
  public readonly color: Color;
  public readonly chessPieceType: ChessPieceType;
  public movedNumber: number = 0;
  private chessPieceId: string;

  public get id(): string {
    return this.chessPieceId;
  }

  public get moved(): boolean {
    return this.movedNumber > 0;
  }

  constructor(color: Color, chessPieceType: ChessPieceType) {
    this.color = color;
    this.chessPieceType = chessPieceType;
    this.chessPieceId = v4();
  }

  public abstract movements(): Movements;
}
