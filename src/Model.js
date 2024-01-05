import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import modelPath from './assets/house.glb'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const closeUpClickThrough = 1;

const urlMap = {
  "Sign_About": "https://www.gemenielabs.com/contact/",
  "Sign_Articles": "https://medium.com/@HatmanStack",
  "Sign_Privacy": "https://www.gemenielabs.com/app-privacy-policy/",
  "Sign_Old": "https://www.gemenielabs.com/",
  "logo_writersalmanac": "https://d6d8ny9p8jhyg.cloudfront.net/",
  "logo_nba":"https://hatmanstack-streamlit-nba-app-dz3nxx.streamlit.app/",
  "logo_hf":"https://huggingface.co/spaces/Hatman/react-native-serve-ml", 
  "logo_google_forms":"https://docs.google.com/forms/d/e/1FAIpQLSce94QihTjunjBvYzFdalz0mYGhVS6Ngy17uRrXkqLI_Da7nA/viewform",
  }

const phoneUrls = [
  {"signName":["Phone_Stocks", "Phone_Stocks_Text"],"url":"https://www.gemenielabs.com/#stocks"},
  {"signName":["Phone_Vocabulary_5", "Phone_Vocabulary_Text"],"url":"https://www.gemenielabs.com/#vocabulary"},
  {"signName":["Phone_Movies_5", "Phone_Movies_Text"],"url":"https://www.gemenielabs.com/#movies"},
  {"signName":["Phone_Trachtenberg_5", "Phone_Trachtenberg_Text"],"url":"https://www.gemenielabs.com/#trachtenberg"},
  {"signName":["Phone_Italian_5", "Phone_Italian_Text"],"url":"https://www.gemenielabs.com/#italian"},
  {"signName":["Phone_Looper_5", "Phone_Looper_Text"],"url":"https://www.gemenielabs.com/#looper"},
  {"signName":["PacManScreen_3"],"url":"https://www.google.com"},
  {"signName":["Music_Control_Box", "Light_Control_Box"],"url":"https://www.google.com"}
]

const lightNames = ["small_middle_left", "small_middle_right", "lamppost", "lamp_back", "lamp_front", "small_right", "small_left", "PacManScreen"];

export default function Model({setClickPoint, setClickLight, setClickCount, setClickPhone, closeUp}) {
  const [count, setCount] = useState(0);
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

const handleClick = (event) => {
  const signName = event.object.name;
  console.log(signName);
  if (urlMap[signName]) {
    window.open(urlMap[signName], '_blank');
  } else if (lightNames.includes(signName)) {
    setClickLight(signName);
    setClickCount(prevCount => prevCount + 1);
  } else {
    for (let phoneUrl of phoneUrls) {
      if (phoneUrl.signName.includes(signName)) {
        setClickPoint(signName);
        if(closeUp){
          setCount(prevCount => prevCount + 1);
          if(count >= closeUpClickThrough){
            window.open(phoneUrl.url, '_blank');
            setCount(0);
          }
        }
        break;
      }
    }
  }
}

  return (
    <>
    <primitive onClick={handleClick} object={gltf.scene} />
  </>)

}


