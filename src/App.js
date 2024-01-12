import React, {  Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from './Environment'
import { Html, useProgress } from '@react-three/drei'
import Model from './Model'
import { CameraControls } from './CameraControls'
import { Animations } from './Animations'
import { Sounds } from './Sounds'

export default function App() {
  const [clickPoint, setClickPoint] = useState(null);
  const [clickLight, setClickLight] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [closeUp, setCloseUp ] = useState(false);
  const [gltf, setGLTF] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lightIntensity, setLightIntensity] = useState({sliderName: 'Slider_7', intensity: 10});
  const setClickCountWrapper = (x) =>{setClickCount(x);}
  const setClickLightWrapper = (x) =>{setClickLight(x);}
  const setClickPointWrapper = (x) =>{setClickPoint(x);}
  const setCloseUpWrapper = (x) =>{setCloseUp(x);}
  const setGLTFWrapper = (x) =>{setGLTF(x);}
  const setIsDraggingWrapper = (x) =>{setIsDragging(x);}
  const setLightIntensityWrapper = (x) =>{setLightIntensity(x);}

  function Loader() {
    const { progress } = useProgress()
    return (<Html fullscreen>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
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
          <Sounds clickLight={clickLight} clickCount={clickCount}/>
          <Model setClickPoint={setClickPointWrapper} setClickLight={setClickLightWrapper} setClickCount={setClickCountWrapper} setGLTF={setGLTFWrapper} setIsDragging={setIsDraggingWrapper} closeUp={closeUp}/>
          <CameraControls clickPoint={clickPoint} setClickPoint={setClickPointWrapper} setCloseUp={setCloseUpWrapper} isDragging={isDragging} closeUp={closeUp} />     
          <Environment clickLight={clickLight} lightIntensity={lightIntensity} clickCount={clickCount}/> 
          <Animations gltf={gltf} setIsDragging={setIsDraggingWrapper} setLightIntensity={setLightIntensityWrapper} clickPoint={clickPoint} closeUp={closeUp}/>    
        </Suspense>    
      </Canvas>
    </div>
  )
}
