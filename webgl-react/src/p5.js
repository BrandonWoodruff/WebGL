// src/P5Canvas.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let angle = 0;

      p.setup = () => {
        p.createCanvas(640, 480, p.WEBGL);
      };

      p.draw = () => {
        p.background(0);
        p.rotateX(angle);
        p.rotateY(angle);
        p.box(100);
        angle += 0.01;
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);

    // Cleanup function
    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default P5Canvas;