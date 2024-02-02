import React, { useEffect, useRef } from 'react';
import './checkbox.css';

export function Checkbox({ color, active, onClick }) {
  const checkboxRef = useRef(null);

  useEffect(() => {
    const detectToggleOnce = (e) => {
      e.target.classList.add('toggled-once');
    };

    const checkbox = checkboxRef.current;
    checkbox.addEventListener('click', detectToggleOnce, { once: true });

    return () => {
      checkbox.removeEventListener('click', detectToggleOnce);
    };
  }, []);

  return (
    <div className={`toggle-container ${color}`} onClick={onClick}>
      <input ref={checkboxRef} className="toggle-checkbox" type="checkbox" checked={active} readOnly />
      <div className="toggle-track">
        <div className="toggle-thumb"></div>
      </div>
    </div>
  );
}