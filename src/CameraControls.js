import { useEffect, useRef, useState } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import * as TWEEN from '@tweenjs/tween.js';  Not Importing Correctly
import { Vector3 } from 'three';

const positions = [[10, 1, 13], [4, 1, 4], [3,1,3.75 ], [0,1,6.5 ], [-12,6,0]]; 
const rotationPoints = [ [5.1,-2.1,.2], [1.3,.4,3.9], [.1,.6,3.36], [-12.1,5.8,-6.1], [0,0,0]];
const closeUpPositions = [[0, .5, 4.07],[-.6, .3, 4.1],[5.4, .2, 2.34],[4.76, .2, 1.72],[.5, .3, 3.6],[4.53, .2, 2.7],[1.6, .8, 3.62],[.93, .68, 4.55]];
const closeUpRotations = [[-.2,.3,3.4],[-.6, -1, 4.1],[5.4, -1, 2.34],[4.76, -1, 1.72],[.5, -1, 3.6],[4.53, -.1, 2.7],[1.5,.7,3.62],[.93, .53, 3.95]]; 
const closeUpZRotations = [0,-45,45,165,-25,75,45]
const positionMap = {"Phone_Stocks": 0, "Phone_Looper_5": 1, "Phone_Looper_Text": 1, "Phone_Vocabulary_5": 2, "Phone_Vocabulary_Text": 2,
      "Phone_Movies_5": 3, "Phone_Movies_Text": 3, "Phone_Trachtenberg_5": 4, "Phone_Trachtenberg_Text": 4, "Phone_Italian_5": 5, "Phone_Italian_Text": 5,
    "PacManScreen_3": 6, "Light_Control_Box": 7, "Music_Control_Box": 7};
      
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
  const [rotationPoint, setRotationPoint] = useState(new Vector3());

  const {
    camera,
    gl: { domElement },
  } = useThree();
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const controls = useRef();
  
  useFrame(() => {
    if (controls.current) {
      controls.current.update();
      controls.current.target.copy(rotationPoint);
      controls.current.update();
    }
  });

  useEffect(() => {
    let newRotationPoint;
    if (closeUp) {
      newRotationPoint = new Vector3(...closeUpRotations[closeUpPosIndex]);
    } else {
      newRotationPoint = new Vector3(...rotationPoints[currentPosIndex]);
    }
    setRotationPoint(newRotationPoint);
  }, [closeUp, closeUpPosIndex, currentPosIndex]);

useEffect(() => {
  controls.current = new OrbitControls(camera, domElement);
  let progress = 0;
  const handleScroll = (event) => {
    setCloseUp(false);
      const scrollAmount = Math.abs(event.deltaY) * 0.001; 
      progress += scrollAmount; 
      const currentPos = new Vector3(...positions[currentPosIndex]);
      const nextPos = new Vector3(...positions[(currentPosIndex + 1) % positions.length]);
      const steps = (currentPosIndex >= 1 && currentPosIndex <= 3) ? 3 : 2;
      const newPos = new Vector3().lerpVectors(currentPos, nextPos, Math.max(0, Math.min(1, progress / steps)));
      camera.position.copy(newPos);
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
      let positionIndex = positionMap[clickPoint] || 0;
      setCloseUpPosIndex(positionIndex);
      setClickPoint(null);
    }
  }, [clickPoint]);

  useEffect(() => {
    camera.position.copy(new Vector3(...closeUpPositions[closeUpPosIndex]));
    camera.rotation.z = closeUpZRotations[closeUpPosIndex]
    /** TWEEN Library Not Importing Correctly
    const targetPosition = new Vector3(...closeUpPositions[closeUpPosIndex]);
    const targetRotationZ = closeUpZRotations[closeUpPosIndex];
  
    new TWEEN.Tween(camera.position)
      .to(targetPosition, 2000) // 2000 milliseconds
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  
    new TWEEN.Tween(camera.rotation)
      .to({ z: targetRotationZ }, 2000) // 2000 milliseconds
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  
    const animate = () => {
      if (TWEEN.update()) {
        requestAnimationFrame(animate);
      }
    };
  
    animate();
    */
  }, [closeUpPosIndex]);

  useEffect(() => {
    camera.position.set(...positions[0]);
  },[]);

  return null;
}





 