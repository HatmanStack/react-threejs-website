import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { useGLTF } from '@react-three/drei/native'
import { OrbitControls, PivotControls } from '@react-three/drei'

import modelPath from './assets/house.glb'
import Environment from './Environment'

function Model(props) {
  const gltf = useGLTF(modelPath)
  return <primitive {...props} object={gltf.scene} />
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <Suspense>
        <Model />
      </Suspense>
      <Environment/>
    </Canvas>
  )
}