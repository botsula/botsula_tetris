var getCurrentObject =  () => objects.find(object => object.state === 'falling');
var createPlayground = () => (new Array(FHEIGHT + 1).fill().map( el => (new Array(FWIDTH + 1).fill(0))));



function updateStateMap(){
    objects.forEach( object => {
      object.position.forEach( ([rowIndex, cellIndex]) => {
        stateMap[rowIndex][cellIndex] = (object.state === 'static') ? 1 : 0 ;
      })
    });
  }

function checkNextPosition(obj, direction){
    //get next position in down direction
    let nextObj = JSON.parse(JSON.stringify(obj));
    if (direction === 'd'){
        nextObj.position.forEach(position => (position[0] > 0 && (position[0] -= 1)));
    } else if (direction === 'r') {
        nextObj.position.forEach(position => (position[1] < FWIDTH && (position[1] += 1)));
    } else if (direction === 'l') {
        nextObj.position.forEach(position => (position[1] > 0 && (position[1] -= 1)));
    }
    //check next position in down direction
    let flag = true;
    nextObj.position.forEach( ([rowIndex, cellIndex]) => {
      if(stateMap[rowIndex][cellIndex] === 1) flag = false;
    });
    obj.position.forEach( position => {
      if((position[0] === 0  && direction === 'd')||
          (position[1] === FWIDTH && direction === 'r') ||
          (position[1] === 0 && direction === 'l'))
        flag = false;
    });
    return flag;
  }


  function randomFigCreate(){
    const types = ['L','T', 'I'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    let pos = JSON.parse(JSON.stringify(INITIAL_POSITIONS));
    let newFigure = {
        type: randomType,
        state: 'falling',
        rpoint: TYPE_RPOINTS[randomType],
        //position: INITIAL_POSITIONS[randomType].slice()
        position: pos[randomType]
    };
    return newFigure;
  }

  // function renderPositions() {
  //   objects.forEach( object => {
  //     object.position.forEach( ([rowIndex, cellIndex]) => {
  //       playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
  //     })
  //   });
  // }

function checkEachLine(){
    let i;
    for (i = 0; i < stateMap.length; i++) {
        let flagLine = true;
        stateMap[i].forEach(item => {
            if (item === 0) flagLine = false;
        });
        if (flagLine) return i;
    }
}

function checkFirstLine(){
    let flagLine = false;
    for (let i = 0; i < stateMap[FHEIGHT].length; i++) {
        console.log(stateMap[FHEIGHT][i]);
        return (stateMap[FHEIGHT][i] == 1);
    };
    return flagLine;
}

function deleteRow(selectedRow){
    console.log(selectedRow)
    objects.forEach(object => {
        if (object.state === 'static'){
            for (let i = 0; i < object.position.length; i++){
                if (object.position[i][0] === selectedRow){
                    object.position.splice(i, 1);
                    console.log("DELETED PIECE: ", object.position);
                }
            }
        }
    })
    return true;
}


function moveAllDown(){
    console.log("HERE")

    objects.forEach(object => {
        if (object.state === 'static'){
            moveDown(object);
        }
    })
    return 'YA YA'
}

function rotateObject() {
    let currentObject = getCurrentObject();
    //let matrix = currentObject.position.slice();

    const flipMatrix = matrix => (
        matrix[0].map((column, index) => (
            matrix.map(row => row[index])
        ))
    );
    const rotateMatrix = matrix => (
        flipMatrix(matrix.reverse())
    );

    let rowDelta = currentObject.position[currentObject.rpoint][0]-1;
    let cellDelta = currentObject.position[currentObject.rpoint][1]-1;
    let square = [[0,0,0],[0,0,0],[0,0,0]];
    console.log(currentObject);
    console.log(currentObject.position.slice());
    console.log(square.slice());
    console.log('rowDelta = %s, cellDelta = %s', rowDelta, cellDelta );

    currentObject.position.forEach( ([rowIndex, cellIndex]) => {
        console.log('rowIndex = %s, cellIndex = %s', rowIndex, cellIndex );
        square[rowIndex - rowDelta][cellIndex - cellDelta] = 1;
    });

    square = rotateMatrix(square);
    console.log(square.slice());
    let newPosition = [];
    let counter = 0;
    square.forEach( (rowEl, rowIndex) => {
        rowEl.forEach( (cellEl, cellIndex) => {
            if (cellEl === 1) {
                newPosition.push([rowIndex + rowDelta, cellIndex + cellDelta]);
                counter++;
            }
            if (rowIndex === 1 && cellIndex === 1) currentObject.rpoint = counter - 1;
        });
    });
    currentObject.position = newPosition;
    playground = createPlayground();
    renderPlayground()
    console.log(' ---===--- ');
    console.log('currentObject.rpoint = %s', currentObject.rpoint);
    console.log(currentObject);
}
