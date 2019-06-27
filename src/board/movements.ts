import { MovementType } from "./movement-type";

export class Movements {
  public squares?: number;
  public canLeap: boolean = false;
  public canDoCastling: boolean = false;
  public canDoEnPassant: boolean = false;
  public canDoPromotion: boolean = false;
  public movementType: MovementType;

  constructor(movementType: MovementType) {
    this.movementType = movementType;
  }
}
