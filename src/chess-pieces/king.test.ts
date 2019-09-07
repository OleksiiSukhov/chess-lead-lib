import { KingMovements } from "../board/movements/king-movements";
import { Color } from "../models/color";
import { King } from "./king";

test("movements should return object of KingMovements", () => {
  const king = new King(Color.Black);
  expect(king.movements()).toBeInstanceOf(KingMovements);
});
