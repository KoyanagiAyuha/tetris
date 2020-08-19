var FIELD_W = 300;
var FIELD_H = 600;
var COLS = 10;
var ROWS = 20;
var BLOCK_W = FIELD_W / COLS;
var BLOCK_H = FIELD_H / ROWS;
var canvas = document.getElementById('field');
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';
ctx.strokeRect(0, 0, BLOCK_W, BLOCK_H);

var field = [];

for (var y = 0; y < ROWS; y++) {
  field[y] = [];
  for (var x = 0; x < COLS; x++) {
    field[y][x] = 0;
  }
}

var current_x = 3;
var current_y = 0;

var current_mino; // 現在移動中のテトリミノ

current_mino = newMino();
render();
doingGame = setInterval(tick, 500);

function render() {
  ctx.clearRect(0, 0, FIELD_W, FIELD_H);
  ctx.strokeStyle = 'black';
  for (var y = 0; y < ROWS; y++) {
    for (var x = 0; x < COLS; x++) {
      drawBlock(x, y, field[y][x]);
    }
  }
  for (var y = 0; y < current_mino.length; y++) {
    for (var x = 0; x < current_mino[y].length; x++) {
      drawBlock(current_x + x, current_y + y, current_mino[y][x]);
    }
  }
}

function canMove(move_x, move_y, move_mino) {
  var next_x = current_x + move_x; // 次に動こうとするx座標
  var next_y = current_y + move_y; // 次に動こうとするy座標
  var next_mino = move_mino || current_mino;
  for (var y = 0; y < next_mino.length; y++) {
    for (var x = 0; x < next_mino[y].length; x++) {
      if (next_mino[y][x]) {
        if (
          next_y + y >= ROWS ||
          next_x + x < 0 ||
          next_x + x >= COLS ||
          field[next_y + y][next_x + x]
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

function drawBlock(x, y, block) {
  if (block) {
    ctx.fillStyle = COLORS[block - 1];
    ctx.fillRect(x * BLOCK_W, y * BLOCK_H, BLOCK_W - 1, BLOCK_H - 1);
    ctx.strokeRect(x * BLOCK_W, y * BLOCK_H, BLOCK_W - 1, BLOCK_H - 1);
  }
}

function tick() {
  var goflag = true;
  if (canMove(0, 1)) {
    current_y++; // 下に移動させてから
  } else {
    fix();
    current_mino = newMino();
    clearRows();
    goflag = gameOver();
    current_x = 3;
    current_y = 0;
  }
  if (goflag) {
    render(); // 再描写
  } else {
    clearInterval(doingGame);
    ctx.font = '48px serif';
    ctx.textBaseline = 'hanging';
    ctx.strokeText('GAME OVER', 0, 300);
  }
}

function fix() {
  for (var y = 0; y < current_mino.length; ++y) {
    for (var x = 0; x < current_mino[y].length; ++x) {
      if (current_mino[y][x]) {
        field[current_y + y][current_x + x] = current_mino[y][x]; // fieldに代入
      }
    }
  }
}

document.body.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37: // ←キー
      if (canMove(-1, 0)) {
        current_x--;
      }
      break;
    case 39: // →キー
      if (canMove(1, 0)) {
        current_x++;
      }
      break;
    case 40: // ↓キー
      if (canMove(0, 1)) {
        current_y++;
      }
      break;
    case 38: // ↑キー
      rotated = rotate(current_mino);
      if (canMove(0, 0, rotated)) {
        current_mino = rotated;
      }
      break;
  }
  render();
};

function clearRows() {
  for (var y = ROWS - 1; y >= 0; y--) {
    // 下からつまりyが大きいほうから判定していく
    var fill = true; // 全て埋まっているか
    for (var x = 0; x < COLS; x++) {
      if (field[y][x] == 0) {
        // 0のブロックがあれば
        fill = false; // fillではない
        break;
      }
    }
    if (fill) {
      // もしfillなら
      for (var v = y - 1; v >= 0; v--) {
        // その行より上を
        for (var x = 0; x < COLS; x++) {
          field[v + 1][x] = field[v][x]; // 一つ下にずらす
        }
      }
      y++; // ずらしたら同じ行（上からずれた行）をもう一度判定する
    }
  }
}

function gameOver() {
  if (
    field[0][3] >= 1 ||
    field[0][4] >= 1 ||
    field[0][5] >= 1 ||
    field[0][6] >= 1
  ) {
    return false;
  }
  return true;
}
