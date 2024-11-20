import React from 'react';
import './style.css';

function Spinner({active, children}: {active: boolean, children: React.ReactNode}) {

  console.log("Spinner");

  if (active) {
    return <div className='Spinner'>Loading...</div>
  } else {
    return children;
  }
}

export default React.memo(Spinner);