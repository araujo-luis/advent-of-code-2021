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

        const array: Data[] = [];
        let max: number = 0;
        data.split(/\r?\n/).forEach((line) => {
            const [first, second] = line.split(' | ');
            const obj: Data = {
                first: [],
                second: []
            };
            obj.first = first.split(' ');
            obj.second = second.split(' ');
            array.push(obj);

        });
        return array;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const array = readFile(path.join(__dirname + '/../../src/day08/input1.txt'));

//console.log('array', array);

processPart1(array);

function processPart1(array: Data[]) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        const { second } = array[i];
        for (let j = 0; j < second.length; j++) {
            if (second[j].length === 2 || second[j].length === 4 || second[j].length === 3 || second[j].length === 7)
                counter++;
        }

    }
    console.log('counter of 1,4,7 or 8 digits: ', counter);
    return counter;
}


const checkNotPresent = (segments: Set<string>[], value: string): Set<string | any> => {
    return value.split('').reduce((acc, character) => {
        if (!segments.find(x => x.has(character))) {
            acc.add(character)
        };
        return acc;
    }, new Set());
};

const checkNotPresentArray = (segments: Set<string>[], value: string): string[] => {
    return value.split('').reduce((acc, character) => {
        if (!segments.find(x => x.has(character))) {
            acc.push(character)
        };
        return acc;
    }, []);
};
let finalResult = 0;
for (let i = 0; i < array.length; i++) {
    let sevenSegments = new Array(7).fill(new Set());

    const { first, second } = array[i];

    first.sort((a, b) => a.length - b.length);
    let dArray = [];
    let cArray = [];

    let counter = {};
    for (let j = 0; j < 10; j++) {
        if (first[j].length === 2) {
            sevenSegments[2] = new Set(Array.from([first[j].charAt(0), first[j].charAt(1)])); // c
            sevenSegments[5] = new Set(Array.from([first[j].charAt(0), first[j].charAt(1)])); // f
            cArray = Array.from(sevenSegments[2]);
        }
        else if (first[j].length === 3) {
            sevenSegments[0] = checkNotPresent(sevenSegments, first[j]);
        }
        else if (first[j].length === 4) {
            const elements = checkNotPresent(sevenSegments, first[j]);
            sevenSegments[1] = new Set(Array.from(elements)); // b
            sevenSegments[3] = new Set(Array.from(elements));; // d
            dArray = Array.from(sevenSegments[3]);
        } else if (first[j].length === 5) {

            const elements = checkNotPresentArray(sevenSegments, first[j]);

            if (elements[1])
                counter[elements[1]] = !counter[elements[1]] ? 1 : counter[elements[1]] + 1;

            counter[elements[0]] = !counter[elements[0]] ? 1 : counter[elements[0]] + 1;

            const myAcc: number[] = Object.values(counter);
            const myKeys = Object.keys(counter);
            if (myAcc.reduce((a: number, b: number) => a + b, 0) === 4) {

                sevenSegments[6] = new Set(counter[myKeys[0]] === 3 ? myKeys[0] : myKeys[1]); // g
                sevenSegments[4] = new Set(counter[myKeys[0]] === 1 ? myKeys[0] : myKeys[1]); // e
            }
        } else if (first[j].length === 6) {
            
            const notFoundD = dArray.find(a => !(first[j].indexOf(a) + 1));
            const notFoundC = cArray.find(a => !(first[j].indexOf(a) + 1));
            if (notFoundD) {
                sevenSegments[1].delete(notFoundD);
                sevenSegments[3] = new Set([Array.from(sevenSegments[3]).find((a: string) => a === notFoundD)]);
            }

            if (notFoundC) {
                sevenSegments[5].delete(notFoundC);
                sevenSegments[2] = new Set([Array.from(sevenSegments[2]).find((a: string) => a === notFoundC)]);
            }

        }
    }

    const sevenSegmentsMap = {}
    for (let y = 0; y < sevenSegments.length; y++) {
        const element: any = Array.from(sevenSegments[y])[0];
        sevenSegmentsMap[element] = String.fromCharCode(97 + y)
    }

    type DataNum = {
        [key: number]: string
    };
    type Data = {
        [key: number]: DataNum
    }

    const numbers: Data = {
        5: {
            2: 'acdeg',
            3: 'acdfg',
            5: 'abdfg',
        },
        6: {
            0: 'abcefg',
            6: 'abdefg',
            9: 'abcdfg'
        }
    }


    let result = '';
    
    for (let k = 0; k < second.length; k++) {
        if (second[k].length === 2)
            result += '1'
        else if (second[k].length === 3)
            result += '7'
        else if (second[k].length === 4)
            result += '4'
        else if (second[k].length === 7)
            result += '8'
        else {
            
            const converted = second[k].split('').map(x => sevenSegmentsMap[x]).join('');
            for (const [key, value] of Object.entries(numbers[second[k].length.toString()])) {
                if (value.toString().split('').every(a => (converted.indexOf(a) + 1))) {

                    result += key + ''
                    break;
                }
            }
        }

    }
    finalResult += Number(result);

}
console.log('MY RESULT', finalResult);


