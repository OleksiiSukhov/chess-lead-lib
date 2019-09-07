import { Color } from "../models/color";
import { Pawn } from "./pawn";

test("constructor should generate id", () => {
  const pawn = new Pawn(Color.Black);
  expect(pawn.id.length).toBe(36);
});

test("constructor should generate unique id", () => {
  const pawn1 = new Pawn(Color.Black);
  const pawn2 = new Pawn(Color.Black);

  expect(pawn1.id).not.toBe(pawn2.id);
});
