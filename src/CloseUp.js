import React from 'react';
import closeup from './assets/closeup.json'

const styles = {
  closeUp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundImage: './assets/smartphone_display.png',
    height: '100%'
  }
}

export function CloseUp({clickedScreen}) {

  //fix import of clickedScreen
  return (
    <div style={styles.closeUp}>
      <video src={closeup.clickedScreen.src} autoPlay muted />
      <p>{closeup.clickedScreen.text}</p>
    </div>
  );
}