// App.tsx
import React, { useState } from 'react';
import DiseñoCarta from './components/carta';

function App() {
  return(
    <div className='App'>
      <DiseñoCarta 
      numero = {1000}
      nombre = ""
      />


    </div>
  )
}

export default App;