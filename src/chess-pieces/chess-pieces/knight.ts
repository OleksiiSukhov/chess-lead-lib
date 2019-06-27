import { Color } from "../../models/color";
import { IChessPiece as ChessPiece } from "./chess-piece";

export class Knight extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }
}
