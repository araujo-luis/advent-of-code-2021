"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
try {
    console.log(path_1.default.join(__dirname + '/../../src/day02/input1.txt'));
    const data = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../../src/day02/input1.txt'), 'utf8');
    const array = [];
    data.split(/\r?\n/).forEach(line => {
        array.push(line.split(' '));
    });
    console.log(array);
    // Part 1
    let horizontal = 0;
    let depth = 0;
    for (let index = 0; index < array.length; index++) {
        const command = array[index][0];
        const value = +array[index][1];
        if (command === 'forward') {
            horizontal += value;
        }
        else if (command === 'down') {
            depth += value;
        }
        else if (command === 'up') {
            depth -= value;
        }
        else {
            throw new Error('NotImplemented');
        }
    }
    console.log('horizontal', horizontal, 'depth', depth, 'multiply', horizontal * depth);
    // Part 2
    let aim = 0;
    let horizontalPosition = 0;
    let depthValue = 0;
    for (let index = 0; index < array.length; index++) {
        const command = array[index][0];
        const value = +array[index][1];
        if (command === 'forward') {
            horizontalPosition += value;
            depthValue += aim * value;
        }
        else if (command === 'down') {
            aim += value;
        }
        else if (command === 'up') {
            aim -= value;
        }
        else {
            throw new Error('NotImplemented');
        }
    }
    console.log('horizontal', horizontalPosition, 'depth', depthValue, 'multiply', horizontalPosition * depthValue);
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=index.js.map