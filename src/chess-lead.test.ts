import { ChessLead } from "./index";

test("My Greeter", () => {
    const chessLead: ChessLead = new ChessLead();
    expect(chessLead.test()).toBe("test works");
});
