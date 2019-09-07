import { BishopMovements } from "../board/movements/bishop-movements";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";
import { ChessPieceType } from "./chess-piece-type";

export class Bishop extends ChessPiece {
  constructor(color: Color) {
    super(color, ChessPieceType.Bishop);
  }

  public movements(): Movements {
    return new BishopMovements();
  }
}
