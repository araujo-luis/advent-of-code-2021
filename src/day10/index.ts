import fs from 'fs';
import path from 'path';
class Stack {
    stack: any[];
    constructor(elements: any[] = []) {
        this.stack = elements;
    }

    push(v: any) {
        this.stack.push(v);
    }

    pop(): any {
        return this.stack.pop();
    }

    peek(): string {
        return this.stack[this.stack.length - 1];
    }

    print() {
        console.log(this.stack);
    }

    isEmpty(): boolean {
        return !!this.stack.length;
    }

    size(): number {
        return this.stack.length;
    }

    clear() {
        this.stack.length = 0;
    }

}
function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array: string[][] = [];
        let width = 0;
        data.split(/\r?\n/).forEach((line, idx) => {


            array.push(line.split(''));

        });
        return array;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const array = readFile(path.join(__dirname + '/../../src/day10/input1.txt'));
//console.log(array);

const characters = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}

const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const scoresPart2 = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
}
// [({([[{{
//{([(<[}>{[]{[(<()>
function isOpenCharacter(input: string): boolean {
    return !!characters[input]
}

function isValidCloseCharacter(open: string, close: string): boolean {
    return characters[open] === close;
}

function processPart1(array: string[][]): number {
    let counter: number = 0;

    for (let i = 0; i < array.length; i++) {
        const line = array[i];
        const myStack = new Stack();
        for (let j = 0; j < line.length; j++) {
            const character = line[j];
            if (isOpenCharacter(character)) {
                myStack.push(character);
            } else if (isValidCloseCharacter(myStack.peek(), character)) {
                myStack.pop();
            } else {
                counter += scores[character];
                break;
            }
        }
        //myStack.print();

    }
    console.log('Part 1 result: ', { counter });
    return counter;
}

processPart1(array)

function processPart2(array: string[][]): number {
    const values = [];
    for (let i = 0; i < array.length; i++) {
        let score = 0;
        const line = array[i];
        const myStack = new Stack();
        for (let j = 0; j < line.length; j++) {
            const character = line[j];
            if (isOpenCharacter(character)) {
                myStack.push(character);
            } else if (isValidCloseCharacter(myStack.peek(), character)) {
                myStack.pop();
            } else {
                myStack.clear();
                break;
            }
        }

        const size = myStack.size();
        for (let j = 0; j < size; j++) {
            const character = myStack.pop();
            score = (score * 5) + scoresPart2[character]
        }
        if (size) values.push(score);

    }
    values.sort((a, b)=> a - b );

    console.log('Part 2 result: ', values[Math.floor(values.length / 2)]);
    return 0;
}

processPart2(array)

