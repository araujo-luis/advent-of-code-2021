import { count, countReset } from 'console';
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
console.log({ map, string })
const counterMap = new Map<string, number>();
string.split('').forEach((x) => {
    counterMap.set(x, (counterMap.get(x) || 0) + 1)
});

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
    //console.log({ finalString })
    if (counter < runs)
        processPart1(finalString, runs, counter)

    return finalString;

}


console.log(processPart1(string, 10));
const max = Math.max(...counterMap.values());
const min = Math.min(...counterMap.values())
console.log(counterMap, { max, min, result: max - min });