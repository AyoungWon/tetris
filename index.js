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

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];


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
                nextTable.querySelectorAll('tr')[i].children[j].className=colors[nextBlock.numCode -1];
                
            }else{
                nextTable.querySelectorAll('tr')[i].children[j].className='white'
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
    currentBlock.shape[0].slice(1).forEach((col,i)=>{
        console.log(currentBlock.shape[0], currentBlock.shape[0].slice(1), col);
        col.forEach((ver,j)=>{
            if(ver){
                tetrisData[i][j + 3] = currentBlock.numCode;
            }
        })
    })
    if (isGameOver) {
        clearInterval(int);
       // draw();
        alert('game over');
      } else {
        //draw();
      }
  }

  init();
  generate();