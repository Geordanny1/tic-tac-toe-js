const squares = document.querySelectorAll("li");
let win = false;
let change = false; // false = X turn, true = O turn
let squaresFill = 0;

const winEl = document.getElementById("wins");
let xWins = 0;
let oWins = 0;

winEl.innerText = `X's Wins: ${xWins}\nO's Wins: ${oWins}`;

const winnerCombination = [
  [squares[0], squares[1], squares[2]],
  [squares[3], squares[4], squares[5]],
  [squares[6], squares[7], squares[8]],
  
  [squares[0], squares[3], squares[6]],
  [squares[1], squares[4], squares[7]],
  [squares[2], squares[5], squares[8]],

  [squares[0], squares[4], squares[8]],
  [squares[2], squares[4], squares[6]],
];

function checkWinnerCombination(arr) {
  for (let i = 0; i < arr.length; i++) {
    const [a, b, c] = arr[i];

    if (!a.innerText) continue;

    if (a.innerText === b.innerText && a.innerText === c.innerText) {
      win = true;

      if (a.innerText === "X") {
        xWins++;
      } else {
        oWins++;
      }

      winEl.innerText = `X's Wins: ${xWins}\nO's Wins: ${oWins}`;
      return;
    }
  }
}

function fillSquare(square) {
  if (win) return;           // do not allow play after win
  if (square.innerText) return;

  if (!change) {
    square.innerText = "X";
    change = true;
  } else {
    square.innerText = "O";
    change = false;
  }

  squaresFill++;
  checkWinnerCombination(winnerCombination);

  if (win) {
    setTimeout(resetBoard, 1000);
    return;
  }

  if (squaresFill === 9) {
    setTimeout(resetBoard, 1000);
  }
}

function resetBoard() {
  squares.forEach(s => s.innerText = "");
  win = false;
  squaresFill = 0;
}

squares.forEach(square => {
  square.addEventListener("click", () => fillSquare(square));
});

