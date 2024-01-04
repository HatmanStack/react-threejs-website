import { AccumulativeShadows, RandomizedLight, Environment as EnvironmentImpl } from '@react-three/drei'
import { useState, useEffect } from 'react'

const lightColorWheel = ['#FFD700', '#FDFD96', '#FFFF00', '#FFFFE0', '#FFFACD', '#FAFAD2', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B', '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#FF00FF', '#DA70D6', '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFA07A', '#FA8072', '#F08080', '#CD5C5C', '#DC143C', '#B22222', '#8B0000', '#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FFFFE0', '#FFFACD', '#FAFAD2', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B', '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#FF00FF', '#DA70D6', '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFA07A', '#FA8072', '#F08080', '#CD5C5C', '#DC143C', '#B22222', '#8B0000', '#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500']
const lightIntensity = 10
const lightColor = lightColorWheel[Math.floor(Math.random() * lightColorWheel.length)]
const pointLightPositions = [
  { position: [10.5, 2.8, 9.35], signName: "lamppost" },
  { position: [6.07, .57, .6], signName: "small_right" },
  { position: [4.43, .57, .6], signName: "small_middle_right" },
  { position: [1.36, .57, 1.25], signName: "small_middle_left" },
  { position: [-1.26, .57, 1.25], signName: "small_left" },
  { position: [-2, .57, 1.22], signName: "lamp_back" },
  { position: [-2.1, .57, 5.05], signName: "lamp_front" }
]

export function Environment({ clickLight }) {
  const initialColor = lightColorWheel[Math.floor(Math.random() * lightColorWheel.length)];
  const [lightColors, setLightColors] = useState(
    pointLightPositions.reduce((colors, light) => ({ ...colors, [light.signName]: initialColor }), {})
  );

  useEffect(() => {
    if (clickLight) {
      setLightColors(prevColors => ({
        ...prevColors,
        [clickLight]: lightColorWheel[Math.floor(Math.random() * lightColorWheel.length)]
      }));
    }
  }, [clickLight]);

  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1} shadow-mapSize={1024} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.1} shadow-mapSize={128} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.1} shadow-mapSize={128} castShadow />
      <directionalLight position={[0, 5, 0]} intensity={0.1} shadow-mapSize={128} castShadow />
      {pointLightPositions.map((light, index) => (
        <pointLight key={index} position={light.position} intensity={lightIntensity * (index === 0 ? 4 : 0.25)} color={lightColors[light.signName] || "#FFFFFF"} />
      ))}
      <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.75} scale={30} position={[0, -1.5, 0]}>
        <RandomizedLight amount={8} radius={2.5} ambient={0.5} intensity={1} position={[5, 5, 5]} bias={0.001} />
      </AccumulativeShadows>
      <EnvironmentImpl preset="night" />
    </>
  );
}