import { useFrame, extend, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls });

export const CameraControls = () => {
    const {
      camera,
      gl: { domElement },
    } = useThree();
  
    const controls = useRef();
    camera.position.set( 11,1,12 );//First Position
    const target = [0,0,0];//First Position
    //const target = [4.5,0,2];//Second Position
    //camera.position.set( 4,1,4 );//Second Position
    //const target = [-1,0,4];//Third Position
    //camera.position.set( 3,1,3.75 );//Third Position
    //const target = [-1,0,0];//Forth Position
    //camera.position.set( 1,1,5.5 );//Forth Position
    //const target = [-12,0,-11];//Fifth Position
    //camera.position.set( -12,6,0);//Fifth Position
    //const quat = new Quaternion().setFromAxisAngle(camera.up, 3);
    //camera.position.applyQuaternion(quat);
    //camera.position.y += 3;
    //camera.position.applyAxisAngle(camera.right, Math.PI / 20); 
    useFrame((state) => controls.current.update());
    return <orbitControls target={target} ref={controls} args={[camera, domElement]} />;
  };

 