import { useState, useEffect, useRef } from 'react';
import { useSpring, animated, useSprings} from '@react-spring/three';
import { Html } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { CustomGeometryParticles } from './Lamp';

function useSliderSpring(slider, index, initialY, sliderPosition, setIsDragging, setLightIntensity) {
  const [{ y }, set] = useSpring(() => ({ 
    y: initialY,
    config: {
      tension: 15, 
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
}

export function Animations({gltf, setIsDragging, setLightIntensity, scrollStarted, clickPoint, iframe1, iframe2, camera, closeUp}) {
  const [nodes, setNodes] = useState();
  const [phoneClicked, setPhoneClicked] = useState();

  const iframe1Ref = useRef(null);
  const iframe2Ref = useRef(null);
   
  useEffect(() => { 
    if(nodes){
      if(iframe1){
        iframe1Ref.current.style.display = 'block'; 
      }else {
        iframe1Ref.current.style.display = 'none'; 
      }
      if(iframe2){
        iframe2Ref.current.style.display = 'block';
      }else {
        iframe2Ref.current.style.display = 'none';
      } 
    }
  },[iframe1, iframe2]);
  
 
  const textSpring = useSprings(nodesList.length, nodesList.map((node, index) => {
    const isMatch = phoneList.indexOf(phoneClicked) === index;
    return {
      scale: isMatch && closeUp ? [100, 100, 100] : [1, 1, 1],
      config: { tension: 200, friction: 5 },
    };
  }));

  const navigationSpring = useSprings(instructionsList.length, instructionsList.map((node, index) => ({
    scale: scrollStarted ? [0,0,0] : [1, 1, 1],
    config: { tension: 280, friction: 60 },
  })));

  const sliderSpring = slidersList.map((slider, index) => 
  useSliderSpring(slider, index, sliderPosition[index][1], sliderPosition, setIsDragging, setLightIntensity)
  );

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

  useEffect(() => {
    if (scrollStarted) {
      iframe2Ref.current.src = "https://www.youtube.com/embed/JvNQLJ1_HQ0?autoplay=1&loop=1";
    }
  }, [scrollStarted]);

  useEffect(() => {
    if (nodes) {
      const sliderPositions = slidersList.map((slider) => {
        const mesh = nodes[slider];
        return mesh ? mesh.position.toArray() : [0, 0, 0];
      });
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
    {nodes && instructionsList.map((node, index) => {
      return (
        <animated.primitive
          key={node}
          scale={navigationSpring[index].scale}
          object={nodes[node]}
          position={navigationPosition[index]}
          rotation={navigationRotation[index]}
        />
      );
    })}
    {nodes &&    
    <>
    <primitive
    scale={.15}
    object={nodes["Mball"]}
    position={[5.12, 0.33, 2.13]}>
    <CustomGeometryParticles count={3000} /> 
    </primitive>
      <primitive
        key="zelda_screen"
        object={nodes["zelda_screen"]}>
        <Html className="arcadewrapper" position={[-4.055, -2.7, -1.6]} transform distanceFactor={1.16} >
        <div className="arcade">
          <iframe ref={iframe1Ref} src="https://freepacman.org/" />
          </div>
        </Html>
      </primitive>
      <primitive
        key="music_screen"
        object={nodes["music_screen"]}>
        <Html className="musicwrapper" position={[.939, 0.379, 3.986]} transform distanceFactor={1.16} >
        <div className="music">
          <iframe ref={iframe2Ref} src="https://www.youtube.com/embed/JvNQLJ1_HQ0?autoplay=1&loop=1&mute=1" allow="autoplay" title="description"  />
          </div>
        </Html>
      </primitive>
      </>
    }
    </>
  );
}

const slidersList = [
  'Slider_1',
  'Slider_2',
  'Slider_3',
  'Slider_4',
  'Slider_5',
  'Slider_6',
  'Slider_7'
  ];

const instructionsList = [
  'text_navigate',
  'text_rotate',
  'text_scroll',
  'text_middle',
  'text_click'
]

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

const navigationPosition = [
  [5.019, -.307, 10.185],
  [5.438, -.470, 11.318],
  [5.802, -.598, 11.41],
  [6.236, -.698, 11.951],
  [6.415, -.809, 12.207],
];

const navigationRotation = [
  [54.8, 3,14.7],
  [54.8, 3.01,14.7],
  [54.8, 3.04,14.7],
  [54.8, 3.07,14.7],
  [54.8, 3.1,14.7],
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