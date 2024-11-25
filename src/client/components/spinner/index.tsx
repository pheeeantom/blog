import React from 'react';
import './style.css';

function Spinner({active, children}: {active: boolean, children: React.ReactNode}) {

  console.log("Spinner");
  console.log('active: ', active);
  console.log('children: ', children);

  if (active) {
    return <div className='Spinner'>Loading...</div>
  } else {
    return children;
  }
}

export default React.memo(Spinner);