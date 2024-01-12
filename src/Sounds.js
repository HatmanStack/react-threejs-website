import { useEffect } from 'react';
import useSound from 'use-sound';
import buttonClickSound from './assets/click.mp3';

const buttonsList = [
  'Button_Light_1',
  'Button_Light_2',
  'Button_Light_3',
  'Button_Light_4',
  'Button_Light_5',
  'Button_Light_6',
  'Button_Light_7',
  'Button_Music_Back',
  'Button_Music_Forward',
  'Button_Music_Pause'
];

export function Sounds({ clickLight, clickCount }) {
    const [playActive] = useSound(buttonClickSound, { volume: 0.25 });

  useEffect(() => {
    if (buttonsList.includes(clickLight)) {
      playActive();
    }
    
    console.log("clickCount", clickCount);
  }, [clickLight, clickCount, playActive]);

  return null;
}