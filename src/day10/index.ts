import fs from 'fs';
import path from 'path';
class Stack {
    stack: any[];
    constructor(elements: any[] = []) {
        this.stack = elements || [];
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
        console.table(this.stack);
    }

    isEmpty(): boolean {
        return !!this.stack.length;
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
// [({([[{{
//{([(<[}>{[]{[(<()>
let counter: number = 0;
function isOpenCharacter(input: string): boolean {
    return !!characters[input]
}

function isValidCloseCharacter(open: string, close: string): boolean {
    return characters[open] === close;
}

function processPart1(array: string[][]): number {

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


//[({(<(())[]>[[{[]{<()<>>



