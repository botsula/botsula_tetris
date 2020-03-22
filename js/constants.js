const TYPE_COLORS = {
  "L": 'red',
  "T": 'purple',
  "I": 'green'
};

const TYPE_RPOINTS = {
  "L": 2,
  "T": 1,
  "I": 1
};

const INITIAL_POSITIONS = {
  "L": [[9, 1], [8, 1], [8, 2], [8, 3]],
  "T": [[9, 2], [9, 3], [9, 4], [8, 3]],
  "I": [[9, 2], [8, 2], [7, 2]]
};

// Event keys
const DOWN  = 40;
const LEFT  = 39;
const RIGHT = 37;
const PAUSE = 32;
const ZTEST = 90;

// Game Field [0..FWIDTH][0..FHEIGHT]
const FWIDTH = 4;
const FHEIGHT = 9;
