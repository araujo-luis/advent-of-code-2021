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
const counterCharatets = new Map<string, number>();
string.split('').forEach((x) => {
    counterCharatets.set(x, (counterCharatets.get(x) || 0) + 1)
});


const counterPairs = new Map<string, number>();

for (let i = 0; i < string.length; i++) {
    if (i + 2 > string.length)
        break
    const pair = string.substring(i, i + 2);
    counterPairs.set(pair, (counterPairs.get(pair) || 0) + 1)
}

function processBothParts(stringPairs: Map<string, number>, runs: number, counterCharacterMap: Map<string, number>, counter: number = 0) {
    counter++;

    const newMap = new Map();

    for (let pair of stringPairs.keys()) {
        const value = map.get(pair);
        if (!value)
            continue

        const ocurrences = stringPairs.get(pair);
        counterCharacterMap.set(value, ((counterCharacterMap.get(value) || 0) + 1) + ocurrences - 1);
        const firstNewPair = pair[0] + value;
        const secondNewPair = value + pair[1];

        newMap.set(firstNewPair, ((newMap.get(firstNewPair) || 0) + 1) + ocurrences - 1);
        newMap.set(secondNewPair, ((newMap.get(secondNewPair) || 0) + 1) + ocurrences - 1);
    }

    if (counter < runs) {
        processBothParts(newMap, runs, counterCharacterMap, counter)
    }

    return counterCharacterMap;
}


const resultPart1 = processBothParts(new Map(counterPairs), 10, new Map(counterCharatets));
const resultPart2 = processBothParts(new Map(counterPairs), 40, new Map(counterCharatets));


const maxPart1 = Math.max(...resultPart1.values());
const minPart1 = Math.min(...resultPart1.values())

const maxPart2 = Math.max(...resultPart2.values());
const minPart2 = Math.min(...resultPart2.values())
console.log('Result Part 1', { maxPart1, minPart1, result: maxPart1 - minPart1 });
console.log('Result Part 2', { maxPart2, minPart2, result: maxPart2 - minPart2 });