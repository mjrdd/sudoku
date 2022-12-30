# @mjrdd/sudoku

Sudoku puzzle generator and solver.

## Installation

```bash
npm install @mjrdd/sudoku
```

## Usage

```js
import { generate, removeHints, solve } from "@mjrdd/sudoku";

const sudoku = removeHints(generate(), 55);

console.log(sudoku);
// [
// 	[0, 0, 0, 0, 6, 3, 0, 0, 0],
// 	[2, 9, 0, 0, 0, 0, 8, 0, 0],
// 	[0, 3, 0, 0, 8, 0, 4, 0, 7],
// 	[0, 0, 0, 1, 0, 6, 0, 9, 0],
// 	[0, 0, 2, 0, 0, 7, 0, 0, 5],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 1],
// 	[0, 0, 0, 9, 1, 8, 0, 0, 0],
// 	[0, 1, 5, 0, 0, 0, 3, 0, 0],
// 	[8, 4, 0, 0, 2, 0, 0, 0, 0]
// ];

const solution = solve(sudoku);

console.log(solution);
// [
// 	[4, 7, 8, 5, 6, 3, 1, 2, 9],
// 	[2, 9, 6, 7, 4, 1, 8, 5, 3],
// 	[5, 3, 1, 2, 8, 9, 4, 6, 7],
// 	[7, 5, 4, 1, 3, 6, 2, 9, 8],
// 	[1, 8, 2, 4, 9, 7, 6, 3, 5],
// 	[3, 6, 9, 8, 5, 2, 7, 4, 1],
// 	[6, 2, 3, 9, 1, 8, 5, 7, 4],
// 	[9, 1, 5, 6, 7, 4, 3, 8, 2],
// 	[8, 4, 7, 3, 2, 5, 9, 1, 6]
// ];
```

Note: 55 is the number of hints to be removed from the sudoku puzzle. However, there are some cases in which the puzzle can no longer have one unique solution if any more hints are removed.
