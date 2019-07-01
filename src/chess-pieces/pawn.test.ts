import { PawnMovements } from "../board/movements/pawn-movements";
import { Color } from "../models/color";
import { Pawn } from "./pawn";

test("movements should return object of PawnMovements", () => {
  const pawn = new Pawn(Color.Black);
  expect(pawn.movements()).toBeInstanceOf(PawnMovements);
});

