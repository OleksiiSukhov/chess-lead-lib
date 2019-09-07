import { BishopMovements } from "../board/movements/bishop-movements";
import { Color } from "../models/color";
import { Bishop } from "./bishop";

test("movements should return object of BishopMovements", () => {
  const bishop = new Bishop(Color.Black);
  expect(bishop.movements()).toBeInstanceOf(BishopMovements);
});
