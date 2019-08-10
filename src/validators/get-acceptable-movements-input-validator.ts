import { Cell } from "../models/cell";

export class GetAcceptableMovementsInputValidator {
  public static validate(cell: Cell): void {
    if (!cell) {
      throw new Error("cell should be defined");
    }
  }
}
