var playground = createPlayground();
var stateMap = createPlayground();
var flagPause = true;
var gameInterval;

console.log(playground);

// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  let currentObject = getCurrentObject();

  if (checkNextPosition(currentObject, 'd')){
    currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)));
  }
  updateStateMap();

  playground = createPlayground();
  renderPlayground()
}

function moveRight(obj) {
  console.log('move right');
  let currentObject = getCurrentObject();
  console.log(currentObject.position);

  if (checkNextPosition(currentObject, 'r')){
    currentObject.position.forEach(position => (position[1] += 1 && (position[1] < FWIDTH)));
  }
  updateStateMap();

  playground = createPlayground();
  renderPlayground()
}

function moveLeft(obj) {
  console.log('move left');
  let currentObject = getCurrentObject();
  console.log(currentObject.position);
  if (checkNextPosition(currentObject, 'l')){
    currentObject.position.forEach(position => (position[1] > 0 && (position[1] -= 1)));
  }
  updateStateMap();

  playground = createPlayground();
  renderPlayground()
}

function pauseGame() {
  if (flagPause) {
    console.log('pausing the game');
    clearInterval(gameInterval);
  } else {
    console.log('unpausing the game');
    runGame();
  }
  flagPause = !flagPause;
}

renderPlayground();
runGame();

function runGame(){
  // interval 1 second
  gameInterval = setInterval(() => {
    let currentObject = getCurrentObject();
    if (checkNextPosition(currentObject, 'd') === false) {
      currentObject.state = 'static';
      let newObj = randomFigCreate();
      console.log(newObj);
      objects.push(newObj);
    } else {
      moveDown();
    }

    //let f = deleteRow(checkEachLine());
    if (deleteRow(checkEachLine())) console.log("DELETED", moveAllDown());



  }, 800);
}



// function createObj() {}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

// updateStateMap - checks only when figures are static == when the next figure falls

