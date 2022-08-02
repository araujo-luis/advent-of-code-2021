import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array: number[] = [];
        let max: number = 0;
        data.split(/\r?\n/).forEach((line) => {
            array.push(...line.split(',').map(q => {
                const num = Number(q);
                if (num > max)
                    max = num;
                return num;
            }));
        });
        return { array, max };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const { array, max } = readFile(path.join(__dirname + '/../../src/day07/input1.txt'));


processPart1(array);
processPart2(array);

function processPart2(array) {
    const factorial = (n: number) => {
        return n * (n + 1) / 2;
    };
    const result: number[] = [];
    for (let i = 0; i < max; i++) {
        let counter = 0;
        for (let j = 0; j < array.length; j++) {
            const diff = Math.abs(array[j] - i);
            counter += factorial(diff);
        }
        result.push(counter);
    }

    console.log(Math.min(...result));
}

function processPart1(array) {
    const result: number[] = [];
    for (let i = 0; i < max; i++) {
        let counter = 0;
        for (let j = 0; j < array.length; j++) {
            const diff = Math.abs(array[j] - i);
            counter += diff;
        }
        result.push(counter);
    }

    console.log(Math.min(...result));
}

