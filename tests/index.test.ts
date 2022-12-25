import { describe, expect, it } from "vitest";
import { generate } from "../src";

describe("generate", () => {
	it("returns number array", () => {
		let board = generate();
		expect(board).toBeTypeOf("object");
		expect(board.length).toBe(9);
		expect(board[Math.floor(Math.random() * 9)].length).toBe(9);
		expect(board[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)]).toBeTypeOf(
			"number"
		);
	});
});
