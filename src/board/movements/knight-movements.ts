import { Cell } from "../cell";
import { Movements } from "./movements";

export class KnightMovements extends Movements {
  public getAvailable(): Cell[] {
    throw new Error("Method not implemented.");
  }

}
