import fs from 'fs';
import path from 'path';

function readFile(filePath: string) {
    try {
        console.log(filePath);
        const data = fs.readFileSync(filePath, 'utf8');

        const map: Map<string, string[]> = new Map();
        const uniqueElemets: Map<string, boolean> = new Map();
        let width = 0;
        data.split(/\r?\n/).forEach((line, idx) => {
            const [parent, child] = line.split('-');
            uniqueElemets.set(parent, true)
            uniqueElemets.set(child, true)
            const possibleParent = map.get(parent);
            map.set(parent, possibleParent ? [...possibleParent, child] : [child]);

        });
        return { map, uniqueElemets };
    } catch (err) {
        console.error(err);
        return null;
    }
}

const { map, uniqueElemets } = readFile(path.join(__dirname + '/../../src/day12/input1.txt'));
console.log(map, uniqueElemets);

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

class Graph {
    #nodes: Map<string, string[]>;
    #routes: Map<string, boolean>;


    constructor() {
        this.#nodes = new Map<string, string[]>();
        this.#routes = new Map();
    }
    addNode(name: string) {
        this.#nodes.set(name, []);
    }

    addEdge(source: string, destination: string) {

        if (!this.#nodes.get(source) || !this.#nodes.get(destination))
            return false;

        this.#nodes.get(source).push(destination);
        this.#nodes.get(destination).push(source);
    }

    print() {
        console.log(this.#nodes);
    }


    /* 
    
    Map(7) {
        'dc' => [ 'end', 'start', 'HN', 'LN', 'kj' ],
        'end' => [ 'dc', 'HN' ],
        'HN' => [ 'dc', 'start', 'end', 'kj' ],
        'start' => [ 'dc', 'HN', 'kj' ],
        'kj' => [ 'start', 'sa', 'HN', 'dc' ],
        'LN' => [ 'dc' ],
        'sa' => [ 'kj' ]
      } */
    findRoutes(source: string, destination: string, visitedNodes = new Set()) {
        if (source.toLowerCase() === source)
            visitedNodes.add(source);
        
        const nodes = this.#nodes.get(source);

        if (nodes.includes(destination) && !visitedNodes.has(destination)) {
            visitedNodes.add(destination);
            
            this.#routes.set(Array.from(visitedNodes).join(','), true);
            console.log('route', Array.from(this.#routes.keys()));
            visitedNodes.delete(destination)
        }
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (visitedNodes.has(node) || node === 'end') {
                continue
            };
            visitedNodes.delete('end')
            console.log('visited', source, node, Array.from(visitedNodes));
            //console.log('visited', node, this.#nodes.get(node));
            
            this.findRoutes(node, destination, visitedNodes);
        }


    }
    printRoutes() {
        console.log('ROUTES', this.#routes);
    }
}

const graph = new Graph();

for (const [key] of uniqueElemets) {
    graph.addNode(key);
}

for (const [key, children] of map) {
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        graph.addEdge(key, element);
    }
}

graph.print();
graph.findRoutes('start', 'end');
graph.printRoutes();

