import { describe, expect, it } from "vitest";
import { generate } from "../src";

describe("generate", () => {
	it("returns number array", () => {
		let board = generate();
		expect(board).toBeTypeOf("object");
		expect(board.length).toBe(9);

		for (let y = 0; y < 9; y++) {
			expect(board[y].length).toBe(9);

			for (let x = 0; x < 9; x++) {
				expect(board[y][x]).toBeTypeOf("number");
			}
		}
	});
});
