import { Cell } from "../../board/cell";
import { Color } from "../../models/color";
import { ChessPiece } from "./chess-piece";

export class Queen extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }

  public availableMovements(): Cell[] {
    throw new Error("Method not implemented.");
  }
}
