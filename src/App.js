import React, {  Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from './Environment'
import { Html, useProgress } from '@react-three/drei'
import Model from './Model'
import { CameraControls } from './CameraControls'


export default function App() {
  
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
          <CameraControls />     
          <Environment/>
        </Suspense>
      </Canvas>
    </div>
  )
}
