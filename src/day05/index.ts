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
    return counter;

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
        let [firstPoint, secondPoint] = array[i];
        if (firstPoint[X_AXIS] === secondPoint[X_AXIS]) {
            let init: number, end: number = 0;
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
            let init: number, end: number = 0;
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
        } else if (Math.abs(firstPoint[X_AXIS] - secondPoint[X_AXIS]) === Math.abs(firstPoint[Y_AXIS] - secondPoint[Y_AXIS])) {
            //A form
            let initX: number, endX: number = 0;
            let temp: number[] = [];
            //console.log('INIT');

            //console.log('should enter', { firstPoint, secondPoint });

            if (firstPoint[X_AXIS] > secondPoint[X_AXIS] && firstPoint[Y_AXIS] > secondPoint[Y_AXIS] || firstPoint[X_AXIS] > secondPoint[X_AXIS] && firstPoint[Y_AXIS] < secondPoint[Y_AXIS]) {
                
                temp = firstPoint;
                firstPoint = secondPoint;
                secondPoint = temp;

            }
            if (firstPoint[X_AXIS] < secondPoint[X_AXIS]) {
                initX = firstPoint[X_AXIS];
                endX = secondPoint[X_AXIS];
            } else {
                endX = firstPoint[X_AXIS]
                initX = secondPoint[X_AXIS]
            }
           
            let isPositive = true;
            if (firstPoint[Y_AXIS] > secondPoint[Y_AXIS]){

                isPositive = false;
                //endX = firstPoint[Y_AXIS]
            }

            let a = firstPoint[Y_AXIS]
            //console.log({ initX, endX, isPositive, a })
            for (let j = initX; j <= endX; j++) {
                
                if (++diagram[j][isPositive ? a++ : a--] === 2) counter++;
                
            }
        }
    }

    //console.table(diagram);
    console.log(counter);
    return counter;

}

processPart1(array, max);
processPart2(array, max);