// https://www.codingame.com/ide/puzzle/the-labyrinth

var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.

let goBack = false; // Tells us if we should head back to the starting point

// Helper function for our parent hash
const getKey = (row, col) => `${row}x${col}`;

// Get the position neighbours (Top, right, bottom, left)
const getNeighbours = (map, row, col, invalidSymbols) => {
    const neighbours = [
        { row: row - 1, col },
        { row, col: col + 1 },
        { row: row + 1, col },
        { row, col: col - 1 },
    ];

    // Filter any unwanted neighbour
    return neighbours.filter(({row: nRow, col: nCol}) => !invalidSymbols.includes(map[nRow][nCol]));
};

// BFS algorithm
const bfs = (map, start, targetVal) => {
    // Initial setup
    const queue = [];
    const parentForCell = {};

    queue.push(start);

    // We will get the first/next parent we should visit to get to our target
    const firstStep = (n) => {
        let v = n;
        const startKey = getKey(start.row, start.col);
        while(parentForCell[getKey(v.row, v.col)].key !== startKey) {
            v = { row: parentForCell[getKey(v.row, v.col)].cell[0], col: parentForCell[getKey(v.row, v.col)].cell[1] };
        }
        return v;
    }

    // While we have elements in the queue
    while(queue.length > 0) {
        const { row, col } = queue.shift();                     // Get first element in queue
        const currentKey = getKey(row, col);                    // Create key
        const neighbours = getNeighbours(map, row, col, ["#"]); // Get current cell neighbours

        for(let i = 0; i < neighbours.length; i += 1) {
            const { row: nRow, col: nCol } = neighbours[i];
            const nKey = getKey(nRow, nCol);
            const nVal = map[nRow][nCol];

            if(nKey in parentForCell) continue;                     // If we already have the cell in our parents hash, skip
            parentForCell[nKey] = { key: currentKey, cell: [row, col] };

            if(nVal === targetVal) return firstStep(neighbours[i]); // If the current cell value is our target, get the first step and return it

            queue.push(neighbours[i]);                              // Add this neighbour to the queue
        } 
    }
}

const getPath = (map, start, goBack) => {
    if(goBack) return bfs(map, start, "T");
    else return bfs(map, start, "?") || bfs(map, start, "C");
}

// game loop
while (true) {
    var inputs = readline().split(' ');
    const KR = parseInt(inputs[0]); // row where Rick is located.
    const KC = parseInt(inputs[1]); // column where Rick is located.
    const currentMap = [];

    for (let i = 0; i < R; i++) {
        const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
        currentMap.push([...ROW.split("")]);
    }

    // console.error(currentMap.map((r) => r.join("")));

    if(currentMap[KR][KC] === "C") goBack = true;

    const nextStep = getPath(currentMap, { row: KR, col: KC }, goBack);

    console.error("Next step", nextStep);

    if(nextStep.row > KR) console.log("DOWN");
    else if(nextStep.row < KR) console.log("UP");
    else if(nextStep.col > KC) console.log("RIGHT");
    else console.log("LEFT");

}
