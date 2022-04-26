// https://www.codingame.com/ide/puzzle/the-labyrinth

var inputs = readline().split(' ');
const R = parseInt(inputs[0]); // number of rows.
const C = parseInt(inputs[1]); // number of columns.
const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
let goBack = false;

const getKey = (row, col) => `${row}x${col}`;

const bfs = (map, start, targetVal) => {
    const queue = [];
    const parentForCell = {};

    queue.push(start);

    const getNeighbours = (row, col) => {
        const neighbours = [
            { row: row - 1, col },
            { row, col: col + 1 },
            { row: row + 1, col },
            { row, col: col - 1 },
        ];
    
        return neighbours.filter(({row: nRow, col: nCol}) => {
            return map[nRow][nCol] !== "#";
        });
    };

    const firstStep = (n) => {
        let v = n;
        const startKey = getKey(start.row, start.col);
        while(parentForCell[getKey(v.row, v.col)].key !== startKey) {
            v = { row: parentForCell[getKey(v.row, v.col)].cell[0], col: parentForCell[getKey(v.row, v.col)].cell[1] };
        }
        return v;
    }

    while(queue.length > 0) {
        const { row, col } = queue.shift();
        const currentKey = getKey(row, col);
        const neighbours = getNeighbours(row, col);

        for(let i = 0; i < neighbours.length; i += 1) {
            const { row: nRow, col: nCol } = neighbours[i];
            const nKey = getKey(nRow, nCol);
            const nVal = map[nRow][nCol];

            if(nKey in parentForCell) continue;
            parentForCell[nKey] = { key: currentKey, cell: [row, col] };

            if(nVal === targetVal) return firstStep(neighbours[i]);

            queue.push(neighbours[i]);
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
