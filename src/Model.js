import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useVideoTexture } from './VideoTexture';
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
  return <primitive object={gltf.scene} />

}

/** 
const gltf = useGLTF(modelPath)
    loader.load(modelPath, (gltf) => {
      
      setModel(gltf.scene); 
    });
*/


//useGLTF.preload(modelPath)