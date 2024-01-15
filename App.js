import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function displayUser(user) {
  return user === 0 ? "O" : user === 1 ? "X" : null;
}

// arr = [-1,-1,-1]     // null
// arr = [0,0,0]        // 0
// arr = [1,1,1]        // 1
// arr = [0,1,-1]       // null
function checkWinner(arr) {
  const flag = arr[0];
  for (const i in arr) {
    const item = arr[i];
    if (item === -1) return null;
    if (item !== flag) return null;
  }
  return flag;
}

function App() {
  // -1: 빈칸
  // 0: 0이 입력함
  // 1: 1이 입력함
  const [game, setGame] = useState([
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]);
  const [user, setUser] = useState(0); // 0, 1
  const [winner, setWinner] = useState(-1);

  const click = useCallback(
    (i, j) => {
      if (winner !== -1) return;
      if (game[i][j] !== -1) return;
      setGame((_g) => {
        const g = JSON.parse(JSON.stringify(_g));
        g[i][j] = user;
        return g;
      });
      setUser((u) => (u === 0 ? 1 : 0));
    },
    [winner, game, user]
  );

  useEffect(() => {
    let winner = null;

    const checkableArrs = [];
    for (let i = 0; i < 3; i++) {
      const col = [];
      const row = [];
      for (let j = 0; j < 3; j++) {
        col.push(game[i][j]);
        row.push(game[j][i]);
      }
      checkableArrs.push(col);
      checkableArrs.push(row);
    }
    checkableArrs.push([game[0][0], game[1][1], game[2][2]]);
    checkableArrs.push([game[0][2], game[1][1], game[2][0]]);

    console.log(checkableArrs);
    for (const i in checkableArrs) {
      const checkableArr = checkableArrs[i];
      const result = checkWinner(checkableArr);
      console.log("checkWinner", checkableArr, result);
      if (result !== null) {
        setWinner(result);
        return;
      }
    }
  }, [game]);

  return (
    <div className="App">
      <p>턴:{displayUser(user)}</p>
      <p>승자: {displayUser(winner)}</p>
      <table>
        {game.map((row, i) => (
          <tr>
            {row.map((col, j) => (
              <td onClick={() => click(i, j)}>{displayUser(col)}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;