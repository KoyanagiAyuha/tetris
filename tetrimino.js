var COLORS = ['cyan', 'yellow', 'green', 'red', 'blue', 'orange', 'magenta'];

var MINOS = [
  [
    [1, 1, 1, 1], // I テトリミノ
  ],
  [
    [1, 1],
    [1, 1], // O テトリミノ
  ],
  [
    [0, 1, 1],
    [1, 1, 0], // S テトリミノ
  ],
  [
    [1, 1, 0],
    [0, 1, 1], // Z テトリミノ
  ],
  [
    [1, 0, 0],
    [1, 1, 1], // J テトリミノ
  ],
  [
    [0, 0, 1],
    [1, 1, 1], // L テトリミノ
  ],
  [
    [0, 1, 0],
    [1, 1, 1], // T テトリミノ
  ],
];

function newMino() {
  var id = Math.floor(Math.random() * MINOS.length);
  var mino = [];
  for (var y = 0; y < MINOS[id].length; y++) {
    mino[y] = [];
    for (var x = 0; x < MINOS[id][y].length; x++) {
      mino[y][x] = 0;
      if (MINOS[id][y]) {
        if (MINOS[id][y][x]) {
          mino[y][x] = id + 1;
        }
      }
    }
  }
  return mino;
}

function rotate(mino) {
  var rotated = [];
  for (var x = 0; x < mino[0].length; x++) {
    rotated[x] = [];
    for (var y = 0; y < mino.length; y++) {
      Y = x;
      X = -y + mino.length - 1;
      rotated[Y][X] = mino[y][x];
    }
  }
  return rotated;
}
