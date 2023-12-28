import { useEffect, useRef, useState } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

// Define positions
const positions = [[11, 1, 12], [4, 1, 4], [3,1,3.75 ], [1,1,5.5 ], [-12,6,0]]; 
const rotationPoints = [ [5.1,-2.1,.2], [1.3,.4,3.9], [.1,-3.6,-2.36], [-12.1,5.8,-18.1], [0,0,0]];
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
  useFrame(() => {
    if (controls.current) {
      controls.current.update();
  
      // Calculate the current rotation point
      const currentRotationPoint = new Vector3(...rotationPoints[currentPosIndex]);
      // Set the target to the current rotation point
    controls.current.target.copy(currentRotationPoint);

    // Update the controls to apply the orbiting effect
    controls.current.update();
    }
  });

  useEffect(() => {
    camera.position.set(...positions[0]);
  },[]);

  useEffect(() => {
    
    controls.current = new OrbitControls(camera, domElement);

// Define a variable to keep track of the progress towards the next position
let progress = 0;
// Define the number of steps to move from one position to the next


const handleScroll = (event) => {
  // Calculate the scroll amount (you may need to adjust the multiplier)
  const scrollAmount = Math.abs(event.deltaY) * 0.001; // Adjust this value as needed
  
  // Increment or decrement the progress by the scroll amount
  progress += scrollAmount; // Subtract to make scroll up move towards the next position

  // Calculate the current and next positions
  const currentPos = new Vector3(...positions[currentPosIndex]);
  const nextPos = new Vector3(...positions[(currentPosIndex + 1) % positions.length]);

  // Set the flight speed between positions
  const steps = (currentPosIndex >= 1 && currentPosIndex <= 3) ? 3 : 2;
  
  // Calculate the new position of the camera
  const newPos = new Vector3().lerpVectors(currentPos, nextPos, Math.max(0, Math.min(1, progress / steps)));

  // Update the camera's position
  camera.position.copy(newPos);
  
  // If we've reached the next position, move to the next target position
  if (progress >= steps) {
    progress = 0;
    setCurrentPosIndex((currentPosIndex + 1) % positions.length);
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





 