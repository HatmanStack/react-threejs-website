import { useGLTF } from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import React, { useState, Suspense, useEffect, useRef  } from 'react'
import { useVideoTexture } from './VideoTexture';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber'
import modelPath from './assets/house.glb'
import { Environment } from './Environment'
import { Html, useProgress } from '@react-three/drei'
import Model from './Model'
import { CloseUp } from './CloseUp'

extend({ OrbitControls });

export default function App() {
  const [position, setPosition] = useState(0)
  const [model, setModel] = useState();
  
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

  const CameraControls = () => {
    const {
      camera,
      gl: { domElement },
    } = useThree();
  
    const controls = useRef();
    camera.position.set( 11,1,12 );
    //camera.position.set( 4,1,5 );
    //const quat = new Quaternion().setFromAxisAngle(camera.up, 3);
    //camera.position.applyQuaternion(quat);
    //camera.position.y += 3;
    //camera.position.applyAxisAngle(camera.right, Math.PI / 20); 
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} />;
  };


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
