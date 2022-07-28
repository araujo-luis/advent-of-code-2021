"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
try {
    console.log(path_1.default.join(__dirname + '/../src/day01/input-files/input1.txt'));
    const data = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../src/day01/input-files/input1.txt'), 'utf8');
    const array = [];
    data.split(/\r?\n/).forEach(line => {
        array.push(+line);
    });
    // Part1
    let counter = 0;
    for (let index = 1; index < array.length; index++) {
        if (array[index] > array[index - 1])
            counter++;
    }
    console.log('counter', counter);
    // Part2
    let counter2 = 0;
    const secondArray = [];
    for (let index = 0; index < array.length; index++) {
        const sum = array[index] + array[index + 1] + array[index + 2];
        secondArray.push(sum);
    }
    for (let index = 1; index < secondArray.length; index++) {
        if (secondArray[index] > secondArray[index - 1])
            counter2++;
    }
    console.log('second array', secondArray, counter2);
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=index.js.map