import { useGLTF } from '@react-three/drei'
import { OrbitControls, PivotControls, Stage } from '@react-three/drei'
import React, { useState, Suspense, useEffect  } from 'react'
import { useVideoTexture } from './VideoTexture';
import { Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber'
import modelPath from './assets/house.glb'
import { Environment } from './Environment'
import { Html, useProgress } from '@react-three/drei'
import Model from './Model'

export default function App() {
  const [position, setPosition] = useState(0)
  const [model, setModel] = useState();

  const onDrag = (l, dl, w, dw) => {
    // Extract the position and rotation
    const position = new THREE.Vector3()
    const rotation = new THREE.Quaternion()
    // I'm never sure whether to grab "l" or "w" here... sorry
    w.decompose(position, rotation, new Vector3())
    setPosition(position)
  }

  function Loader() {
    const { progress } = useProgress()
    return (<Html fullscreen>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        color: 'white',
        background: '#171519',
        height: '100%',
      }}>
        <a href="https://gemenielabs.com" style={{ color: 'white', textDecoration: 'none' }}>Original Site</a>
        <img src="https://www.gemenielabs.com/wp-content/uploads/2023/11/hand.gif" width="250" />
        {progress} % loaded
      </div>
    </Html>)
  }

  return (
    <div className="CanvasTest">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Model />
          <OrbitControls makeDefault />        
          <Environment/>
        </Suspense>
      </Canvas>
    </div>
  )
}
