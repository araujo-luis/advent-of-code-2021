import fs from 'fs';
import path from 'path';

try {
    console.log(path.join(__dirname + '/../../src/day02/input1.txt'));
    const data = fs.readFileSync(path.join(__dirname + '/../../src/day02/input1.txt'), 'utf8');

    const array = [];
    data.split(/\r?\n/).forEach(line => {
        array.push(line.split(' '));
    });
    console.log(array);

    // Part 1
    let horizontal: number = 0;
    let depth: number = 0;
    for (let index: number = 0; index < array.length; index++) {
        const command = array[index][0];
        const value = +array[index][1];

        if (command === 'forward') {
            horizontal += value;
        } else if (command === 'down') {
            depth += value
        } else if (command === 'up') {
            depth -= value;
        } else {
            throw new Error('NotImplemented');
        }
    }
    console.log('horizontal', horizontal, 'depth', depth, 'multiply', horizontal * depth);

    // Part 2
    let aim: number = 0;
    let horizontalPosition: number = 0;
    let depthValue: number = 0;
    for (let index: number = 0; index < array.length; index++) {
        const command = array[index][0];
        const value = +array[index][1];

        if (command === 'forward') {
            horizontalPosition += value;
            depthValue += aim * value;
        } else if (command === 'down') {
            aim += value
        } else if (command === 'up') {
            aim -= value;
        } else {
            throw new Error('NotImplemented');
        }
    }
    console.log('horizontal', horizontalPosition, 'depth', depthValue, 'multiply', horizontalPosition * depthValue);


} catch (err) {
    console.error(err);
}