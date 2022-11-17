import "./Sala.css";
import React, { useEffect, useState } from "react";
import Styles from "./Sala.module.css";
import { MdOutlinePortableWifiOff } from 'react-icons/md';

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
    if (data === true)
      setStart(true);
    if (data === false)
      setStart(false);
  }

  const resetHandler = (event) => {
    window.location.reload();
  }

  const targetHandler = (data) => {
    if (data === true)
      setTarget(true);
    if (data === false)
      setTarget(false);
  }
  const searchHandler = () => {
    setSearch(true);
  }

  const drawWallHandler = () => {
    setWall(true);
  }

  const teste = (i, j) => {
    console.log('IHUUUUUUU');
    vis[i][j] = true;
  }

  let draw = [];
  let column = [];
  for (let i = 0; i <= 6; i++) draw[i] = i;
  for (let i = 0; i <= 12; i++) column[i] = i;
  let arr = [];
  useEffect(() => {
    // make 2D greed

    for (let i = 0; i <= 6; i++) {
      let a = [];
      for (let j = 0; j <= 12; j++) {
        a.push(0);
      }
      arr.push(a);
    }

    // make visited array
    for (let i = 0; i <= 6; i++) {
      let d = [];
      for (let j = 0; j <= 12; j++) {
        d.push(false);
      }
      vis.push(d);
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
      event.target.style.backgroundColor = "red";
      targetHandler(false);
    }

    if (check === 'wall') {
      // visited node for wall node
      console.log("WAAAAAAAAAAAAL")
      if (event != 0)
        event.target.style.backgroundColor = "black";
      vis[i][j] = true;
      console.log(vis[i][j]);

    }
  };

  // find Path
  function isValid(vis, row, col) {
    if (row < 0 || col <= 0 || row > 6|| col > 12) {
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
            }, 200 * time)

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
          }, 200 * time);
          time++;

        }
      }
    } else {
      console.log("Hi We are going to find Path");
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
              return (
                (i === 0 || i === 6) && j === 0 ? (
                  <td
                    id={`${i}-${j}`}
                    onClick={(event) => {
                      start && getGridNumberHandler(i, j, event, "start");
                    }}
                    style={{ cursor: "pointer", textAlign: "center" }}
                  >Entrada</td>
                )
                  :
                  (i % 2 != 0 && (j > 0 && j < 6 || j > 6 && j < 12))
                    ? (
                      <td
                        id={`${i}-${j}`}
                        style={{ cursor: "pointer", textAlign: "center", backgroundColor: "black" }}
                       
                      >{}</td>
                    )
                    : (
                      <td
                        id={`${i}-${j}`}
                        onClick={(event) => {

                          target && getGridNumberHandler(i, j, event, "target");
                          wall && getGridNumberHandler(i, j, event, "wall");
                        }}
                        style={{ cursor: "pointer", textAlign: "center" }}

                      ></td>
                    )

              );
            })}
          </tr>
        );
      })}
    </table>
  );

  return (
    <div className="Sala-container">
      <div className={Styles.Heading}>
        <button onClick={() => startHandler(true)}>Entrada</button>
        <button onClick={() => targetHandler(true)}>Destino</button>
        <button onClick={() => drawWallHandler(true)}>Wall</button>
        <button onClick={() => searchHandler(true)}>Buscar</button>
        <button onClick={resetHandler}>Reiniciar</button>

      </div>
      <div className="Sala-card">
        <React.Fragment>
         
          {gridDraw}
        </React.Fragment>
      </div>

    </div>
  );
};

export default Sala;
