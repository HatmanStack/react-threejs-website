import { useEffect, useRef } from 'react';

import useSound from 'use-sound';
import buttonClickSound from './assets/click.mp3';

export function Sounds({ clickLight, clickCount, clickPoint, gltf }) {
    const [playActive] = useSound(buttonClickSound, { volume: 0.25 });

    const meshRef = useRef();
    const iframeRef = useRef();

  useEffect(() => {
    playActive();
  }, [clickLight, clickCount]);

  useEffect(() => {
    if(clickPoint && clickPoint !== 'Light_Control_Box' && clickPoint !== 'Music_Control_Box'){
      playActive(); 
    }
  }, [clickPoint]);
  
  return null;
  
}