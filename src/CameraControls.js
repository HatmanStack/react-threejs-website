import { useEffect, useRef, useState } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

// Define positions
const positions = [[10, 1, 13], [4, 1, 4], [3,1,3.75 ], [0,1,6.5 ], [-12,6,0]]; 
const rotationPoints = [ [5.1,-2.1,.2], [1.3,.4,3.9], [.1,.6,3.36], [-12.1,5.8,-6.1], [0,0,0]];
const closeUpPositions = [[0, .5, 4.07],[-.6, .3, 4.1],[5.4, .2, 2.1],[5.2, .2, 3.01],[.5, .3, 3.6],[4.5, .2, 2.6],[1.6, .8, 3.62]];
const closeUpRotations = [[-.2,.3,3.4],[-.6, -1, 4.1],[5.4, -1, 2.1],[5.2, -1, 3.01],[.5, -1, 3.6],[4.5, -.1, 2.6],[1.5,.7,3.62]];
const closeUpZRotations = [0,-45,45,165,-25,75,45]

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

export function CameraControls({ clickPoint, setClickPoint, setCloseUp, closeUp}) {
  const [closeUpPosIndex, setCloseUpPosIndex] = useState(0);
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const controls = useRef();
  const endViewPosition = new Vector3(10, 10, 10);
  console.log(closeUp);
  useFrame(() => {
    if (controls.current) {
      controls.current.update();
      // Calculate the current rotation point
      let currentRotationPoint = 0;
      
      if(closeUp){
        currentRotationPoint = new Vector3(...closeUpRotations[closeUpPosIndex]);
        
      }else {
        currentRotationPoint = new Vector3(...rotationPoints[currentPosIndex]);
      }
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
  setCloseUp(false);
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
  }

    domElement.addEventListener('wheel', handleScroll);

    return () => {
      controls.current.dispose();
      domElement.removeEventListener('wheel', handleScroll);
    };
  }, [camera, domElement, currentPosIndex]);

  useEffect(() => {
    if(clickPoint){
      setCloseUp(true);
      let positionIndex = 0;
      console.log(`clickPoint ${clickPoint}`);
      if (clickPoint === "Phone_Stocks") {
        positionIndex = 0;
      }
      else if (clickPoint === "Phone_Looper_5") {
        positionIndex = 1;
      }
      else if (clickPoint === "Phone_Vocabulary_5") {
        positionIndex = 2;
      }
      else if (clickPoint === "Phone_Movies_5") {
        positionIndex = 3;
      }
      else if (clickPoint === "Phone_Trachtenberg_5") {
        positionIndex = 4;
      }
      else if (clickPoint === "Phone_Italian_5") {
        positionIndex = 5;
      }
      else if (clickPoint == "Cube010_6"){    
        positionIndex = 6;
      }
      setCloseUpPosIndex(positionIndex);
      setClickPoint(null);
    }
  }, [clickPoint]);

  useEffect(() => {
    camera.position.copy(new Vector3(...closeUpPositions[closeUpPosIndex]));
    camera.rotation.z = closeUpZRotations[closeUpPosIndex]
  }, [closeUpPosIndex]);


  return null;
}





 