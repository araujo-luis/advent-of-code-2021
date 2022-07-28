import fs from 'fs';
import path from 'path';

try {
    console.log(path.join(__dirname + '/../../src/day03/input1.txt'));
    const data = fs.readFileSync(path.join(__dirname + '/../../src/day03/input1.txt'), 'utf8');

    const array = [];
    data.split(/\r?\n/).forEach(line => {
        array.push(line);
    });
    console.log(array);

    let gamma = '';
    let epsilon = '';
    let oneCounter = 0;
    let zeroCounter = 0;
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < array.length; j++) {
            const char = array[j].charAt(i);
            if (char === '0') zeroCounter++
            else oneCounter++;
            if(i===4){console.log(char)}
        }
        
        if (oneCounter > zeroCounter) { gamma += '1'; epsilon += '0' }
        else { gamma += '0'; epsilon += '1' }
        oneCounter = 0;
        zeroCounter= 0
    }
    console.log('gamma', gamma); // 1174 in decimal
    console.log('epsilon', epsilon); // 2921 in decimal


} catch (err) {
    console.error(err);
}