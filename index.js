const tetris = document.querySelector('#tetris');
const blocks = [
    {
      name: 's', // 네모
      center: false,
      numCode: 1,
      color: 'red',
      currentShapeIndex: 0,
      shape: [
        [
          [0, 0, 0],
          [0, 1, 1],
          [0, 1, 1],
        ]
      ],
    },
    {
      name: 't', // T자
      center: true,
      numCode: 2,
      color: 'orange',
      currentShapeIndex: 0,
      shape: [
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0],
        ],
      ]
    },
    {
      name: 'z', // 지그재그
      center: true,
      numCode: 3,
      color: 'yellow',
      currentShapeIndex: 0,
      shape: [
        [
          [0, 0, 0],
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [1, 0, 0],
        ],
        [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 0, 1],
          [0, 1, 1],
          [0, 1, 0],
        ],
      ]
    },
    {
      name: 'zr', // 반대 지그재그
      center: true,
      numCode: 4,
      color: 'green',
      startRow: 1,
      currentShapeIndex: 0,
      shape: [
        [
          [0, 0, 0],
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 0, 1],
        ],
      ]
    },
    {
      name: 'l', // L자
      center: true,
      numCode: 5,
      color: 'blue',
      currentShapeIndex: 0,
      shape: [
        [
          [0, 0, 0],
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1, 0],
          [0, 1, 0],
          [0, 1, 0],
        ],
        [
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 1],
        ],
      ]
    },
    {
      name: 'lr', // 반대 L자
      center: true,
      numCode: 6,
      color: 'navy',
      currentShapeIndex: 0,
      shape: [
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 1],
        ],
        [
          [0, 1, 0],
          [0, 1, 0],
          [1, 1, 0],
        ],
        [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        [
          [0, 1, 1],
          [0, 1, 0],
          [0, 1, 0],
        ],
      ]
    },
    {
      name: 'b', // 1자
      center: true,
      numCode: 7,
      color: 'violet',
      currentShapeIndex: 0,
      shape: [
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ],
        [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
        ],
      ]
    },
  ];
let tetrisData = [];
let currentBlock;
let nextBlock;
var currentTopLeft = [0, 3];

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];
const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);


  function init(){
    const fragment = document.createDocumentFragment();
    [...Array(20).keys()].forEach((col,i)=>{
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        [...Array(10).keys()].forEach((ver,j) => {
            const td = document.createElement('td');
            tr.appendChild(td)
        })
        const vertical = Array(10).fill(0);
        tetrisData.push(vertical);

    })
    tetris.appendChild(fragment);
  }

  function drawNext() {
    const nextTable = document.querySelector('#next-table');
    console.log(nextBlock);
    nextTable.querySelectorAll('tr').forEach((col,i)=>{
        Array.from(col.children).forEach((ver,j)=>{
            if(nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0){
                nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode -1];
                
            }else{
                nextTable.querySelectorAll('tr')[i].children[j].className = 'white'
            }
        })
    })
  }
  
  function draw() {
      tetrisData.forEach((col,i)=>{
        col.forEach((ver,j)=>{
            if(ver > 0){
                tetris.querySelectorAll('tr')[i].children[j].className = tetrisData[i][j] >= 10 ? colors[ver/10 -1] : colors[ver -1];
            }else{
                tetris.querySelectorAll('tr')[i].children[j].className = 'white'
            }
        })
      })
  }
  function generate() {
    if(!currentBlock){
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
        console.log(currentBlock);
    }else{
        currentBlock = nextBlock;
    }
    currentBlock.currentShapeIndex=0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
    drawNext();
    currentTopLeft = [-1, 3];
    let isGameOver = false;
    currentBlock.shape[0].slice(1).forEach((col, i) => { // 게임 오버 판단
        col.forEach((ver, j) => {
          if (ver && tetrisData[i][j + 3]) {
            isGameOver = true;
          }
        });
      });
    currentBlock.shape[0].slice(1).forEach((col,i)=>{
        //console.log(currentBlock.shape[0], currentBlock.shape[0].slice(1), col);
        col.forEach((ver,j)=>{
            if(ver){
                tetrisData[i][j + 3] = currentBlock.numCode;
            }
        })
    })
    if (isGameOver) {
        clearInterval(int);
        draw();
        alert('game over');
      } else {
        draw();
      }
  }

  function checkRows() { // 한 줄 다 찼는지 검사
    const fullRows = [];
    tetrisData.forEach((col, i) => {
      let count = 0;
      col.forEach((row, j) => {
        if (row > 0) {
          count++;
        }
      });
      if (count === 10) {
        fullRows.push(i);
      }
    });
    const fullRowsCount = fullRows.length;
    tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));
    for (let i = 0; i < fullRowsCount; i++) {
      tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
    console.log(fullRows, JSON.parse(JSON.stringify(tetrisData)));
    let score = parseInt(document.getElementById('score').textContent, 10);
    score += fullRowsCount ** 2;
    document.getElementById('score').textContent = String(score);
  }

  function tick(){
    const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
    const activeBlocks = [];
    let canGoDown = true;
    let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
    for(i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++){
        if (i < 0 || i >= 20) continue;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            if(isActiveBlock(tetrisData[i][j])){
                activeBlocks.push([i, j]);
                if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
                    console.log("밑에 블럭이 있음")
                    canGoDown = false
                }
            }
        }
    }
    if(!canGoDown){
        activeBlocks.forEach((block)=>{
            tetrisData[block[0]][block[1]] *= 10;
        })
        checkRows();
        generate();
        return false;
    }else if(canGoDown){
        for(i = tetrisData.length -1; i >=0; i-- ){
            col = tetrisData[i];
            col.forEach((row, j)=>{
                if(row < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10){
                    tetrisData[i + 1][j] = row;
                    tetrisData[i][j] = 0;
                }
            })
        }
        currentTopLeft = nextTopLeft;
    draw();
    return true;
    }

  }
  let int = setInterval(tick, 200);
  init();
  generate();

  window.addEventListener('keydown',(e)=>{
      console.log(e);
    switch(e.code){
        case 'ArrowLeft': {
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1]-1 ];
            let isMovableLeft = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            for(i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++){
                if (!isMovableLeft) break;
                for(j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++){
                    if (!tetrisData[i] || !tetrisData[i][j]) continue;
                    if(isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j - 1])){
                            console.log("옆에 블록있음")
                            isMovableLeft = false
                    }
                }    
            }
            if(isMovableLeft){
                tetrisData.forEach((col, i) => {
                    for (var j = 0; j < col.length; j++) {
                      const row = col[j];
                      if (tetrisData[i][j - 1] === 0 && row < 10) {
                        tetrisData[i][j - 1] = row;
                        tetrisData[i][j] = 0;
                      }
                    }
                  });
                currentTopLeft = nextTopLeft;
                draw();
            }
            break;
        }
        case 'ArrowRight' :{
            const nextTopLeft = [currentTopLeft[0], currentTopLeft[1]+1 ];
            let isMovableRight = true;
            let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
            for(i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++){
                if (!isMovableRight) break;
                for(j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++){
                    if (!tetrisData[i] || !tetrisData[i][j]) continue;
                    if(isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j + 1])){
                            console.log("옆에 블록있음")
                            isMovableRight = false
                    }
                }    
            }
            if(isMovableRight){
                tetrisData.forEach((col, i) => {
                    for (var j = col.length - 1; j >= 0; j--) {
                      const row = col[j];
                      if (tetrisData[i][j + 1] === 0 && row < 10) {
                        tetrisData[i][j + 1] = row;
                        tetrisData[i][j] = 0;
                      }
                    }
                  });
                currentTopLeft = nextTopLeft;
                draw();
            }
            break;
        }
        case 'ArrowDown' :{
            tick();
            break;
        }
    }
  })

  window.addEventListener('keyup', (e) => {
    switch (e.code) {
      case 'ArrowUp': { 
        let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
        let isChangeable = true;
        const nextShapeIndex = currentBlock.currentShapeIndex + 1 === currentBlock.shape.length
          ? 0
          : currentBlock.currentShapeIndex + 1;
        const nextBlockShape = currentBlock.shape[nextShapeIndex];
        for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) {
          if (!isChangeable) break;
          for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            if (!tetrisData[i]) continue;
            if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && isInvalidBlock(tetrisData[i] && tetrisData[i][j])) {
              console.log(i, j);
              isChangeable = false;
            }
          }
        }
        if (isChangeable) {
          while (currentTopLeft[0] < 0) {
            tick();
          }
          for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
            for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
              if (!tetrisData[i]) continue;
              let nextBlockShapeCell = nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]];
              if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {
                // 다음 모양은 있는데 현재 칸이 없으면
                tetrisData[i][j] = currentBlock.numCode;
              } else if (nextBlockShapeCell === 0 && tetrisData[i][j] && tetrisData[i][j] < 10) {
                // 다음 모양은 없는데  현재 칸이 있으면
                tetrisData[i][j] = 0;
              }
            }
          }
          currentBlock.currentShapeIndex = nextShapeIndex;
        }
        draw();
        break;
      }
      case 'Space': // 한방에 쭉 떨구기
        while (tick()) {}
        break;
    }
  });