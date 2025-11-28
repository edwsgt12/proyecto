import DiseñoCarta from './components/carta';

const App = () => {
  return(<div>
      <DiseñoCarta 
      numero = {1000}
      nombre = "Asta"
      imagen = "https://i.pinimg.com/736x/d7/ed/63/d7ed634f24c434c1d7666be6f9babbb2.jpg"
      tipo = "Demonio"
      ataque = {10.000}
      defensa={5.000}
      descripcion="Un joven con mucha resistencia aunque nacido sin magia, bendecido por espadas capacez de repeler magia (Espada de Danma, Espada de Shukuma, Espada de Metsuma y Espada de Zanma.) muy poderoso en ataque fisico y con un demonio en su interior, pero con 0 ataque magico"
      />

      <DiseñoCarta 
      numero = {1000}
      nombre = "Deku"
      imagen = "https://cdn-images.dzcdn.net/images/cover/4cd75715723dddfd2afea089828def48/0x1900-000000-80-0-0.jpg"
      tipo = "Heroe"
      ataque = {7.000}
      defensa={6.000}
      descripcion="El heredero del One For All. Su cuerpo es un templo de poder, aunque a veces frágil ante su propia fuerza. No se detendrá hasta salvar a todos, usando su cuerpo y su mente para forjar su propio camino como héroe."
      />
    </div>)
}
export default App;