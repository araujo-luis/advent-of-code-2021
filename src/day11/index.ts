import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array: number[][] = [];
        let width = 0;
        data.split(/\r?\n/).forEach((line, idx) => {
            const numbers = line.split('').map(x => Number(x));
            width = numbers.length;
            array.push(numbers);

        });
        return { array, width };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const { array, width } = readFile(path.join(__dirname + '/../../src/day11/input1.txt'));
const height = array.length;
//console.table(array);

//console.log({ height, width })


function processPart1(array: number[][], runs: number = 1) {
    let notUpdate = new Set<string>();
    let flashes: number = 0;

    for (let m = 0; m < runs; m++) {
        notUpdate = new Set<string>();
        for (let row = 0; row < width; row++) {
            for (let col = 0; col < height; col++) {
                if (array[row][col] === 9) {
                    array[row][col] = 0;
                    notUpdate.add(row + '-' + col);
                    flashes++;
                    // console.log('custom log', { row, col })
                    ({ notUpdate, flashes } = turnOnLights(row, col, array, notUpdate, flashes));
                }
                else if (notUpdate.has(row + '-' + col))
                    continue
                else
                    array[row][col]++;
            }
        }
    }

    // console.table(array);
    console.log('Part1 result', { flashes });

}

function turnOnLights(row: number, col: number, array: number[][], notUpdate: Set<string>, flashes: number) {
    // console.log('called');

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (!(i >= 0 && i < array[0].length && j >= 0 && j < array.length) || row === i && col === j || notUpdate.has(i + '-' + j)) {
                continue;
            }
            //console.log('recursion', { row: i, col: j });
            if (array[i][j] === 9) {
                array[i][j] = 0;
                notUpdate.add(i + '-' + j);
                flashes++;
                ({ notUpdate, flashes } = turnOnLights(i, j, array, notUpdate, flashes));
            } else
                array[i][j]++;

        }
    }
    return { notUpdate, flashes };
}


processPart1(array, 100)