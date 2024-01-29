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
  const [scrollStarted, setScrollStarted] = useState(false);
  const [iframe1, setIframe1] = useState(true); 
  const [iframe2, setIframe2] = useState(true); 
  const [closeUpPosIndex, setCloseUpPosIndex] = useState(0);
  const setClickCountWrapper = (x) =>{setClickCount(x);}
  const setClickLightWrapper = (x) =>{setClickLight(x);}
  const setClickPointWrapper = (x) =>{setClickPoint(x);}
  const setCloseUpWrapper = (x) =>{setCloseUp(x);}
  const setGLTFWrapper = (x) =>{setGLTF(x);}
  const setIsDraggingWrapper = (x) =>{setIsDragging(x);}
  const setLightIntensityWrapper = (x) =>{setLightIntensity(x);}
  const setScrollStartedWrapper = (x) =>{setScrollStarted(x);}
  const setIframe1Wrapper = (x) =>{setIframe1(x);}
  const setIframe2Wrapper = (x) =>{setIframe2(x);}
  const setCloseUpPosIndexWrapper = (x) =>{setCloseUpPosIndex(x);}

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
        {Math.round(progress)} % loaded
      </div>
    </Html>)
  }

  let element = document.getElementById('body');


  console.log([element]);

  return (
    <div className="CanvasTest">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Sounds clickLight={clickLight} clickCount={clickCount} clickPoint={clickPoint}/>
          <Model setClickPoint={setClickPointWrapper} setClickLight={setClickLightWrapper} setClickCount={setClickCountWrapper}
            setGLTF={setGLTFWrapper} setIsDragging={setIsDraggingWrapper} closeUp={closeUp}/>
          <CameraControls clickPoint={clickPoint} setClickPoint={setClickPointWrapper} 
            setCloseUp={setCloseUpWrapper} setCloseUpPosIndex={setCloseUpPosIndexWrapper} setScrollStarted={setScrollStartedWrapper}
            isDragging={isDragging} setIframe1={setIframe1Wrapper} setIframe2={setIframe2Wrapper} closeUp={closeUp} />     
          <Environment clickLight={clickLight} lightIntensity={lightIntensity} clickCount={clickCount}/> 
          <Animations closeUpPosIndex={closeUpPosIndex} gltf={gltf} setIsDragging={setIsDraggingWrapper} setLightIntensity={setLightIntensityWrapper} 
            scrollStarted={scrollStarted} clickPoint={clickPoint} iframe1={iframe1} iframe2={iframe2} closeUp={closeUp}/>    
        </Suspense>    
      </Canvas>
    </div>
  )
}
