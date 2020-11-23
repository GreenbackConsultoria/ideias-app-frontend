import React from 'react';

import './index.css';

export default function Container({ children }){
  return(
    <div className="container">
      { children }
    </div>
  )
}
