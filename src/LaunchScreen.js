import React, { useRef, useState } from 'react';
import {Checkbox} from './Checkbox';
import './launch.css';

export function LaunchScreen({ setVibe }) {
  const textAnimationRef = useRef(null);
  const [selectedVibe, setSelectedVibe] = useState(null);

  const setAnimationName = (animationName) => {
    const element = textAnimationRef.current;
    if (element) {
      element.style.animationName = animationName;
    }
  };

  const handleClick = (color) => {
    setSelectedVibe(color);
  };

  const handleLaunchClick = () => {
    setVibe(selectedVibe);
    setAnimationName("none");
    requestAnimationFrame(() =>
      setTimeout(() => setAnimationName("textStrokeAnim"), 0)
    );
  };
  /**<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>  
    <svg className="text-stroke" ref={textAnimationRef}>
        <text y="50%" dy=".3em">URBAN</text>
    </svg>
    <svg className="text-stroke" ref={textAnimationRef}>
        <text y="50%" dy=".3em">RURAL</text>
    </svg>
    <svg className="text-stroke" ref={textAnimationRef}>
        <text y="50%" dy=".3em">CLASSY</text>
    </svg>
    <svg className="text-stroke" ref={textAnimationRef}>
        <text y="50%" dy=".3em">CHILL</text>
    </svg>
    <svg className="text-stroke" ref={textAnimationRef}>
        <text y="50%" dy=".3em">BAD</text>
    </svg>
    </div> */

  return (
    <>
    
    <svg className="text-stroke" ref={textAnimationRef}>
        <text y="50%" dy=".3em">VIBES</text>
    </svg>
    
    
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>  
      <Checkbox color="urban" active={selectedVibe === '0'} onClick={() => handleClick('0')} />
      <Checkbox color="rural" active={selectedVibe === '1'} onClick={() => handleClick('1')} />
      <Checkbox color="classy" active={selectedVibe === '2'} onClick={() => handleClick('2')} />
      <Checkbox color="chill" active={selectedVibe === '3'} onClick={() => handleClick('3')} />
    
    </div>
    <button className="reset" onClick={handleLaunchClick}>
      LAUNCH
    </button>
    </>
  );
}

