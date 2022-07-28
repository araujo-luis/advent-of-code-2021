import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array: number[][] = [];
        const boards: number[][][] = [];
        const numbers: number[] = [];
        data.split(/\r?\n/).forEach((line, index) => {
            if (index === 0)
                return numbers.push(...(line.split(',').map(x => Number(x))));
            if (index === 1)
                return
            if (!line && index > 1) {
                boards.push([...array]);
                array.length = 0
                return;
            }
            array.push(line.split(' ').filter(x => x != '').map(x => Number(x)));
        });
        return { numbers, boards };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const { numbers, boards } = readFile(path.join(__dirname + '/../../src/day04/input1.txt'));
//console.log(boards);
/* 
let bingoBoard: number = -1;
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    const { boards: newBoards, isBingo, bingoBoard } = callNumber(number, boards);
    if (isBingo) {
        console.log("BINGO!!", bingoBoard);

        console.log('boards', newBoards);
        let counter: number = 0;
        for (let j = 0; j < newBoards[bingoBoard].length; j++) {
            const row = newBoards[bingoBoard][j];
            row.forEach(x => {
                if (x === -1) { return }
                else { counter += x }
            })

        }
        console.log('counter', counter, 'bingo number', number, 'result', counter * number)

        break;
    }

}

function callNumber(number: number, boards: number[][][]) {
    let isRowBingo: boolean = false;
    let isColumnBingo: boolean = false;
    let bingoBoard: number = -1;
    for (let j = 0; j < boards.length; j++) {
        const board = boards[j];
        for (let k = 0; k < board.length; k++) {
            const row = board[k];
            const idx = row.indexOf(number);
            if (idx !== -1) {
                row[idx] = -1;
                isRowBingo = row.every(x => x === row[0]);
                if (isRowBingo) { bingoBoard = j; break }
                let counter = 0;
                for (let l = 0; l < 5; l++) {
                    const element = board[l][idx];
                    if (element === -1) counter++
                }
                if (counter === 5) {
                    isColumnBingo = true;
                    bingoBoard = j;
                    break;
                };
            }
        }
        if (isRowBingo || isColumnBingo) break;
    }
    return { boards, isBingo: isRowBingo || isColumnBingo, bingoBoard };
}

 */



let bingoBoard: Set<number> = new Set();
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];

    const { boards: newBoards, newBingoBoard, winnerNumber } = callNumber(number, boards, bingoBoard);
    if (bingoBoard.size === boards.length) {
        const lastValue = Array.from(newBingoBoard).pop();

        //console.log("BINGO!!", bingoBoard);
        let counter: number = 0;
        for (let j = 0; j < newBoards[lastValue].length; j++) {
            const row = newBoards[lastValue][j];
            row.forEach(x => {
                if (x === -1) { return }
                else { counter += x }
            });
        }
        console.log('counter', counter, 'bingo number', number, 'result', counter * number)

        break;
    }

}


function callNumber(calledNumber: number, boards: number[][][], bingoBoard: Set<number>) {
    let isRowBingo: boolean = false;
    let isColumnBingo: boolean = false;
    let winnerNumber: number = -1;
    for (let j = 0; j < boards.length; j++) {
        const board = boards[j];
        for (let k = 0; k < board.length; k++) {
           
            const row = board[k];
            const idx = row.indexOf(calledNumber);
            if (idx !== -1) {
                row[idx] = -1;
                isRowBingo = row.every(x => x === row[0]);
                if (isRowBingo) {
                    bingoBoard.add(j);
                    if (bingoBoard.size === boards.length) {
                        
                        winnerNumber = calledNumber;
                        break;
                    };
                }
                let counter = 0;
                for (let l = 0; l < 5; l++) {
                    const element = board[l][idx];
                    if (element === -1) counter++
                }
                if (counter === 5) {
                    isColumnBingo = true;
                    bingoBoard.add(j);
                    if (bingoBoard.size === boards.length) {
                        winnerNumber = calledNumber;
                        break
                    };
                };
            }
        }
        if (bingoBoard.size === boards.length) break;
    }
    return { boards, newBingoBoard: bingoBoard, winnerNumber };
}

