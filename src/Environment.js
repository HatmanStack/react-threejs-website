import { memo } from 'react'
import { AccumulativeShadows, RandomizedLight, Environment as EnvironmentImpl } from '@react-three/drei'

const lightColorWheel = ['#FFD700', '#FDFD96', '#FFFF00', '#FFFFE0', '#FFFACD', '#FAFAD2', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B', '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#FF00FF', '#DA70D6', '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFA07A', '#FA8072', '#F08080', '#CD5C5C', '#DC143C', '#B22222', '#8B0000', '#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500', '#FFD700', '#FFFF00', '#FFFFE0', '#FFFACD', '#FAFAD2', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B', '#E6E6FA', '#D8BFD8', '#DDA0DD', '#EE82EE', '#FF00FF', '#DA70D6', '#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFA07A', '#FA8072', '#F08080', '#CD5C5C', '#DC143C', '#B22222', '#8B0000', '#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500']
const lightIntensity = 10
const lightColor = lightColorWheel[Math.floor(Math.random() * lightColorWheel.length)]

export const Environment = memo(({ direction = [5, 5, 5] }) => (
  <>
    <directionalLight position={direction} intensity={1} shadow-mapSize={1024} castShadow />
    <directionalLight position={[-5, 5, 5]} intensity={0.1} shadow-mapSize={128} castShadow />
    <directionalLight position={[-5, 5, -5]} intensity={0.1} shadow-mapSize={128} castShadow />
    <directionalLight position={[0, 5, 0]} intensity={0.1} shadow-mapSize={128} castShadow />
    <pointLight position={[10.5, 2.8, 9.35]} intensity={lightIntensity * 4} color={lightColor} />
    <pointLight position={[6.07, .57, .6]} intensity={lightIntensity * .25} color={lightColor} />
    <pointLight position={[4.43, .57, .6]} intensity={lightIntensity * .25} color={lightColor} />
    <pointLight position={[1.36, .57, 1.25]} intensity={lightIntensity * .25} color={lightColor} />
    <pointLight position={[-1.26, .57, 1.25]} intensity={lightIntensity * .25} color={lightColor} />
    <pointLight position={[-2, .57, 1.22]} intensity={lightIntensity} color={lightColor} />
    <pointLight position={[-2.1, .57, 5.05]} intensity={lightIntensity} color={lightColor}/>
    
    <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.75} scale={30} position={[0, -1.5, 0]}>
      <RandomizedLight amount={8} radius={2.5} ambient={0.5} intensity={1} position={direction} bias={0.001} />
    </AccumulativeShadows>
    <EnvironmentImpl preset="night" />
  </>
))