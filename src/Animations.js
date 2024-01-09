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
  'Slider_Music'];

const nodesList = [
  'Phone_Looper_Text',
  'Phone_Vocabulary_Text',
  'Phone_Italian_Text',
  'Phone_Trachtenberg_Text',
  'Phone_Movies_Text',
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

export function Animations({gltf, setIsDragging, closeUp}) {
  const [nodes, setNodes] = useState();
  

  const textSpring = nodesList.map((node) => useSpring({
    scale: closeUp ? [100, 100, 100] : [1, 1, 1],
    config: { duration: closeUp ? 1000 : 50 },
  }));

  const sliderSpring = slidersList.map((slider) => {
    const [{ z }, set] = useSpring(() => ({ z: 0 }));
    
    const bind = useDrag(({down, movement: [, my]}) => {
      set.start({ z: down ? my / 100 : 0 });
      setIsDragging(down);
      console.log(`z: ${z.get()}`)
    });
  
    return { z, bind };
  });

  useEffect(() => {
    if (gltf) {
      const { nodes } = gltf;
      console.log(nodes);
      setNodes(nodes);
      gltf.scene.traverse((object) => {
        if (object.isMesh && nodesList.includes(object.name)) {
          // This is a mesh in nodesList
          console.log(object);
        } else if (object.isGroup && slidersList.includes(object.name)) {
          // This is a group in slidersList
          console.log(object);
        }
      });
    }
  }, [gltf]);

  return (
    <>
    <group onClick={() => console.log('Group clicked')}>
    {nodes && slidersList.map((slider, index) => (
      <animated.mesh
        key={slider}
        {...sliderSpring[index].bind()}
        position-z={sliderSpring[index].z}
        geometry={nodes[slider].geometry}
        material={nodes[slider].material}
        onClick={() => console.log('Slider has been clicked')}
      />
    ))}
    {nodes && nodesList.map((node, index) => (
      <animated.mesh
        key={node}
        position={position[index]}
        rotation={rotation[index]}
        scale={textSpring[index].scale}
        geometry={nodes[node].geometry}
        material={nodes[node].material}
      />
    ))}
    
    </group>
    </>
    
  );
}