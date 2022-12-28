# @mjrdd/sudoku

Sudoku puzzle generator and solver.

## Installation

```bash
npm install @mjrdd/sudoku
```

## Usage

```js
import { generateSudoku, removeHints } from "@mjrdd/sudoku";

const sudoku = generateSudoku();
removeHints(sudoku, 35);

console.log(sudoku);
// [
//   [0,0,0,0,0,8,3,5,9],
//   [5,7,0,0,0,0,1,8,6],
//   [9,0,0,0,1,0,4,7,2],
//   [0,9,3,6,0,1,0,4,0],
//   [6,4,0,3,2,7,8,9,1],
//   [1,0,0,9,4,0,2,0,3],
//   [7,0,9,8,0,0,0,1,5],
//   [0,6,1,0,0,0,0,3,4],
//   [3,5,4,0,0,9,7,0,0]
// ]
```
