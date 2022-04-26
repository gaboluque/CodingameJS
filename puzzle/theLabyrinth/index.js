// https://www.codingame.com/ide/puzzle/the-labyrinth


 var inputs = readline().split(' ');
 const R = parseInt(inputs[0]); // number of rows.
 const C = parseInt(inputs[1]); // number of columns.
 const A = parseInt(inputs[2]); // number of rounds between the time the alarm countdown is activated and the time the alarm goes off.
 
 const getKey = (row, col) => `${row}x${col}`;
 
 const getPath = (map, start, target) => {
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
 
             if(nVal === target && !targetCell) {
                 targetCell = { key: nKey, cell: [nRow, nCol], val: nVal }
                 break;
             }
 
             queue.push(neighbours[i]);
         }
     }
 
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
 
     const nextStep = getPath(currentMap, { row: KR, col: KC }, "?");
 
     console.error("Next step", nextStep);
 
     if(nextStep[0] > KR) console.log("DOWN");
     else if(nextStep[0] < KR) console.log("UP");
     else if(nextStep[1] > KC) console.log("RIGHT");
     else console.log("LEFT");
 
 }
 