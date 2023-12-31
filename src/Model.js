import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import modelPath from './assets/house.glb'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export default function Model(props) {
 
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
          node.material.map = videoTexture;
          node.material.needsUpdate = true;
          
        }
      });
    }
  }

  const About = useRef();
  const Articles = useRef();
  const Privacy = useRef();
  const Old = useRef();
  const PhoneStocks = useRef();
  const PhoneLooper = useRef();
  const PhoneVocabulary = useRef();
  const PhoneMovies = useRef();
  const PhoneTrachtenberg = useRef();
  const PhoneItalian = useRef();
  const DishWritersAlmanac = useRef();
  const DishNBA = useRef();
  const DishReactNative = useRef();
  const DishGoogleForms = useRef();
  
  //Navigate to diffent pages based on the sign clicked

  useEffect(() => {
    About.current = gltf.scene.getObjectByName("Sign_About");
    Articles.current = gltf.scene.getObjectByName("Sign_Articles");
    Privacy.current = gltf.scene.getObjectByName("Sign_Privacy");
    Old.current = gltf.scene.getObjectByName("Sign_Old");
    PhoneStocks.current = gltf.scene.getObjectByName("Phone_Stocks");
    PhoneLooper.current = gltf.scene.getObjectByName("Phone_Looper");
    PhoneVocabulary.current = gltf.scene.getObjectByName("Phone_Vocabulary");
    PhoneMovies.current = gltf.scene.getObjectByName("Phone_Movies");
    PhoneTrachtenberg.current = gltf.scene.getObjectByName("Phone_Trachtenberg");
    PhoneItalian.current = gltf.scene.getObjectByName("Phone_Italian");
    DishWritersAlmanac.current = gltf.scene.getObjectByName("Dish_WritersAlmanac");
    DishNBA.current = gltf.scene.getObjectByName("Dish_NBA");
    DishReactNative.current = gltf.scene.getObjectByName("Dish_ReactNative");
    DishGoogleForms.current = gltf.scene.getObjectByName("Dish_GoogleForms");
  }, [gltf.scene]);


  const handleClick = (event) => {
    let signName = event.object.name;
    console.log(signName);
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
      window.open("https://www.gemenielabs.com/#stocks", '_blank');
    }
    else if (signName === "Phone_Looper_5") {
      window.open("https://www.gemenielabs.com/#looper", '_blank');
    }
    else if (signName === "Phone_Vocabulary_5") {
      window.open("https://www.gemenielabs.com/#vocabulary", '_blank');
    }
    else if (signName === "Phone_Movies_5") {
      window.open("https://www.gemenielabs.com/#movies", '_blank');
    }
    else if (signName === "Phone_Trachtenberg_5") {
      window.open("https://www.gemenielabs.com/#trachtenberg", '_blank');
    }
    else if (signName === "Phone_Italian_5") {
      window.open("https://www.gemenielabs.com/#italian", '_blank');
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
  }

  return (
    <>
    <mesh  ref={About.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={Articles.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={Privacy.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={Old.current}>
      <meshStandardMaterial raycast={true} />
    </mesh>
    <mesh ref={PhoneStocks.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={PhoneLooper.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={PhoneVocabulary.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={PhoneMovies.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={PhoneTrachtenberg.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
    <mesh ref={PhoneItalian.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={DishWritersAlmanac.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={DishNBA.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={DishReactNative.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
  <mesh ref={DishGoogleForms.current}>
    <meshStandardMaterial raycast={true} />
  </mesh>
    <primitive onClick={handleClick} object={gltf.scene} />
  </>)

}


