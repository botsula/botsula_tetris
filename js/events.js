document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case DOWN:
      moveDown();
      break;
    case LEFT:
      moveRight();
      break;
    case RIGHT:
      moveLeft();
      break;
    case PAUSE:
      pauseGame();
      break;
    case ZTEST:

      rotateObject();
      // console.log(stateMap);
      // console.log("ALARM!!!!", checkEachLine());
      // console.log("First row has 1", checkFirstLine());
      break;
    default:
      break;
  }
});
