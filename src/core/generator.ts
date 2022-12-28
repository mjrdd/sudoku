import { validateBoard, validateNumber, shuffleArray } from "./utils";

function generateSudoku() {
	const sudoku: number[][] = [];

	for (let y = 0; y < 9; y++) {
		sudoku[y] = [];

		for (let x = 0; x < 9; x++) {
			sudoku[y][x] = 0;
		}
	}

	const backtracker = (board: typeof sudoku) => {
		let x = 0;
		let y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (const num of shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
					if (!validateNumber(board, x, y, num)) continue;
					board[y][x] = num;

					if (validateBoard(board)) return true;
					if (backtracker(board)) return true;
				}
				board[y][x] = 0;
				return false;
			}
		}
		board[y][x] = 0;
		return false;
	};

	backtracker(sudoku);
	return sudoku;
}

function removeHints(sudoku: number[][], count: number) {
	let solutions = 0;

	const solver = (board: typeof sudoku) => {
		let x = 0;
		let y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let i = 1; i <= 9; i++) {
					if (!validateNumber(board, x, y, i)) continue;
					board[y][x] = i;

					if (validateBoard(board)) {
						solutions += 1;
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
	};

	while (count > 0) {
		let x = ~~(Math.random() * 9);
		let y = ~~(Math.random() * 9);

		while (sudoku[y][x] === 0) {
			x = ~~(Math.random() * 9);
			y = ~~(Math.random() * 9);
		}

		const num = sudoku[y][x];
		sudoku[y][x] = 0;

		solutions = 0;
		solver(JSON.parse(JSON.stringify(sudoku)));

		if (solutions !== 1) {
			sudoku[y][x] = num;
		} else {
			count -= 1;
		}
	}

	return sudoku;
}

export { generateSudoku, removeHints };
