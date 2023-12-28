import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useVideoTexture } from './VideoTexture';
import { MeshStandardMaterial } from '@react-three/fiber';
import modelPath from './assets/house.glb'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function Model(props) {
  /**const groupRef = useRef()
  const { nodes, materials } = useGLTF(ModelPath)
  const videoPaths = ["/assets/Vocabulary.mp4", "/assets/Movies.mp4", "/assets/Looper.mp4", "/assets/Trachtenberg.mp4", "/assets/Italian.mp4", "/assets/Stocks.mp4"]
  const textureNames = ["vocabulary_screen", "movies_screen", "looper_screen", "tracktenberg_screen", "italian_screen", "stocks_screen"]
  for (let i = 0; i < videoPaths.length; i++) {
    const textureIndex = gltf.textures.findIndex(t => t.name === textureNames[i]);
    gltf.scene.traverse(node => {
      if (node.material && node.material.map && node.material.map.index === textureIndex) {
        node.material.map = useVideoTexture(videoPaths[i]); 
      }
    });
  }    
  return (
    gltf.scene
  )*/
  const gltf = useLoader(GLTFLoader, modelPath)

  const About = useRef();
  const Articles = useRef();
  const Contact = useRef();
  const Privacy = useRef();
  const Old = useRef();
  
  //Navigate to diffent pages based on the sign clicked

  useEffect(() => {
    About.current = gltf.scene.getObjectByName("Sign_About");
    Articles.current = gltf.scene.getObjectByName("Sign_Articles");
    Contact.current = gltf.scene.getObjectByName("Sign_Contact");
    Privacy.current = gltf.scene.getObjectByName("Sign_Privacy");
    Old.current = gltf.scene.getObjectByName("Sign_Old");
  }, [gltf.scene]);


  const handleClick = (event) => {
    let signName = event.object.name;
    
    if (signName === "Sign_About") {
      window.open("https://www.gemenielabs.com/about/", '_blank');
    }
    else if (signName === "Sign_Articles") {
      window.open("https://medium.com/@HatmanStack", '_blank');
    }
    else if (signName === "Sign_Contact") {
      window.open("https://www.gemenielabs.com/contact/", '_blank');
    }
    else if (signName === "Sign_Privacy") {
      window.open("https://www.gemenielabs.com/app-privacy-policy/", '_blank');
    }
    else if (signName === "Sign_Old") {
      window.open("https://www.gemenielabs.com/", '_blank');
    }
  }

  return (
    <>
    <mesh  ref={About.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={Articles.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={Contact.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={Privacy.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={Old.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <primitive onClick={handleClick} object={gltf.scene} />
  </>)

}

/** 
const gltf = useGLTF(modelPath)
    loader.load(modelPath, (gltf) => {
      
      setModel(gltf.scene); 
    });
*/


//useGLTF.preload(modelPath)