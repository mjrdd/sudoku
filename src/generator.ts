import { checkBoard, checkNumber, shuffle } from "./utils";

function generate() {
	const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	var puzzle: number[][] = [];

	for (let y = 0; y < 9; y++) {
		puzzle[y] = [];

		for (let x = 0; x < 9; x++) {
			puzzle[y][x] = 0;
		}
	}

	function backtracker(board: typeof puzzle) {
		let x = 0;
		let y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let i of shuffle(nums)) {
					if (!checkNumber(board, x, y, i)) continue;
					board[y][x] = i;

					if (checkBoard(board)) return true;
					if (backtracker(board)) return true;
				}
				board[y][x] = 0;
				return false;
			}
		}
		board[y][x] = 0;
		return false;
	}

	backtracker(puzzle);
	let count = 0;
	let trial = 5;

	function solver(board: typeof puzzle) {
		let x = 0;
		let y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let i = 1; i <= 9; i++) {
					if (!checkNumber(board, x, y, i)) continue;
					board[y][x] = i;

					if (checkBoard(board)) {
						count += 1;
						break;
					}
					if (solver(board)) return true;
				}
				board[y][x] = 0;
				return false;
			}
		}
		board[y][x] = 0;
		return false;
	}

	while (trial > 0) {
		let x = ~~(Math.random() * 9);
		let y = ~~(Math.random() * 9);

		while (puzzle[y][x] === 0) {
			x = ~~(Math.random() * 9);
			y = ~~(Math.random() * 9);
		}

		let num = puzzle[y][x];
		puzzle[y][x] = 0;

		count = 0;
		solver(JSON.parse(JSON.stringify(puzzle)));

		if (count !== 1) {
			puzzle[y][x] = num;
			trial -= 1;
		}
	}

	return puzzle;
}

export default generate;
