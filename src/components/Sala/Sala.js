import "./Sala.css";
import React, { useEffect, useState } from "react";
import Styles from "./Sala.module.css";

let time = 0;
let vis = [];

const Sala = () => {
  const [startNode, setStartNode] = useState({});
  const [endNode, setEndNode] = useState({});
  const [array2D, setArray2D] = useState([]);
  const [start, setStart] = useState(false);
  const [target, setTarget] = useState(false);
  const [search, setSearch] = useState(false);
  const [wall, setWall] = useState(false);

  const startHandler = (data) => {
    console.log("data", data);
    if (data === true) setStart(true);
    if (data === false) setStart(false);
  };

  const resetHandler = (event) => {
    window.location.reload();
  };

  const targetHandler = (data) => {
    if (data === true) setTarget(true);
    if (data === false) setTarget(false);
  };
  const searchHandler = () => {
    setSearch(true);
  };

  const drawWallHandler = () => {
    setWall(true);
  };

  let draw = [];
  let column = [];
  for (let i = 0; i <= 14; i++) draw[i] = i;
  for (let i = 0; i <= 12; i++) column[i] = i;
  let arr = [];

  useEffect(() => {
    for (let i = 0; i <= 14; i++) {
      let a = [];
      for (let j = 0; j <= 12; j++) {
        a.push(0);
      }
      arr.push(a);
    }

    // make visited array
    for (let i = 0; i <= 14; i++) {
      let d = [];
      for (let j = 0; j <= 12; j++) {
        d.push(false);
      }
      vis.push(d);
    }

    for (let i = 0; i <= 14; i++) {
      for (let j = 0; j <= 12; j++) {
        if (i % 2 !== 0 && ((j > 0 && j < 6) || (j > 6 && j < 12)))
          vis[i][j] = true;
      }
    }

    setArray2D(arr);
  }, []);

  const getGridNumberHandler = (i, j, event, check) => {
    if (check === "start") {
      // get starting point
      setStartNode({ i: i, j: j });
      event.target.style.backgroundColor = "green";
      startHandler(false);
    }
    if (check === "target") {
      // get end point
      setEndNode({ i: i, j: j });
      event.target.style.backgroundColor = "white";
      targetHandler(false);
    }

    if (check === "wall") {
      // visited node for wall node 
      if (event !== 0) event.target.style.backgroundColor = "red";
      vis[i][j] = true;
      console.log(vis[i][j]);
    }
  };

  // find Path
  function isValid(vis, row, col) {
    if (row < 0 || col < 0 || row > 14 || col > 12) {
      return false;
    }

    if (vis[row][col]) {
      return false;
    }

    return true;
  }

  function BFS(si, sj, ei, ej) {
    // dricection
    console.log("BFS Call");
    let dRow = [-1, 0, 1, 0];
    let dCol = [0, 1, 0, -1];

    console.log(vis);

    let path = {};
    let queue = [];
    queue.push([si, sj]);

    while (queue.length > 0) {
      let [x, y] = queue[0];

      queue.shift();

      for (let i = 0; i < 4; i++) {
        let adjx = x + dRow[i];
        let adjy = y + dCol[i];

        if (isValid(vis, adjx, adjy)) {
          if (path[`${adjx}-${adjy}`] === undefined) {
            path[`${adjx}-${adjy}`] = [];
          }
          if (!(adjx === ei && adjy === ej) && !(adjx === si && adjy === sj)) {
            // sleep
            setTimeout(function () {
              let btn = document.getElementById(`${adjx}-${adjy}`);
              btn.style.backgroundColor = "blue";
            }, 50 * time);

            time++;
          }

          path[`${adjx}-${adjy}`].push([x, y]);
          queue.push([adjx, adjy]);
          vis[adjx][adjy] = true;
        }

        if (adjx === ei && adjy === ej) return { path, adjx, adjy };
      }
    }

    return 0;
  }

  const findPathHandler = () => {
    console.log(startNode, endNode);
    console.log(startNode.length, endNode.length);
    if (Object.keys(startNode).length && Object.keys(endNode).length) {
      console.log("Before BFS");
      let ans = BFS(startNode.i, startNode.j, endNode.i, endNode.j);
      console.log("After BFS");
      console.log(ans);
      if (ans !== 0) {
        let x = ans.adjx,
          y = ans.adjy;

        while (true) {
          let id = ans.path[`${x}-${y}`];
          x = id[0][0];
          y = id[0][1];
          if (startNode.i === x && startNode.j === y) break;
          setTimeout(() => {
            let btn = document.getElementById(`${id[0][0]}-${id[0][1]}`);
            btn.style.backgroundColor = "orange";
          }, 50 * time);
          time++;
        }
      }
    }
  };

  // path find all call
  if (search === true) {
    findPathHandler();
  }

  let gridDraw = (
    <table className={Styles.table}>
      {draw.map((element, i) => {
        return (
          <tr>
            {column.map((element1, j) => {
              return (i === 0 || i === 14) && j === 0 ? (
                <td
                  id={`${i}-${j}`}
                  onClick={(event) => {
                    start && getGridNumberHandler(i, j, event, "start");
                  }}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    fontSize: 10,
                  }}
                >
                  Entrada
                </td>
              ) : i % 2 !== 0 && ((j > 0 && j < 6) || (j > 6 && j < 12)) ? (
                <td
                  id={`${i}-${j}`}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    backgroundColor: "grey",
                  }}
                ></td>
              ) : (
                <td
                  id={`${i}-${j}`}
                  onClick={(event) => {
                    target && getGridNumberHandler(i, j, event, "target");
                    wall && getGridNumberHandler(i, j, event, "wall");
                  }}
                  style={{ cursor: "pointer", textAlign: "center" }}
                ></td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );

  return (
    <div className="Sala-container">
      <div className="Sala-card">
        <div className="Sala-menu-buttons-div">
          <button
            className="Sala-menu-buttons"
            onClick={() => startHandler(true)}
          >
            Entrada
          </button>
          <button
            className="Sala-menu-buttons"
            onClick={() => targetHandler(true)}
          >
            Destino
          </button>
          <button
            className="Sala-menu-buttons"
            onClick={() => drawWallHandler(true)}
          >
            Lugares Ocupados
          </button>
          <button
            className="Sala-menu-buttons"
            onClick={() => searchHandler(true)}
          >
            Buscar
          </button>
          <button className="Sala-menu-buttons" onClick={resetHandler}>
            Reiniciar
          </button>
        </div>
        {gridDraw}
      </div>
    </div>
  );
};

export default Sala;
