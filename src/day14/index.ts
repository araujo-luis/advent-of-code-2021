import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');
        let string = '';
        const map: Map<string, string> = new Map();
        data.split(/\r?\n/).forEach((line, idx) => {
            if (idx === 0) {
                string = line
                return
            }
            if (line === '')
                return


            const [key, value] = line.split(' -> ')
            map.set(key, value)

        });
        return { map, string };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const { map, string } = readFile(path.join(__dirname + '/../../src/day14/input1.txt'));
//console.log({ map, string })
const counterMap = new Map<string, number>();


const counterPairs = new Map<string, number>();
string.split('').forEach((x) => {
    counterMap.set(x, (counterMap.get(x) || 0) + 1)
});
for (let i = 0; i < string.length; i++) {
    if (i + 2 > string.length)
        break
    const pair = string.substring(i, i + 2);
    counterPairs.set(pair, (counterPairs.get(pair) || 0) + 1)
}


function processPart1(string: string, runs: number, counter: number = 0) {
    counter++;
    const stringAsArray = string.split('');
    //console.log({ stringAsArray });
    let finalString = '';

    for (let j = 0; j < stringAsArray.length; j++) {
        if (j + 1 >= stringAsArray.length)
            break;
        const code = stringAsArray[j] + stringAsArray[j + 1];
        const value = map.get(code);
        if (value) {
            finalString += value + stringAsArray[j + 1];
            counterMap.set(value, (counterMap.get(value) || 0) + 1)
        }
        else
            finalString += stringAsArray[j] + stringAsArray[j + 1];
    }
    finalString = stringAsArray[0] + finalString;
    console.log({ finalString })
    if (counter < runs)
        processPart1(finalString, runs, counter)

    return finalString;

}


function processPart2(stringPairs: Map<string, number>, runs: number, counter: number = 0) {
    counter++;

    const newMap = new Map();
    //console.log({ newMap, stringPairs });

    for (let pair of stringPairs.keys()) {
        const value = map.get(pair);
        if (!value)
            continue

        counterMap.set(value, ((counterMap.get(value) || 0) + 1)
            + stringPairs.get(pair) - 1);
        const firstNewPair = pair[0] + value;
        const secondNewPair = value + pair[1];

        newMap.set(firstNewPair, ((newMap.get(firstNewPair) || 0) + 1) + stringPairs.get(pair) - 1);
        newMap.set(secondNewPair, ((newMap.get(secondNewPair) || 0) + 1) + stringPairs.get(pair) - 1);
    }

    if (counter < runs) {
        console.log({ counter });

        processPart2(newMap, runs, counter)
    }

    return newMap;
}

console.log({ counterPairs })
console.log('resutl', processPart2(counterPairs, 40));


const max = Math.max(...counterMap.values());
const min = Math.min(...counterMap.values())
console.log(counterMap, { max, min, result: max - min });