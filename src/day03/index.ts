import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array = [];
        data.split(/\r?\n/).forEach(line => {
            array.push(line);
        });
        return array;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const array = readFile(path.join(__dirname + '/../../src/day03/input1.txt'));
//console.log(array);

// Part 1
processPart1(array);


// Part 2
processPart2(array);

function processPart1(array: string[]) {
    let gamma: string = '';
    let epsilon: string = '';
    let oneCounter: number = 0;
    let zeroCounter: number = 0;
    for (let i: number = 0; i < 12; i++) {
        for (let j = 0; j < array.length; j++) {
            const char: string = array[j].charAt(i);
            if (char === '0')
                zeroCounter++;
            else
                oneCounter++;
        }
        if (oneCounter > zeroCounter) {
            gamma += '1'; epsilon += '0';
        }
        else { gamma += '0'; epsilon += '1'; }
        oneCounter = 0;
        zeroCounter = 0;
    }
    console.log('PART 1');
    console.log('gamma', gamma, 'decimal', parseInt(gamma, 2)); // 1174 in decimal
    console.log('epsilon', epsilon, 'decimal', parseInt(epsilon, 2)); // 2921 in decimal
    console.log('result', parseInt(epsilon, 2) * parseInt(gamma, 2));
}



function processPart2(array: string[]) {
    const result1 = loopArray(array, 0);
    const result2 = loopArray2(array, 0);
    console.log('\n', 'PART 2');
    console.log('result', result1, parseInt(result1, 2));

    console.log('result2', result2, parseInt(result2, 2));
    console.log('result', parseInt(result2, 2) * parseInt(result1, 2));
}


function loopArray(array: string[], i: number) {
    const zeroArray: string[] = [];
    const oneArray: string[] = [];
    for (let j = 0; j < array.length; j++) {
        const char = array[j].charAt(i);
        if (char === '0')
            zeroArray.push(array[j]);
        else
            oneArray.push(array[j]);
    }
    if (oneArray.length === zeroArray.length) {
        if (oneArray.length > 1) {
            return loopArray(oneArray, ++i);
        }

        if (oneArray[0].charAt(i) === '1') {
            return oneArray[0];
        } else {
            return zeroArray[0];
        }

    } else if (oneArray.length > zeroArray.length) {
        return loopArray(oneArray, ++i);
    } else {
        return loopArray(zeroArray, ++i);
    }
}


function loopArray2(array: string[], i: number) {
    const zeroArray: string[] = [];
    const oneArray: string[] = [];
    for (let j = 0; j < array.length; j++) {
        const char = array[j].charAt(i);
        if (char === '0')
            zeroArray.push(array[j]);
        else
            oneArray.push(array[j]);
    }
    if (oneArray.length === zeroArray.length) {
        if (zeroArray.length > 1) {
            return loopArray2(zeroArray, ++i);
        }
        if (oneArray[0].charAt(i) === '0') {
            return oneArray[0];
        } else {
            return zeroArray[0];
        }

    }
    else if (oneArray.length < zeroArray.length && oneArray.length > 0) {
        return loopArray2(oneArray, ++i);
    } if (oneArray.length > zeroArray.length && zeroArray.length > 0) {
        return loopArray2(zeroArray, ++i);
    } else if (zeroArray.length === 0 && oneArray.length === 1) {
        return oneArray[0]
    } else {
        return zeroArray[0];
    }
}
