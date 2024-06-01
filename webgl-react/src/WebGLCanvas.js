// src/WebGLCanvas.js
import React, { useRef, useEffect } from 'react';

const WebGLCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported, falling back on experimental-webgl');
      gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
      alert('Your browser does not support WebGL');
      return;
    }

    // Vertex shader program
    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      uniform float uTime;
      void main(void) {
        gl_Position = aVertexPosition;
        gl_Position.x += sin(uTime);
      }
    `;

    // Fragment shader program
    const fragmentShaderSource = `
      void main(void) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Red color
      }
    `;

    // Initialize shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Define a square
    const vertices = new Float32Array([
      1.0,  1.0,
     -1.0,  1.0,
      1.0, -1.0,
     -1.0, -1.0,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aVertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);

    const uTime = gl.getUniformLocation(shaderProgram, 'uTime');

    let time = 0;
    const render = () => {
      time += 0.01;
      gl.uniform1f(uTime, time);

      // Clear the canvas
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Draw the square
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Call the render function again on the next frame
      requestAnimationFrame(render);
    };

    // Start the animation loop
    render();

    // Cleanup function
    return () => {
      cancelAnimationFrame(render);
    };
  }, []);

  return (
    <canvas ref={canvasRef} width="640" height="480" style={{ border: '1px solid black' }} />
  );
};

export default WebGLCanvas;