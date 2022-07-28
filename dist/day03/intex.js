"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
try {
    console.log(path_1.default.join(__dirname + '/../../src/day03/input1.txt'));
    const data = fs_1.default.readFileSync(path_1.default.join(__dirname + '/../../src/day03/input1.txt'), 'utf8');
    const array = [];
    data.split(/\r?\n/).forEach(line => {
        array.push(+line);
    });
    console.log(array);
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=intex.js.map