"use client";

import { useLayoutEffect, useRef } from "react";
import ThreeContainer from "../helpers/three-container";

const ThreeCanvas = () => {
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    const threeConatiner = ThreeContainer.getInstance()
    if (canvasRef.current) {
        threeConatiner.initCanvas(canvasRef.current);
    }
  }, [canvasRef]);
  return <div ref={canvasRef} className='w-full h-full max-w-full'></div>;
};

export default ThreeCanvas;
