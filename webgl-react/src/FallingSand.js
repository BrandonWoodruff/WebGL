import React, { useRef, useEffect, useCallback } from 'react';
import p5 from 'p5';

export default function FallingSand() {
  const canvasRef = useRef(null);
  const gridRef = useRef([]);
  const w = 10;
  const colsRef = useRef(0);
  const rowsRef = useRef(0);

  const make2dArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows).fill(0);
    }
    return arr;
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    const cols = Math.floor(p5.width / w);
    const rows = Math.floor(p5.height / w);
    colsRef.current = cols;
    rowsRef.current = rows;
    gridRef.current = make2dArray(cols, rows);
  };

  const draw = (p5) => {
    p5.background(0);
    const cols = colsRef.current;
    const rows = rowsRef.current;
    const grid = gridRef.current;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j] === 1) {
          p5.stroke(255);
          p5.fill(255);
          let x = i * w;
          let y = j * w;
          p5.square(x, y, w);
        }
      }
    }

    if (p5.mouseIsPressed) {
      let i = Math.floor(p5.mouseX / w);
      let j = Math.floor(p5.mouseY / w);
      if (i >= 0 && i < cols && j >= 0 && j < rows) {
        grid[i][j] = 1;
      }
    }
  };

  useEffect(() => {
    const myP5 = new p5((p5) => {
      p5.setup = () => setup(p5, canvasRef.current);
      p5.draw = () => draw(p5);
    });

    return () => myP5.remove();
  }, []);

  return (
    <div>
      <h1>Falling Sand</h1>
      <div ref={canvasRef} />
    </div>
  );
}
