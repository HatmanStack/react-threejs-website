function VideoTexture(props) {
    const { unsuspend, start, crossOrigin, muted, loop } = {
      unsuspend: 'canplay', 
      crossOrigin: 'Anonymous',
      muted: true,
      loop: true,
      start: true,
      ...props
    };
  }
  
  VideoTexture.defaultProps = {
    unsuspend: 'canplay',
    crossOrigin: 'Anonymous', 
    muted: true,
    loop: true,
    start: true
  };
  
  function useVideoTexture(src, props) {
    return VideoTexture({src, ...props}); 
  }