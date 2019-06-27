import { Color } from "../../models/color";
import { IChessPiece as ChessPiece } from "./chess-piece";

export class Queen extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }
}
