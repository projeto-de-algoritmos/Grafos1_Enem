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











  return (
    <div className="Sala-container">
     
      <div className="Sala-card">
        <React.Fragment>
         
          {}
        </React.Fragment>
      </div>

    </div>
  );
};

export default Sala;
