import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';


const slidersList = [
  'Slider_1',
  'Slider_2',
  'Slider_3',
  'Slider_4',
  'Slider_5',
  'Slider_6',
  'Slider_7',
  'Slider_Music'
  ];

const buttonsList = [
  'Button_Light_1',
  'Button_Light_2',
  'Button_Light_3',
  'Button_Light_4',
  'Button_Light_5',
  'Button_Light_6',
  'Button_Light_7',
  'Button_Music_Back',
  'Button_Music_Forward',
  'Button_Music_Pause'
  ];

const nodesList = [
  'Phone_Looper_Text',
  'Phone_Vocabulary_Text',
  'Phone_Italian_Text',
  'Phone_Trachtenberg_Text',
  'Phone_Movies_Text'
];

const sliderPosition = [
  [.837, 0.538, 3.986],
  [.867, 0.538, 3.986],
  [.897, 0.538, 3.986],
  [.925, 0.538, 3.986],
  [.954, 0.538, 3.986],
  [.9841, 0.538, 3.986],
  [1.031, 0.538, 3.986],
  [.893, 0.375, 3.986]
];

const sliderStartingPosition = [0.538, 0.538, 0.538, 0.538, 0.538, 0.538, 0.538, 0.375];

const sliderRotation = [7.36, 0, 0];

const sliderScale = [.5, .5, .5];
  
const position = [
  [-0.668423, 0.008689, 4.06791],
  [5.53658, -0.1, 2.3211],
  [4.66377, -0.1 , 2.61365 ],
  [0.71, 0.03, 3.79],
  [4.73, -0.1, 1.83],
];

const rotation = [
  [0, 44.7, 0],
  [0, 44.612, 0],
  [0, 44.145, 0],
  [0, -9.97, 0],
  [0, 35.17, 0],
];

export function Animations({gltf, setIsDragging, setLightIntensity, closeUp}) {
  const [nodes, setNodes] = useState();
  const [currentY, setCurrentY] = useState(sliderStartingPosition);

  //const [sliderPositionState, setSliderPosition] = useState(sliderPosition);
  const textSpring = nodesList.map((node) => useSpring({
    scale: closeUp ? [100, 100, 100] : [1, 1, 1],
    config: { duration: closeUp ? 1000 : 50},
  }));

  const sliderSpring = slidersList.map((slider, index) => {
    const initialY = sliderStartingPosition[index]; // Slider not holding State properly
    const [{ y }, set] = useSpring(() => ({ y: initialY }));  
    const bind = useDrag(({down, movement: [, my]}) => {
      const movementY = my / 100;
      const newY = down ? Math.min(Math.max(movementY, initialY - 0.033), initialY + 0.025) : initialY;
    
      set.start({ y: newY });
      setIsDragging(down);
      console.log(newY);
      setCurrentY(prevY => {
        const newYValues = [...prevY];
        newYValues[index] = newY;
        return newYValues;
      });
      setLightIntensity({sliderName: slider, intensity: newY});
      
    });
    
    return { y, bind };
  });

  useEffect(() => {
    if (gltf) {
      const { nodes } = gltf;
      console.log(nodes);
      setNodes(nodes);
    }
  }, [gltf]);


const meshRefs = nodesList.map(() => useRef());
const sliderRefs = slidersList.map(() => useRef());

/** 
let position = [];
let rotation = [];
let size = [];

  useEffect(() => {
    if (nodes) {
      nodesList.forEach((node, index) => {
        const mesh = nodes[node];
        if (mesh) {
          // Get the position, rotation and size from the mesh
          position[index] = mesh.position.toArray();
          rotation[index] = mesh.rotation.toArray();
          size[index] = mesh.scale.toArray();
        }
      });
       
      slidersList.forEach((slider, index) => {
        const mesh = nodes[slider];
        if (mesh) {
          // Get the position, rotation and size from the mesh
          position[index] = mesh.position.toArray();
          rotation[index] = mesh.rotation.toArray();
          size[index] = mesh.scale.toArray();
        }
      });
      
    }
  }, [nodes]);
  */

  useEffect(() => {
    if (nodes) {
      const sliderPositions = slidersList.map((slider) => {
        const mesh = nodes[slider];
        return mesh ? mesh.position.toArray() : [0, 0, 0];
      });
      console.log(sliderPositions);
    }
  }, [nodes, slidersList]);

  return (
    <>
    <group onClick={() => console.log('Group clicked')}>
    {nodes && slidersList.map((slider, index) => {
      const initialY = sliderPosition[index][1];
      return (
        <animated.primitive
          key={slider}
          object={nodes[slider]}
          {...sliderSpring[index].bind()}
          position={sliderPosition[index]}
          rotation={sliderRotation}
          position-y={sliderSpring[index].y}
          scale={sliderScale}
        />
      );
    })}
    {nodes && nodesList.map((node, index) => (
      <animated.primitive
        key={node}
        position={position[index]}
        rotation={rotation[index]}
        scale={textSpring[index].scale}
        object={nodes[node]}
        ref={meshRefs[index]}
      />
    ))}
    </group>
    </>
    
  );
}