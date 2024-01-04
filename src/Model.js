import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import modelPath from './assets/house.glb'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function Model({setClickPoint, setClickLight, closeUp}) {
 
  const gltf = useLoader(GLTFLoader, modelPath);
  const videoPaths = [
    require("./assets/Vocabulary.mp4"),
    require("./assets/Movies.mp4"),
    require("./assets/Looper.mp4"),
    require("./assets/Trachtenberg.mp4"),
    require("./assets/Italian.mp4"),
    require("./assets/Stocks.mp4"),
  ];

  const meshNames = ["Phone_Vocabulary_5", "Phone_Movies_5", "Phone_Looper_5", "Phone_Trachtenberg_5", "Phone_Italian_5", "Phone_Stocks"]
  
  const videoRefs = meshNames.reduce((acc, name) => {
    acc[name] = React.useRef();
    return acc;
  }, {});

  useEffect(() => {
    if (gltf) {
      for (let i = 0; i < meshNames.length; i++) {
        gltf.scene.traverse(node => {
          if (node.isMesh && node.name === meshNames[i]) {
            const video = videoRefs[meshNames[i]].current = document.createElement('video');
            video.src = videoPaths[i];
            video.loop = true;
            video.muted = true;
            video.play();
            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.wrapS = THREE.RepeatWrapping;
            videoTexture.repeat.x = -1;

            // Then use the videoTexture in your material:
            const material = new THREE.MeshBasicMaterial({ map: videoTexture });
            node.material.map = videoTexture;
            node.material.needsUpdate = true;
          }
        });
      }
    }
  }, [gltf]);

  //Navigate to diffent pages based on the sign clicked
  


  const handleClick = (event) => {
    let signName = event.object.name;
    console.log(signName)
    if (signName === "Sign_About") {
      window.open("https://www.gemenielabs.com/contact/", '_blank');
    }
    else if (signName === "Sign_Articles") {
      window.open("https://medium.com/@HatmanStack", '_blank');
    }
    else if (signName === "Sign_Privacy") {
      window.open("https://www.gemenielabs.com/app-privacy-policy/", '_blank');
    }
    else if (signName === "Sign_Old") {
      window.open("https://www.gemenielabs.com/", '_blank');
    }
    else if (signName === "Phone_Stocks") {
      setClickPoint(signName);
      if(closeUp){
        window.open("https://www.gemenielabs.com/#stocks", '_blank');
      }
    }
    else if (signName === "Phone_Looper_5") {
      setClickPoint(signName);
      if(closeUp){
        window.open("https://www.gemenielabs.com/#looper", '_blank');
      }
    }
    else if (signName === "Phone_Vocabulary_5") {
      setClickPoint(signName);
      if(closeUp){
        window.open("https://www.gemenielabs.com/#vocabulary", '_blank');
      }
    }
    else if (signName === "Phone_Movies_5") {
      setClickPoint(signName);
      if(closeUp){
        window.open("https://www.gemenielabs.com/#movies", '_blank');
      }
    }
    else if (signName === "Phone_Trachtenberg_5") {
      setClickPoint(signName);
      if(closeUp){
        window.open("https://www.gemenielabs.com/#trachtenberg", '_blank');
      }
    }
    else if (signName === "Phone_Italian_5") {
      setClickPoint(signName);
      if(closeUp){
        window.open("https://www.gemenielabs.com/#italian", '_blank');
      }
    }
    else if (signName === "logo_writersalmanac") {
      window.open("https://d6d8ny9p8jhyg.cloudfront.net/", '_blank');
    }
    else if (signName === "logo_nba") {
      window.open("https://hatmanstack-streamlit-nba-app-dz3nxx.streamlit.app/", '_blank');
    }
    else if (signName === "logo_hf") {
      window.open("https://huggingface.co/spaces/Hatman/react-native-serve-ml", '_blank');
    }
    else if (signName === "logo_google_forms") {
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSce94QihTjunjBvYzFdalz0mYGhVS6Ngy17uRrXkqLI_Da7nA/viewform", '_blank');
    }
    else if (signName === "PacManScreen") {
      setClickPoint(signName);
    }
    else if (signName === "small_right") {
      setClickLight(signName);
    }
    else if (signName === "small_left") {
      setClickLight(signName);
    }
    else if (signName === "small_middle_left") {
      setClickLight(signName);
    }
    else if (signName === "small_middle_right") {
      setClickLight(signName);
    }
    else if (signName === "lamppost"){
      setClickLight(signName);
    }
    else if (signName === "lamp_back"){
      setClickLight(signName);
    }
    else if (signName === "lamp_front"){
      setClickLight(signName);
    }
}

  return (
    <>
    <primitive onClick={handleClick} object={gltf.scene} />
  </>)

}


