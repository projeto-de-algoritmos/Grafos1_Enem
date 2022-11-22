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
  const [ocupied, setOcupied] = useState(false);

  let total = 0;

  const startHandler = (data) => {
    // console.log("data", data);
    if (data === true) {
      setStart(true);
      setTarget(false);
      setOcupied(false);
    }
    if (data === false) setStart(false);
  };

  const resetHandler = (event) => {
    window.location.reload();
  };

  const targetHandler = (data) => {
    if (data === 3) setTarget(false);
    if (data === true) {
      setTarget(true);
      setStart(false);
      setOcupied(false);
    }
    if (data === false) setTarget(false);
  };
  const searchHandler = () => {
    setSearch(true);
    setTarget(false);
    setStart(false);
    setOcupied(false);
  };

  const drawocupiedHandler = () => {
    setOcupied(true);
    setTarget(false);
    setStart(false);
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
      if (
        vis[i][j] === 3 ||
        i === 0 ||
        i === 14 ||
        j === 0 ||
        j === 12 ||
        j === 6
      ) {
        window.alert("You can't set target here");
      } else {
        // get end point
        setEndNode({ i: i, j: j });
        event.target.style.backgroundColor = "red";
        targetHandler(false);
      }
    }

    if (check === "ocupied") {

      if (
        vis[i][j] === 3 ||
        i === 0 ||
        i === 14 ||
        j === 0 ||
        j === 12 ||
        j === 6
      ) {
        window.alert("You can't set target here");
      }
      else {
        event.target.style.background =
          "url('https://cdn-icons-png.flaticon.com/512/76/76814.png') center no-repeat";
        event.target.style.backgroundSize = "34px";
        event.target.style.backgroundColor = "white";
      }
      vis[i][j] = 3;

    }
  };

  // find Path
  function isValid(vis, row, col) {
    if (row < 0 || col < 0 || row > 14 || col > 12) {
      return false;
    }

    if (vis[row][col] === 3) {
      return true;
    }

    if (vis[row][col] === true) {
      return false;
    }

    return true;
  }

  function BFS(si, sj, ei, ej) {

    let dRow = [-1, 0, 1, 0];
    let dCol = [0, 1, 0, -1];

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
              btn.style.backgroundColor = "rgb(11, 77, 155)";
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

  const findPath = () => {
    if (Object.keys(startNode).length && Object.keys(endNode).length) {
      let ans = BFS(startNode.i, startNode.j, endNode.i, endNode.j);

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
            btn.style.backgroundImage =
              "url('https://cdn-icons-png.flaticon.com/512/21/21621.png')";
            btn.style.backgroundSize = "34px";
            btn.style.backgroundRepeat = "no-repeat";
            btn.style.backgroundPosition = "center";
          }, 50 * time);
          time++;
          total++;
        }
      }
    }
  };

  // path find all call
  if (search === true) {
    findPath();
  }

  let mapDraw = (
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
                    background:
                      "url('https://svgsilh.com/svg/307401.svg') center no-repeat",
                    backgroundSize: 26,
                  }}
                ></td>
              ) : i % 2 !== 0 && ((j > 0 && j < 6) || (j > 6 && j < 12)) ? (
                <td
                  id={`${i}-${j}`}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    background:"url('https://cdn-icons-png.flaticon.com/512/5074/5074182.png') center no-repeat",
                    backgroundSize: "36px",
                    backgroundColor: "slategrey"
                  }}
                ></td>
              ) : (
                <td
                  id={`${i}-${j}`}
                  onClick={(event) => {
                    target && getGridNumberHandler(i, j, event, "target");
                    ocupied && getGridNumberHandler(i, j, event, "ocupied");
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
            onClick={() => drawocupiedHandler(true)}
          >
            Selecionar Lugares Ocupados
          </button>
          <button
            className="Sala-menu-buttons"
            onClick={() => targetHandler(true)}
          >
            Destino
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
        {mapDraw}
      </div>
    </div>
  );
};

export default Sala;
