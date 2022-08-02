import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const array: number[] = [];

        data.split(/\r?\n/).forEach((line) => {
            array.push(...(line.split(',').map(z => Number(z))));
        });
        return array;
    } catch (err) {
        console.error(err);
        return null;
    }
}

let array = readFile(path.join(__dirname + '/../../src/day06/input1.txt'));


/* 
for (let i = 0; i < 80; i++) {
    let newFishCounter: number = 0;
    for (let j = 0; j < array.length; j++) {
        if (array[j] === 0) {
            array[j] = 6;
            newFishCounter++;
            continue;
        } else {
            array[j]--;
        }

    }
    if (newFishCounter) {
        const newArray = new Array(newFishCounter).fill(8);
        array = [...array, ...newArray]
    }

    //console.log('day', i+1, ':', array);
}

console.log(array.length); 
 */

let init = array.length;


for (let i = 0; i < 21; i++) {
    let newFishCounter: number = 0;
    for (let j = 0; j < array.length; j++) {
        if (array[j] === 0) {
            array[j] = 6;
            newFishCounter++;
            continue;
        } else {
            array[j]--;
        }

    }
    if (newFishCounter) {
        const newArray = new Array(newFishCounter).fill(8);
        array = [...array, ...newArray]
    }

    //console.log('day', i+1, ':', array);
}

console.log(array.length - init); 















const growSchool = (data = [], days = 0) => {
    const fish = Array(9).fill(0)
      .map((_, idx) => data.filter(t => t === idx).length);
  
    Array(days).fill(0).forEach((_, idx) => {
      const newFish = fish.shift();
      fish.push(newFish);
      fish[6] += newFish;
    });
  
    return fish.reduce((a,b) => a + b, 0);
  };