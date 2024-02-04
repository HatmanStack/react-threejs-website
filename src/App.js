import React, {  Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from './Environment'
import { useProgress } from '@react-three/drei'
import Model from './Model'
import { CameraControls } from './CameraControls'
import { Animations } from './Animations'
import { Sounds } from './Sounds'
import {LaunchScreen} from './LaunchScreen'
import handGif from './assets/hand.gif';

export default function App() {
  const [clickPoint, setClickPoint] = useState(null);
  const [clickLight, setClickLight] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [closeUp, setCloseUp ] = useState(false);
  const [gltf, setGLTF] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lightIntensity, setLightIntensity] = useState({sliderName: 'Slider_7', intensity: 10});
  const [iframe1, setIframe1] = useState(true); 
  const [iframe2, setIframe2] = useState(true); 
  const [vibe, setVibe] = useState(null);
  const [scrollStarted, setScrollStarted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setClickCountWrapper = (x) =>{setClickCount(x);}
  const setClickLightWrapper = (x) =>{setClickLight(x);}
  const setClickPointWrapper = (x) =>{setClickPoint(x);}
  const setCloseUpWrapper = (x) =>{setCloseUp(x);}
  const setGLTFWrapper = (x) =>{setGLTF(x);}
  const setIsDraggingWrapper = (x) =>{setIsDragging(x);}
  const setLightIntensityWrapper = (x) =>{setLightIntensity(x);}
  const setIframe1Wrapper = (x) =>{setIframe1(x);}
  const setIframe2Wrapper = (x) =>{setIframe2(x);}
  const setVibeWrapper = (x) =>{setVibe(x);}
  const setScrollStartedWrapper = (x) =>{setScrollStarted(x);}

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function Loader() {
    const { progress } = useProgress()
    return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white',
        background: '#171519',
        margin: '10rem'
      }}>
        <a href="https://gemenielabs.com" style={{
        color: 'white', 
        textDecoration: 'none',
        transition: 'transform 0.3s ease-in-out', 
      }} 
      onMouseEnter={e => e.target.style.transform = 'scale(2)'} 
      onMouseLeave={e => e.target.style.transform = 'scale(1)'} 
      >Gemenie Labs</a>
        <img src={handGif} width="250" />
        {Math.round(progress)} % loaded 
      </div>    
      
    </>)
  }
  
  return (
      <>
      {vibe != null ? 
        (<Suspense fallback={<Loader />}>
          <Canvas>
              <Sounds clickLight={clickLight} clickCount={clickCount} clickPoint={clickPoint}/>
              <Model setClickPoint={setClickPointWrapper} setClickLight={setClickLightWrapper} setClickCount={setClickCountWrapper}
                setGLTF={setGLTFWrapper} setIsDragging={setIsDraggingWrapper} closeUp={closeUp}/>
              <CameraControls windowWidth={windowWidth} setScrollStarted={setScrollStartedWrapper} clickPoint={clickPoint} setClickPoint={setClickPointWrapper} setCloseUp={setCloseUpWrapper} isDragging={isDragging} 
              setIframe1={setIframe1Wrapper} setIframe2={setIframe2Wrapper} closeUp={closeUp} />     
              <Environment vibe={vibe} clickLight={clickLight} lightIntensity={lightIntensity} clickCount={clickCount}/> 
              <Animations windowWidth={windowWidth} scrollStarted={scrollStarted} vibe={vibe} gltf={gltf} setIsDragging={setIsDraggingWrapper} setLightIntensity={setLightIntensityWrapper} 
               clickPoint={clickPoint} iframe1={iframe1} iframe2={iframe2} closeUp={closeUp}/>  
          </Canvas>
        </Suspense> ):(   
            <LaunchScreen windowWidth={windowWidth} setVibe={setVibeWrapper} fullscreen/>
        ) }
      </>
  )
  
  
}
