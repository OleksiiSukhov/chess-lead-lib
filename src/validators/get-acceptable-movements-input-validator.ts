import { Cell } from "../board/cell";

export class GetAcceptableMovementsInputValidator {
  public static validate(cell: Cell): void {
    if (!cell) {
      throw new Error("cell should be defined");
    }
  }
}
