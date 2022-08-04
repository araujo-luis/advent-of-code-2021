import fs from 'fs';
import path from 'path';

interface Data {
    first: string[],
    second: string[]
}
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

const { array, width } = readFile(path.join(__dirname + '/../../src/day09/input1.txt'));
const height = array.length;
//console.table(array);
console.log({ height, width });

//let counter = processPart1(array);

function processPart1(array: number[][]) {
    let counter = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const value = array[y][x];
            let up = width;
            let down = width;
            let right = width;
            let left = width;
            if (y > 0)
                up = array[y - 1][x];

            if (y + 1 < height)
                down = array[y + 1][x];

            if (x + 1 < width)
                right = array[y][x + 1];

            if (x > 0) {
                left = array[y][x - 1];
            }
            if (value < up && value < down && value < left && value < right)
                counter = counter + value + 1;


        }

    }
    console.log('Part 1 Result: ', { counter });

    return counter;
}

function processPart2(array: number[][]) {
    const result = []

    let counter = 0;
    const height: number = array.length
    const width: number = array[0].length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const value = array[y][x];
            const { up, down, right, left } = getBasis(y, x, array);

            if (value < up && value < down && value < left && value < right) {
                const basinSet: Set<string> = new Set();
                const basisResultSet = findLargestBasis(y, x, value, array, basinSet);
                result.push(basisResultSet.size + 1);
                counter = counter + value + 1;
            }


        }

    }
    result.sort((a, b) => b - a)
    console.log({ result }, result.length);
    console.log('counter', counter);

    console.log('Part 2 Result: ', result[0] * result[1] * result[2]);

    return result;
}



processPart2(array);



function findLargestBasis(y: number, x: number, value: number, array: number[][], basisResultSet: Set<string>): Set<string> {
    let up = width;
    let down = width;
    let right = width;
    let left = width;
    ({ up, down, right, left } = getBasis(y, x, array));

    const nextValue = value + 1;
    if (up === nextValue && nextValue != 9) {
        basisResultSet.add((y - 1) + '-' + x);
        findLargestBasis(y - 1, x, nextValue, array, basisResultSet);
    }
    if (down === nextValue && nextValue != 9) {
        basisResultSet.add((y + 1) + '-' + x);
        findLargestBasis(y + 1, x, nextValue, array, basisResultSet);
    }
    if (right === nextValue && nextValue != 9) {
        basisResultSet.add(y + '-' + (x + 1));
        findLargestBasis(y, x + 1, nextValue, array, basisResultSet);
    }
    if (left === nextValue && nextValue != 9) {
        basisResultSet.add(y + '-' + (x - 1));
        findLargestBasis(y, x - 1, nextValue, array, basisResultSet);
    }
    return basisResultSet;
}

function getBasis(y: number, x: number, array: number[][]) {
    const width: number = array[0].length;
    let up = width;
    let down = width;
    let right = width;
    let left = width;
    if (y > 0)
        up = array[y - 1][x];

    if (y + 1 < height)
        down = array[y + 1][x];

    if (x + 1 < width)
        right = array[y][x + 1];

    if (x > 0)
        left = array[y][x - 1];

    return { up, down, right, left };
}
