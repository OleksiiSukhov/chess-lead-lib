import { Movements } from "../board/movements/movements";
import { QueenMovements } from "../board/movements/queen-movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";
import { ChessPieceType } from "./chess-piece-type";

export class Queen extends ChessPiece {
  constructor(color: Color) {
    super(color, ChessPieceType.Queen);
  }

  public movements(): Movements {
    return new QueenMovements();
  }
}
