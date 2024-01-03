import { memo } from 'react'
import { AccumulativeShadows, RandomizedLight, Environment as EnvironmentImpl } from '@react-three/drei'

export const Environment = memo(({ direction = [5, 5, 5] }) => (
  <>
    <directionalLight position={direction} intensity={1} shadow-mapSize={1024} castShadow />
    <directionalLight position={[-5, 5, 5]} intensity={0.1} shadow-mapSize={128} castShadow />
    <directionalLight position={[-5, 5, -5]} intensity={0.1} shadow-mapSize={128} castShadow />
    <directionalLight position={[0, 5, 0]} intensity={0.1} shadow-mapSize={128} castShadow />
    <pointLight position={[10.5, 2.8, 9.35]} intensity={40} color="#FFD700" />
    <pointLight position={[6.07, .57, .6]} intensity={2} color="#FFD700" />
    <pointLight position={[4.43, .57, .6]} intensity={2} color="#FFD700" />
    <pointLight position={[1.36, .57, 1.25]} intensity={2} color="#FFD700" />
    <pointLight position={[-1.26, .57, 1.25]} intensity={2} color="#FFD700" />
    <pointLight position={[-2, .57, 1.22]} intensity={10} color="#FFD700" />
    <pointLight position={[-2.1, .57, 5.05]} intensity={10} color="#FFD700" />
    
    <AccumulativeShadows frames={100} alphaTest={0.85} opacity={0.75} scale={30} position={[0, -1.5, 0]}>
      <RandomizedLight amount={8} radius={2.5} ambient={0.5} intensity={1} position={direction} bias={0.001} />
    </AccumulativeShadows>
    <EnvironmentImpl preset="night" />
  </>
))