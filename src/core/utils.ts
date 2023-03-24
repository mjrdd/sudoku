export function validateBoard(board: number[][]) {
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (board[y][x] === 0) return false;
		}
	}
	return true;
}

export function validateNumber(board: number[][], x: number, y: number, num: number) {
	for (let i = 0; i < 9; i++) {
		if (board[y][i] === num) return false;
		if (board[i][x] === num) return false;
	}

	const dx = ~~(x / 3) * 3;
	const dy = ~~(y / 3) * 3;

	for (let j = dy; j < dy + 3; j++) {
		for (let i = dx; i < dx + 3; i++) {
			if (board[j][i] === num) return false;
		}
	}

	return true;
}

export function generateCoords() {
	const coords = [] as { x: number; y: number }[];

	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			coords.push({ x, y });
		}
	}
	return coords;
}

export function shuffleArray<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = ~~(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}