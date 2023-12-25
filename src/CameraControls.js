import { useEffect, useRef, useState } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

// Define positions
const positions = [[11, 1, 12], [4, 1, 4], [3,1,3.75 ], [1,1,5.5 ], [-12,6,0]]; 
const rotationPoints = [[0,0,0], [5.1,-2.1,.2], [1.3,-3.7,.4], [-.1,-3.6,.36], [-12.1,4.8,3.7]];
class OrbitControls extends ThreeOrbitControls {
  constructor(...args) {
    super(...args);
    this.currentPosIndex = 0;
  }

  update() {
    super.update();
  }
}

extend({ OrbitControls });

export function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const controls = useRef();
  useFrame(() => controls.current && controls.current.update());

  useEffect(() => {
    camera.position.set(...positions[0]);
  },[]);

  useEffect(() => {
    
    controls.current = new OrbitControls(camera, domElement);

    // Add event listener for scroll event
    
const handleScroll = (event) => {
  // Calculate the scroll amount (you may need to adjust the multiplier)
  const scrollAmount = Math.abs(event.deltaY) * 0.01; // Adjust this value as needed

  // Calculate the new position
  if (!controls.current.target) {
    console.error('controls.target is not defined');
    return;
  }
  if (currentPosIndex < positions.length) {
    const oldPos = new Vector3().copy(camera.position);
    const nextPos = new Vector3(...positions[currentPosIndex + 1]);
    const newPos = new Vector3().lerpVectors(oldPos, nextPos, scrollAmount);
    
    // Check if the camera has reached the next position
    if (newPos.distanceTo(nextPos) <= 0.01) { // Mess with this to find a better way to switch between points
      controls.current.target.set(...rotationPoints[currentPosIndex + 1]);
      controls.current.object.position.copy(newPos);
      controls.current.update(); 
      console.log(controls.current.target);
    } 
    
    // If the camera has reached the next position, move to the next target position
    setCurrentPosIndex(currentPosIndex + 1);
  }
  
    if (currentPosIndex >= positions.length - 2) {
      setCurrentPosIndex(-1);
    }
  
};

    domElement.addEventListener('wheel', handleScroll);

    return () => {
      controls.current.dispose();
      domElement.removeEventListener('wheel', handleScroll);
    };
  }, [camera, domElement, currentPosIndex]);

  return null;
}





 