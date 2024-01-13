import { useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import useSound from 'use-sound';
import buttonClickSound from './assets/click.mp3';

export function Sounds({ clickLight, clickCount, gltf }) {
    const [playActive] = useSound(buttonClickSound, { volume: 0.25 });

    const meshRef = useRef();
    const iframeRef = useRef();

  useEffect(() => {
      playActive();
    console.log("clickCount", clickCount);
  }, [clickLight, clickCount, playActive]);

  
  return null;
  /** 
  return (
    <mesh>
      <Html position={[.893, 0.375, 3.886]}>
        
          <iframe src="https://www.youtube.com/embed/8NB2ioIuh8M?si=ss92uJm13NEaVnHL" title="description" style={{ position: 'absolute', width: '100px', height: '100px' }} />
          
        
      </Html>
    </mesh>
  );
  */
}