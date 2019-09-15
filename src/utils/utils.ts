import { Square } from "../models/square";

export class Utils {
  public static squaresOnSamePosition(square1: Square, square2: Square): boolean {
    return square1.rowIndex === square2.rowIndex && square1.columnIndex === square2.columnIndex;
  }
}
