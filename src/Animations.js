import { useState, useEffect } from 'react';
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

const nodesList = [
  'Phone_Looper_Text',
  'Phone_Vocabulary_Text',
  'Phone_Italian_Text',
  'Phone_Trachtenberg_Text',
  'Phone_Movies_Text'
];

const phoneList = [
"Phone_Looper_5" ,
"Phone_Vocabulary_5",
"Phone_Italian_5", 
"Phone_Trachtenberg_5",
"Phone_Movies_5"
]

const sliderRotation = [7.36, 0, 0];
const sliderScale = [.5, .5, .5];

let sliderPosition = [
  [.837, 0.538, 3.986],
  [.867, 0.538, 3.986],
  [.897, 0.538, 3.986],
  [.925, 0.538, 3.986],
  [.954, 0.538, 3.986],
  [.9841, 0.538, 3.986],
  [1.031, 0.538, 3.986],
  [.893, 0.375, 3.986]
];

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


export function Animations({gltf, setIsDragging, setLightIntensity, clickPoint, closeUp}) {
  const [nodes, setNodes] = useState();
  const [phoneClicked, setPhoneClicked] = useState();
  
  const textSpring = nodesList.map((node, index) => {
    const isMatch = phoneList.indexOf(phoneClicked) === index;
    return useSpring({
      scale: isMatch && closeUp ? [100, 100, 100] : [1, 1, 1],
      config: { duration: isMatch && closeUp ? 1000 : 50 },
    });
  });

  const sliderSpring = slidersList.map((slider, index) => {
    const initialY = sliderPosition[index][1]
    const [{ y }, set] = useSpring(() => ({ 
      y: initialY,
      config: {
        tension: 15, // Needs to be more Tactile
        friction: 10,
      },
    }));
    const bind = useDrag(({down, movement: [, my]}) => { 
      let movementY = (-my * .001)  + sliderPosition[index][1];
      const newY = down ? Math.min(Math.max(movementY, index === 7 ? .375 - 0.033 : .538 - 0.033),
       index === 7 ? .375 + 0.025 : .538 + 0.025) : sliderPosition[index][1];
      
      set.start({ y: newY });
      setIsDragging(down);
      sliderPosition[index][1] = newY;
      setLightIntensity({ sliderName: slider, intensity: newY });  
    }, { filterTaps: true });
    return { y, bind };
  });

  useEffect(() => {
    if (phoneList.includes(clickPoint)) {
      setPhoneClicked(clickPoint);
    }
  }, [clickPoint]);

  useEffect(() => {
    if (gltf) {
      const { nodes } = gltf;
      console.log(nodes);
      setNodes(nodes);
    }
  }, [gltf]);

/** Blender not exporting/Loader not importing position and rotation properly **HARDCODED**
const meshRefs = nodesList.map(() => useRef());
const sliderRefs = slidersList.map(() => useRef());

let position = [];
let rotation = [];
let size = [];

  useEffect(() => {
    if (nodes) {
      nodesList.forEach((node, index) => {
        const mesh = nodes[node];
        if (mesh) {
          position[index] = mesh.position.toArray();
          rotation[index] = mesh.rotation.toArray();
          size[index] = mesh.scale.toArray();
        }
      });
       
      slidersList.forEach((slider, index) => {
        const mesh = nodes[slider];
        if (mesh) {
          const newPositionIndex = index + nodesList.length;
          position[newPositionIndex] = mesh.position.toArray();
          rotation[newPositionIndex] = mesh.rotation.toArray();
          size[newPositionIndex] = mesh.scale.toArray();
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
    {nodes && slidersList.map((slider, index) => {
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
    {nodes && nodesList.map((node, index) => {
      return (
        <animated.primitive
          key={node}
          scale={textSpring[index].scale}
          object={nodes[node]}
          position={position[index]}
          rotation={rotation[index]}
        />
      );
    })}
    </>
    
  );
}