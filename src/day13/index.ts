import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array: number[][] = [];
        let maxX = 0;
        let maxY = 0;
        const folds: string[][] = []
        data.split(/\r?\n/).forEach((line, idx) => {

            if (line === '')
                return

            if (line.includes('fold along ')) {
                const [axis, value] = line.split('fold along ')[1].split('=');
                folds.push([axis, value]);
                return;
            }
            const [x, y] = line.split(',').map(x => Number(x));
            if (x > maxX)
                maxX = x

            if (y > maxY)
                maxY = y

            array.push([x, y]);

        });
        return { array, maxX, maxY, folds };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const { array, maxX, maxY, folds } = readFile(path.join(__dirname + '/../../src/day13/input1.txt'));
console.log({ maxX, maxY, folds })

function formMatrix(array: number[][], maxX: number, maxY: number): string[][] {
    const matrix: string[][] = []
    for (let i = 0; i < maxY + 1; i++) {
        matrix.push([]);
        for (let j = 0; j < maxX + 1; j++) {
            matrix[i][j] = '';
        }
    }

    for (let i = 0; i < array.length; i++) {
        const [x, y] = array[i];
        matrix[y][x] = '#'
    }


    return matrix;

}

function foldY(array: string[][], foldY: number) {
    for (let y = array.length - foldY - 1; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            const element = array[y][x];
            if (element === '#') {
                const diff = ((y - foldY) * 2) || 1;
                array[y - diff][x] = '#'
            }
        }
    }

    return array.splice(0, foldY);
}
function foldX(array: string[][], foldX: number) {
    for (let y = 0; y < array.length; y++) {

        for (let x = array[0].length - foldX - 1; x < array[0].length; x++) {
            const element = array[y][x];
            if (element === '#') {
                const diff = ((x - foldX) * 2) || 1;
                array[y][x - diff] = '#'
            }
        }
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].splice(0, foldX);

    }
    return array;
}

function count(array: string[][]) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === '#')
                counter++;
        }
    }
    return counter;
}

let matrix = formMatrix(array, maxX, maxY);
//console.table(matrix);
for (let i = 0; i < folds.length; i++) {
    const [position, value] = folds[i];
    if (position === 'y') {
        matrix = foldY(matrix, Number(value))
    } else {
        matrix = foldX(matrix, Number(value))
    }
}
console.table(matrix);
console.log(count(matrix));
/* const folded = foldY(matrix, 7);

console.table(folded);
const folded2 = foldX(folded, 5);
console.table(folded2);
 */
