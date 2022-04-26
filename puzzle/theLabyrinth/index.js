// https://www.codingame.com/ide/puzzle/the-labyrinth

 var inputs = readline().split(' ');
 const R = parseInt(inputs[0]); // number of rows.
 const C = parseInt(inputs[1]); // number of columns.
 const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
 let goBack = false;
 let T;
 
 const getKey = (row, col) => `${row}x${col}`;
 
 const bfs = (map, start, targetVal) => {
     const queue = [];
     const parentForCell = {};
     let targetCell;
     const startKey = getKey(start.row, start.col);
 
     queue.push(start);
 
     const getNeighbours = (row, col) => {
         const neighbours = [
             { row: row - 1, col },
             { row, col: col + 1 },
             { row: row + 1, col },
             { row, col: col - 1 },
         ];
     
         return neighbours.filter(({row: nRow, col: nCol}) => {
             return nRow < 0 || nRow > R - 1 || nCol < 0 || nCol > C - 1 || map[nRow][nCol] !== "#"
         });
     };
 
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
 
             if(nVal === targetVal) {
                 console.error(nVal);
                 targetCell = { key: nKey, cell: [nRow, nCol], val: nVal }
                 break;
             }
 
             queue.push(neighbours[i]);
         }
     }
 
     if(targetCell) {
         const path = [];
         let currentCell = targetCell.cell;
         let currentKey = targetCell.key;
         while (currentKey !== startKey) {
             path.push(currentCell);
             const {key, cell} = parentForCell[currentKey];
             currentCell = cell;
             currentKey = key;
         }
     
         return path.reverse()[0];
     }
 
 }
 
 const getPath = (map, start, goBack) => {
     let goTo;
     console.error("goBack", goBack);
     if(goBack) goTo = bfs(map, start, "T");
     else goTo = bfs(map, start, "?") || bfs(map, start, "C");
     
     return goTo;
 }
 
 // game loop
 while (true) {
     var inputs = readline().split(' ');
     const KR = parseInt(inputs[0]); // row where Rick is located.
     const KC = parseInt(inputs[1]); // column where Rick is located.
     const currentMap = [];
 
     console.error("Current position", [KR, KC]);
 
     for (let i = 0; i < R; i++) {
         const ROW = readline(); // C of the characters in '#.TC?' (i.e. one line of the ASCII maze).
         currentMap.push([...ROW.split("")]);
     }
 
     console.error(currentMap.map((r) => r.join("")));
 
     if(currentMap[KR][KC] === "C") goBack = true;
 
     const nextStep = getPath(currentMap, { row: KR, col: KC }, goBack);
 
     console.error("Next step", nextStep);
 
     if(nextStep[0] > KR) console.log("DOWN");
     else if(nextStep[0] < KR) console.log("UP");
     else if(nextStep[1] > KC) console.log("RIGHT");
     else console.log("LEFT");
 
 }
 