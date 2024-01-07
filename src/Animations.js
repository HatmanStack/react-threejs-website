import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/three';

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
  [0, 44.6, 0],
  [0, 44.17, 0],
  [0, -9.97, 0],
  [0, 35.17, 0],
];

export function Animations({gltf, closeUp}) {
  const [nodes, setNodes] = useState();

  const springs = nodesList.map((node) => useSpring({
    scale: closeUp ? [100, 100, 100] : [1, 1, 1],
    config: { duration: closeUp ? 1000 : 50 },
  }));

  useEffect(() => {
    if (gltf) {
      const { nodes } = gltf;
      console.log(nodes);
      setNodes(nodes);
    }
  }, [gltf]);

  return (
    nodes && nodesList.map((node, index) => (
      <animated.mesh
        key={node}
        position={position[index]}
        rotation={rotation[index]}
        scale={springs[index].scale}
        geometry={nodes[node].geometry}
        material={nodes[node].material}
      />
    ))
  );
}