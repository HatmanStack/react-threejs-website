import { useEffect, useRef, useState, useMemo } from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

const positions = [[10, 1, 13], [4, 1, 2], [3,1,3.75 ], [0,1,6.5 ], [-12,6,0]]; 
const rotationPoints = [ [5.1,.1,2], [1.3,.4,3.9], [.1,.6,3.36], [-12.1,5.8,-6.1], [0,0,0]];
const closeUpPositions = [[0, .5, 4.07],[-.6, .3, 4.1],[5.4, .2, 2.34],[4.76, .2, 1.72],[.5, .3, 3.6],[4.53, .2, 2.7],[1.8, .9, 3.62],[.93, .68, 4.55],[]];
const closeUpRotations = [[-.2,.3,3.4],[-.6, -1, 4.1],[5.4, -1, 2.34],[4.76, -1, 1.72],[.5, -1, 3.6],[4.53, -.1, 2.7],[1.5,.6,3.62],[.93, .53, 3.95]]; 
const closeUpZRotations = [0,-45,45,165,-25,75,45]
const positionMap = {"Phone_Stocks": 0, "Phone_Looper_5": 1, "Phone_Looper_Text": 1, "Phone_Vocabulary_5": 2, "Phone_Vocabulary_Text": 2,
      "Phone_Movies_5": 3, "Phone_Movies_Text": 3, "Phone_Trachtenberg_5": 4, "Phone_Trachtenberg_Text": 4, "Phone_Italian_5": 5, "Phone_Italian_Text": 5,
    "Cube009_2": 6, "Light_Control_Box": 7, "Music_Control_Box": 7};
      
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

export function CameraControls({ setCameraPosition, clickPoint, setClickPoint, setCloseUp, setScrollStarted, isDragging, setIframe1, setIframe2, closeUp}) {
  const [closeUpPosIndex, setCloseUpPosIndex] = useState(0);
  const [rotationPoint, setRotationPoint] = useState(new Vector3());
  const [patchCamera, setPatchCamera] = useState(true);

  const {
    camera,
    gl: { domElement },
  } = useThree();
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const controls = useRef();

  if(patchCamera){
    camera.position.set(...positions[0]);
    setPatchCamera(false);
  }
    
  useFrame(() => {
    if (controls.current) {
      controls.current.update();
      controls.current.target.copy(rotationPoint);
      controls.current.update();
      setCameraPosition(camera.position.toArray());
      if(camera.position.x > 1.78 && camera.position.y > 0 && camera.position.z > .25){ 
        setIframe1(true);
      }else {
        setIframe1(false);
      }
      if( (camera.position.y > -.5 && camera.position.y < 1.5) && camera.position.z > 3.9){
        setIframe2(true);
      }else {
        setIframe2(false);
      }
    }
  });

  useEffect(() => {
    if(isDragging){
    controls.current.update();
    controls.enabled = !isDragging;
    controls.current.update();
    }
  }, [isDragging]);

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
      setScrollStarted(true);
      setCloseUp(false);
      setCloseUpPosIndex(8);
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
    if (isDragging) {
      controls.current.enabled = false;
     }else {
      controls.current.enabled = true;
     } 
  }, [isDragging]);

  
  useEffect(() => {
    if(closeUpPosIndex !==8) {
    camera.position.copy(new Vector3(...closeUpPositions[closeUpPosIndex]));
    camera.rotation.z = closeUpZRotations[closeUpPosIndex]
    }
    
  }, [closeUpPosIndex]);

  useEffect(() => {
    camera.position.set(...positions[0]);
  },[]);

  return(null);
  
}





 