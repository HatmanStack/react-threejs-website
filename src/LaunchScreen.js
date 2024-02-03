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

  /**
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <svg className="text-stroke" ref={textAnimationRef}>
          <text y="50%" dy=".3em">BAD</text>
        </svg>
        <Checkbox color="chill" active={selectedVibe === '3'} onClick={() => handleClick('3')} />
      </div>
   */

  return (
    <>   
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '2em' }}>
    <svg className="title-stroke" ref={textAnimationRef}>
        <text y="50%" dy=".3em">VIBE</text>
    </svg>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}> 
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '2em' }}> 
        <svg className="text-stroke" ref={textAnimationRef}>
          <text y="50%" dy=".3em">URBAN</text>
        </svg>
        <Checkbox color="urban" active={selectedVibe === '0'} onClick={() => handleClick('0')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '2em' }}>
        <svg className="text-stroke" ref={textAnimationRef}>
          <text y="50%" dy=".3em">RURAL</text>
        </svg>
        <Checkbox color="rural" active={selectedVibe === '1'} onClick={() => handleClick('1')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '2em' }}>
        <svg className="text-stroke" ref={textAnimationRef}>
          <text y="50%" dy=".3em">CLASS</text>
        </svg>
        <Checkbox color="classy" active={selectedVibe === '2'} onClick={() => handleClick('2')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '2em' }}>
        <svg className="text-stroke" ref={textAnimationRef}>
          <text y="50%" dy=".3em">CHILL</text>
        </svg>
        <Checkbox color="chill" active={selectedVibe === '3'} onClick={() => handleClick('3')} />
      </div>
      
    </div>
    <button className="reset" onClick={handleLaunchClick}>
      LAUNCH
    </button>
    </div>
    </>
  );
 
}

