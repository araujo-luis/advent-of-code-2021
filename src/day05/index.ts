import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array: number[][][] = [];
        let max: number = 0;
        data.split(/\r?\n/).forEach((line) => {
            array.push(line.split(' -> ').map(x => x.split(',').map(q => Number(q))).map(x => {
                if (x[0] > max)
                    max = x[0];
                if (x[1] > max)
                    max = x[1]
                return x.reverse()
            }));
        });
        return { array, max };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const { array, max } = readFile(path.join(__dirname + '/../../src/day05/input1.txt'));
//console.table(array);
function processPart1(array: number[][][], max: number) {

    const diagram: number[][] = [];
    //new Array(max + 1).fill(new Array(max + 1).fill(0)); for a reason this does not work

    for (let i = 0; i < max + 1; i++) {
        diagram.push([]);
        for (let j = 0; j < max + 1; j++) {
            diagram[i][j] = 0;

        }

    }
    //console.log(diagram[9][0])

    const X_AXIS = 0;
    const Y_AXIS = 1;
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        const [firstPoint, secondPoint] = array[i];
        if (firstPoint[X_AXIS] === secondPoint[X_AXIS]) {
            let init, end = 0;
            if (firstPoint[Y_AXIS] > secondPoint[Y_AXIS]) {
                end = firstPoint[Y_AXIS];
                init = secondPoint[Y_AXIS];
            } else {
                init = firstPoint[Y_AXIS];
                end = secondPoint[Y_AXIS];
            }
            for (let j = init; j <= end; j++) {
                if (++diagram[firstPoint[X_AXIS]][j] === 2) counter++
            }
        } else if (firstPoint[Y_AXIS] === secondPoint[Y_AXIS]) {
            let init, end = 0;
            if (firstPoint[X_AXIS] > secondPoint[X_AXIS]) {
                end = firstPoint[X_AXIS];
                init = secondPoint[X_AXIS];
            } else {
                init = firstPoint[X_AXIS];
                end = secondPoint[X_AXIS];
            }
            for (let j = init; j <= end; j++) {
                if (++diagram[j][firstPoint[Y_AXIS]] === 2) counter++;
            }
        }
    }

    //console.table(diagram);
    console.log(counter);

}
function processPart2(array: number[][][], max: number) {

    const diagram: number[][] = [];
    //new Array(max + 1).fill(new Array(max + 1).fill(0)); for a reason this does not work

    for (let i = 0; i < max + 1; i++) {
        diagram.push([]);
        for (let j = 0; j < max + 1; j++) {
            diagram[i][j] = 0;

        }

    }
    //console.log(diagram[9][0])

    const X_AXIS = 0;
    const Y_AXIS = 1;
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        const [firstPoint, secondPoint] = array[i];
        if (firstPoint[X_AXIS] === secondPoint[X_AXIS]) {
            let init, end = 0;
            if (firstPoint[Y_AXIS] > secondPoint[Y_AXIS]) {
                end = firstPoint[Y_AXIS];
                init = secondPoint[Y_AXIS];
            } else {
                init = firstPoint[Y_AXIS];
                end = secondPoint[Y_AXIS];
            }
            for (let j = init; j <= end; j++) {
                if (++diagram[firstPoint[X_AXIS]][j] === 2) counter++
            }
        } else if (firstPoint[Y_AXIS] === secondPoint[Y_AXIS]) {
            let init, end = 0;
            if (firstPoint[X_AXIS] > secondPoint[X_AXIS]) {
                end = firstPoint[X_AXIS];
                init = secondPoint[X_AXIS];
            } else {
                init = firstPoint[X_AXIS];
                end = secondPoint[X_AXIS];
            }
            for (let j = init; j <= end; j++) {
                if (++diagram[j][firstPoint[Y_AXIS]] === 2) counter++;
            }
        }
    }

    //console.table(diagram);
    console.log(counter);

}

//processPart1(array, max);
processPart2(array, max);