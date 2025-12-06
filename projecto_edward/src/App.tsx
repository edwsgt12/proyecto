import { useState } from 'react';
import DiseñoCarta from './components/carta';
import Modal from './components/modal';

const App = () => {
  const [mostrarModal, setMostrarModal]= useState(false);
  return(
    
  <div className="bg-linear-to-r from-cyan-500 to-gray-500 flex flex-wrap gap-6 p-8 bg-gray-200 justify-center min-h-screen">
    <div className="bg-linear-to-r from-gray-700 to-red-400 rounded-2xl">
      <DiseñoCarta 
      numero = {1000}
      nombre = "Asta"
      imagen = "https://i.pinimg.com/736x/c7/52/27/c7522776ff86212cc9473b968b8d916a.jpg"
      tipo = "Demonio"
      ataque = {10.000}
      defensa={5.000}
      mostrarDetalleCarta={()=> setMostrarModal(false)}
      />
    </div>
      {mostrarModal && <Modal descripcion='xs'/>}

    <div className="bg-linear-to-r from-gray-700 to-green-400 rounded-2xl">
      <DiseñoCarta  
      numero = {100}
      nombre = "Deku"
      imagen = "https://cdn-images.dzcdn.net/images/cover/4cd75715723dddfd2afea089828def48/0x1900-000000-80-0-0.jpg"
      tipo = "Heroe"
      ataque = {7.000}
      defensa={6.000}
      />
    </div>

  
    </div>)
}
export default App;